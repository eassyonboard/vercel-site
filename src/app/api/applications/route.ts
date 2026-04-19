import { NextResponse } from "next/server";

type ApplicationPayload = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedInUrl: string;
  portfolioUrl?: string;
  position: string;
  yearsExperience: string;
  startDate: string;
  salaryExpectation: string;
  legalAuthorization: string;
  visaSponsorship: string;
  resumeName?: string;
  resumeType?: string;
  resumeSizeBytes?: number;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ApplicationPayload;

    if (!body.fullName || !body.email || !body.position) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const webhookUrl = process.env.APPLICATIONS_WEBHOOK_URL;
    if (webhookUrl) {
      // This enables quick piping to Airtable/Notion automation tools via webhook.
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "eassyonboard-careers-form",
          submittedAt: new Date().toISOString(),
          application: body,
        }),
      });
    } else {
      // Fallback for local verification until webhook is configured.
      console.log("[application-submission]", JSON.stringify(body));
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("application submission error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

