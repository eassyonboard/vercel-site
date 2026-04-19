import { get } from "@vercel/blob";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/admin-api";

export async function GET(
  _request: Request,
  context: { params: { id: string } },
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = context.params;
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "Blob storage not configured" }, { status: 503 });
  }

  const app = await prisma.jobApplication.findUnique({
    where: { id },
    select: {
      resumePathname: true,
      resumeFileName: true,
      resumeContentType: true,
    },
  });

  if (!app) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const result = await get(app.resumePathname, {
    access: "private",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  if (!result?.stream) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const filename = encodeURIComponent(app.resumeFileName || "resume.pdf");

  return new Response(result.stream as unknown as ReadableStream, {
    headers: {
      "Content-Type": app.resumeContentType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
