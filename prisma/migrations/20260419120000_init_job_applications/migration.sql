-- CreateTable
CREATE TABLE "JobApplication" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "linkedInUrl" TEXT NOT NULL,
    "portfolioUrl" TEXT,
    "position" TEXT NOT NULL,
    "yearsExperience" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "salaryExpectation" TEXT NOT NULL,
    "legalAuthorization" TEXT NOT NULL,
    "visaSponsorship" TEXT NOT NULL,
    "resumePathname" TEXT NOT NULL,
    "resumeFileName" TEXT NOT NULL,
    "resumeContentType" TEXT NOT NULL,
    "resumeSizeBytes" INTEGER NOT NULL,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "JobApplication_createdAt_idx" ON "JobApplication"("createdAt");

-- CreateIndex
CREATE INDEX "JobApplication_email_idx" ON "JobApplication"("email");
