import { notFound } from "next/navigation";
import { ApplyForm } from "./ApplyForm";
import { getCareerRole } from "@/lib/careers-data";

type PageProps = {
  params: { role: string };
};

export default function CareersApplyByRolePage({ params }: PageProps) {
  const role = getCareerRole(params.role);
  if (!role) notFound();

  return (
    <main className="careers-layout">
      <section className="careers-hero apply-hero">
        <div className="careers-hero-inner">
          <a className="back-home-link" href={`/careers/${role.slug}`}>
            ← Back to Job Description
          </a>
          <p className="eyebrow">Application Form</p>
          <h1>Apply for {role.title}</h1>
          <p className="careers-summary">
            Complete the form below and our team will review your application.
          </p>
        </div>
      </section>

      <section className="section careers-page">
        <ApplyForm roleTitle={role.title} roleSlug={role.slug} />
      </section>
    </main>
  );
}
