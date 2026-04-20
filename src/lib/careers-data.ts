export type CareerRole = {
  slug: string;
  title: string;
  summary: string;
  intro: string[];
  tags: string[];
  roleSectionTitle: string;
  responsibilities: string[];
  successLooksLike?: string[];
  mustHavesTitle?: string;
  mustHaves: string[];
  niceToHaves?: string[];
};

export const CAREER_ROLES: CareerRole[] = [
  {
    slug: "senior-data-engineer",
    title: "Senior Data Engineer",
    summary:
      "Architect high-performance batch and real-time data systems, mentor engineers, and accelerate analytics and AI initiatives on modern cloud platforms.",
    intro: [
      "We are seeking a Senior Data Engineer with deep expertise in Spark/PySpark/SQL to join our data team.",
      "This is a hands-on technical role for someone passionate about building scalable data systems, mentoring engineers, and shaping data strategy.",
      "You will architect systems that power high-performance data processing, enable advanced analytics, and accelerate AI initiatives.",
    ],
    tags: ["Remote", "Full-time", "Senior level", "Spark / PySpark / SQL", "GCP / AWS"],
    roleSectionTitle: "What You'll Do",
    responsibilities: [
      "Design and evolve scalable, distributed data infrastructure across cloud platforms including GCP and AWS.",
      "Build and maintain real-time and batch data processing pipelines supporting AI/ML workloads, consumer applications, and analytics.",
      "Develop and manage integrations with third-party e-commerce platforms to expand the data ecosystem.",
      "Ensure data availability, reliability, and quality through monitoring and automated auditing.",
      "Partner with engineering, AI, and product teams on data solutions for business-critical needs.",
      "Mentor and support data engineers, establishing best practices and code quality standards.",
    ],
    mustHavesTitle: "Ideal Background",
    mustHaves: [
      "Bachelor's degree in Computer Science or a related field, or equivalent practical experience.",
      "5+ years of software development and data engineering experience with ownership of production-grade data infrastructure.",
      "Deep expertise scaling Spark, PySpark, and SQL in production, including Databricks or DataProc on GCP.",
      "Strong understanding of distributed computing and modern data modeling for scalable systems.",
      "Proficient in Python with experience implementing software engineering best practices.",
      "Hands-on experience with both relational and NoSQL systems including MySQL, MongoDB, and Elasticsearch.",
      "Strong communicator with experience influencing cross-functional stakeholders.",
    ],
    niceToHaves: [
      "Experience with job orchestration and containerization tools such as Airflow and Docker.",
      "Experience working with vector stores and knowledge graphs.",
      "Experience working in early-stage, high-growth environments.",
      "Familiarity with MLOps pipelines and integrating ML models into data workflows.",
      "A proactive, problem-solving mindset with a passion for innovative solutions.",
    ],
  },
  {
    slug: "machine-learning-engineer",
    title: "Machine Learning Engineer",
    summary:
      "Design and build feedback-driven learning systems that improve our AI agent over time using real-world user behavior.",
    intro: [
      "We're looking for a Machine Learning Engineer to design and build feedback-driven learning systems that improve our AI agent over time.",
      "This is not a traditional RL research role. We're focused on practical systems that learn from real user behavior and improve production outcomes.",
      "You'll work at the intersection of a live conversational agent and real shopping behavior, where the feedback signal quality is unusually rich.",
    ],
    tags: ["Remote", "Full-time", "5-8 years", "Python / ML", "Ranking & Personalization"],
    roleSectionTitle: "What You'll Do",
    responsibilities: [
      "Build and productionize feedback loops that improve agent performance over time.",
      "Build evaluation infrastructure including offline metrics, regression suites, and experiment analysis.",
      "Own signal pipelines end-to-end: instrument events, build labeled datasets, and convert user behaviors into reliable learning signals.",
      "Design lightweight reinforcement learning and bandit-style approaches where appropriate.",
      "Partner with product and engineering to define success metrics and optimize for them.",
      "Design and analyze experiments to validate whether learning system changes improve real outcomes.",
      "Improve ranking, recommendations, and decision-making within the agent.",
      "Iterate quickly: ship, measure, learn, improve.",
    ],
    successLooksLike: [
      "You ship quickly and drive measurable improvements in core product metrics.",
      "You turn noisy user behavior into reliable learning signals that improve the agent over time.",
      "You own systems end-to-end and operate comfortably in production.",
    ],
    mustHavesTitle: "Ideal Background",
    mustHaves: [
      "5-8 years of hands-on experience building and shipping ML systems.",
      "Bachelor's or Master's degree in Computer Science.",
      "Experience shipping recommendation systems, ranking, personalization, or optimization systems in production.",
      "Deep knowledge of Python and modern ML tooling.",
      "Pragmatic mindset: choose simple, effective solutions over theoretically perfect ones.",
    ],
  },
];

export function getCareerRole(slug: string): CareerRole | undefined {
  return CAREER_ROLES.find((role) => role.slug === slug);
}
