import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bilal Arshad | Senior Backend & Applied AI Engineer",
  description:
    "Portfolio of Bilal Arshad, Senior Backend & Applied AI Engineer and Technical Lead specializing in .NET, Azure, AWS, and agentic AI systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-white font-sans text-neutral-900 antialiased selection:bg-indigo-500/20 selection:text-indigo-700 dark:bg-neutral-950 dark:text-neutral-100 dark:selection:text-indigo-300">
        {children}
      </body>
    </html>
  );
}
