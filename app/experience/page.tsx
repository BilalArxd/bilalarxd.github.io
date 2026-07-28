import type { Metadata } from "next";
import Link from "next/link";
import CompanyLogo from "../components/CompanyLogo";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import RelatedProjects from "../components/RelatedProjects";
import Reveal from "../components/Reveal";
import TechIcon from "../components/TechIcon";
import { ROLES } from "../lib/experience";

export const metadata: Metadata = {
  title: "Experience | Bilal Arshad",
  description:
    "Full work history of Bilal Arshad, Senior Backend & Applied AI Engineer.",
};

export default function ExperiencePage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 xl:max-w-4xl">
        <div className="py-16 sm:py-24">
          <Link
            href="/"
            className="font-mono text-xs font-medium tracking-widest text-neutral-500 uppercase hover:text-indigo-600 dark:text-neutral-500 dark:hover:text-indigo-400"
          >
            &larr; Home
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-50">
            Experience
          </h1>
          <p className="mt-3 max-w-xl text-neutral-600 dark:text-neutral-400">
            13+ years across consultancy, technical leadership, and hands-on
            engineering roles.
          </p>

          <ol className="mt-12 space-y-14">
            {ROLES.map((role, i) => (
              <Reveal key={role.slug} delay={i * 60}>
                <li className="flex gap-4">
                  <CompanyLogo company={role.company} size="h-12 w-12" />
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-xs text-neutral-500 dark:text-neutral-500">
                      {role.dates}
                    </p>
                    <h2 className="mt-1 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                      {role.title}
                    </h2>
                    <p className="text-neutral-500 dark:text-neutral-400">
                      {role.companyLabel}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {role.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {role.tags.map((tag) => (
                        <li
                          key={tag}
                          className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 font-mono text-xs text-neutral-600 dark:bg-white/5 dark:text-neutral-400"
                        >
                          <TechIcon name={tag} />
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <RelatedProjects company={role.company} />
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
