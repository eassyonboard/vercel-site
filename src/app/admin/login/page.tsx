import { LoginForm } from "./LoginForm";

type PageProps = {
  searchParams: { error?: string };
};

export default function AdminLoginPage({ searchParams }: PageProps) {
  return <LoginForm configError={searchParams.error === "config"} />;
}
