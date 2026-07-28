import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bilal Arshad — Senior Backend & Applied AI Engineer",
  description:
    "Portfolio of Bilal Arshad, Senior Backend & Applied AI Engineer and Technical Lead specializing in .NET, Azure, AWS, and agentic AI systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
