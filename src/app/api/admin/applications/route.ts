import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/admin-api";

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const applications = await prisma.jobApplication.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    select: {
      id: true,
      createdAt: true,
      fullName: true,
      email: true,
      phone: true,
      location: true,
      position: true,
      roleSlug: true,
      experienceBand: true,
      yearsExperience: true,
      noticePeriod: true,
      currentCtc: true,
      expectedCtc: true,
      salaryExpectation: true,
      legalAuthorization: true,
      visaSponsorship: true,
      linkedInUrl: true,
      portfolioUrl: true,
      resumeFileName: true,
      resumeSizeBytes: true,
      otherDocumentFileName: true,
      otherDocumentSizeBytes: true,
    },
  });

  return NextResponse.json({ applications });
}
