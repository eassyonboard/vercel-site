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
    const roleSlug = String(formData.get("roleSlug") ?? "").trim();
    const experienceBand =
      String(formData.get("experienceBand") ?? "").trim() ||
      String(formData.get("yearsExperience") ?? "").trim();
    const currentCtc = optionalString(formData, "currentCtc");
    const expectedCtc = optionalString(formData, "expectedCtc");
    const noticePeriod = optionalString(formData, "noticePeriod");

    const resume = formData.get("resume");
    const otherDocument = formData.get("otherDocument");
    if (!fullName || !email || !phone || !position || !experienceBand || !location) {
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
    if (
      otherDocument instanceof File &&
      otherDocument.size > 0 &&
      otherDocument.size > MAX_RESUME_BYTES
    ) {
      return NextResponse.json(
        { error: "Other document file is too large (max 8 MB)." },
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

    let otherDocBlob:
      | {
          pathname: string;
          url: string;
          contentType: string;
          fileName: string;
          size: number;
        }
      | undefined;
    if (otherDocument instanceof File && otherDocument.size > 0) {
      const safeOther = otherDocument.name.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 120);
      const otherPath = `job-applications/${applicationId}/other-${safeOther || "document"}`;
      const uploaded = await put(otherPath, otherDocument, {
        access: "private",
        token: process.env.BLOB_READ_WRITE_TOKEN,
        contentType: otherDocument.type || "application/octet-stream",
      });
      otherDocBlob = {
        pathname: uploaded.pathname,
        url: uploaded.url,
        contentType: otherDocument.type || "application/octet-stream",
        fileName: otherDocument.name || "document",
        size: otherDocument.size,
      };
    }

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
          roleSlug,
          yearsExperience: experienceBand,
          startDate: noticePeriod || "",
          salaryExpectation: expectedCtc || "",
          legalAuthorization: "not_collected",
          visaSponsorship: "not_collected",
          experienceBand,
          currentCtc: currentCtc ?? null,
          expectedCtc: expectedCtc ?? null,
          noticePeriod: noticePeriod ?? null,
          resumePathname: blob.pathname,
          resumeFileName: resume.name || "resume",
          resumeContentType: resume.type || "application/octet-stream",
          resumeSizeBytes: resume.size,
          otherDocumentPathname: otherDocBlob?.pathname ?? null,
          otherDocumentFileName: otherDocBlob?.fileName ?? null,
          otherDocumentContentType: otherDocBlob?.contentType ?? null,
          otherDocumentSizeBytes: otherDocBlob?.size ?? null,
        },
      });
    } catch (dbError) {
      await del(blob.url, { token: process.env.BLOB_READ_WRITE_TOKEN }).catch(() => {});
      if (otherDocBlob?.url) {
        await del(otherDocBlob.url, { token: process.env.BLOB_READ_WRITE_TOKEN }).catch(() => {});
      }
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
            roleSlug: row.roleSlug,
            yearsExperience: row.yearsExperience,
            currentCtc: row.currentCtc,
            expectedCtc: row.expectedCtc,
            noticePeriod: row.noticePeriod,
            legalAuthorization: row.legalAuthorization,
            visaSponsorship: row.visaSponsorship,
            resumeFileName: row.resumeFileName,
            resumeSizeBytes: row.resumeSizeBytes,
            otherDocumentFileName: row.otherDocumentFileName,
            otherDocumentSizeBytes: row.otherDocumentSizeBytes,
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
