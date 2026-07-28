import Link from "next/link";
import CompanyLogo from "./CompanyLogo";
import { ROLES } from "../lib/experience";
import RelatedProjects from "./RelatedProjects";
import Reveal from "./Reveal";
import TechIcon from "./TechIcon";
import { ArrowUpRightIcon } from "./icons";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-16 sm:py-24">
      <Reveal>
        <h2 className="font-mono text-xs font-semibold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
          Experience
        </h2>
      </Reveal>

      <ol className="mt-8 space-y-8">
        {ROLES.map((role, i) => (
          <Reveal key={role.slug} delay={i * 60}>
            <li className="flex gap-4">
              <CompanyLogo company={role.company} />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs text-neutral-500 dark:text-neutral-500">
                  {role.dates}
                </p>
                <h3 className="mt-1 font-semibold text-neutral-900 dark:text-neutral-100">
                  {role.title}{" "}
                  <span className="text-neutral-500 dark:text-neutral-400">
                    &middot; {role.companyLabel}
                  </span>
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {role.summary}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
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

      <Reveal delay={ROLES.length * 60}>
        <Link
          href="/experience"
          className="mt-8 inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-widest text-indigo-600 uppercase hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          View Full Experience
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </Link>
      </Reveal>
    </section>
  );
}
