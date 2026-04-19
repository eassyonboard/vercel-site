import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EassyOnboard LLP",
  description: "EassyOnboard LLP company website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
