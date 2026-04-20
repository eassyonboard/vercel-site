import { del, put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const MAX_RESUME_BYTES = 8 * 1024 * 1024;

function optionalString(formData: FormData, key: string): string | undefined {
  const v = formData.get(key);
  if (v == null || typeof v !== "string") return undefined;
  const t = v.trim();
  return t.length ? t : undefined;
}

export async function POST(request: Request) {
  try {
    if (!process.env.DATABASE_URL?.trim()) {
      return NextResponse.json(
        {
          error:
            "Applications are not configured (missing DATABASE_URL or POSTGRES_PRISMA_URL / POSTGRES_URL).",
        },
        { status: 503 },
      );
    }
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: "File storage is not configured (missing BLOB_READ_WRITE_TOKEN)." },
        { status: 503 },
      );
    }

    const formData = await request.formData();

    const fullName = String(formData.get("fullName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const location = String(formData.get("location") ?? "").trim();
    const linkedInUrl = String(formData.get("linkedInUrl") ?? "").trim();
    const portfolioUrl = optionalString(formData, "portfolioUrl");
    const position = String(formData.get("position") ?? "").trim();
    const yearsExperience = String(formData.get("yearsExperience") ?? "").trim();
    const startDate = String(formData.get("startDate") ?? "").trim();
    const salaryExpectation = String(formData.get("salaryExpectation") ?? "").trim();
    const legalAuthorization = String(formData.get("legalAuthorization") ?? "").trim();
    const visaSponsorship = String(formData.get("visaSponsorship") ?? "").trim();

    const resume = formData.get("resume");
    if (!fullName || !email || !position) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!(resume instanceof File) || resume.size === 0) {
      return NextResponse.json({ error: "Resume file is required" }, { status: 400 });
    }
    if (resume.size > MAX_RESUME_BYTES) {
      return NextResponse.json(
        { error: "Resume file is too large (max 8 MB)." },
        { status: 400 },
      );
    }

    const applicationId = crypto.randomUUID();
    const safeOriginal = resume.name.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 120);
    const pathname = `job-applications/${applicationId}/${safeOriginal || "resume"}`;

    const blob = await put(pathname, resume, {
      access: "private",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      contentType: resume.type || "application/octet-stream",
    });

    let row;
    try {
      row = await prisma.jobApplication.create({
        data: {
          id: applicationId,
          fullName,
          email,
          phone,
          location,
          linkedInUrl,
          portfolioUrl: portfolioUrl ?? null,
          position,
          yearsExperience,
          startDate,
          salaryExpectation,
          legalAuthorization,
          visaSponsorship,
          resumePathname: blob.pathname,
          resumeFileName: resume.name || "resume",
          resumeContentType: resume.type || "application/octet-stream",
          resumeSizeBytes: resume.size,
        },
      });
    } catch (dbError) {
      await del(blob.url, { token: process.env.BLOB_READ_WRITE_TOKEN }).catch(() => {});
      throw dbError;
    }

    const webhookUrl = process.env.APPLICATIONS_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "eassyonboard-careers-form",
          submittedAt: new Date().toISOString(),
          applicationId: row.id,
          application: {
            fullName: row.fullName,
            email: row.email,
            phone: row.phone,
            location: row.location,
            linkedInUrl: row.linkedInUrl,
            portfolioUrl: row.portfolioUrl,
            position: row.position,
            yearsExperience: row.yearsExperience,
            startDate: row.startDate,
            salaryExpectation: row.salaryExpectation,
            legalAuthorization: row.legalAuthorization,
            visaSponsorship: row.visaSponsorship,
            resumeFileName: row.resumeFileName,
            resumeSizeBytes: row.resumeSizeBytes,
          },
        }),
      }).catch(() => {
        /* optional webhook */
      });
    }

    return NextResponse.json({ ok: true, id: row.id });
  } catch (error) {
    console.error("application submission error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
