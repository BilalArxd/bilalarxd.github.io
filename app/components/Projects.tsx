import Link from "next/link";
import { PROJECTS } from "../lib/projects";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import { ArrowUpRightIcon } from "./icons";

const FEATURED = PROJECTS.filter((project) => project.featured);

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-16 sm:py-24">
      <Reveal>
        <h2 className="font-mono text-xs font-semibold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
          Projects
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {FEATURED.map((project, i) => (
          <Reveal key={project.slug} delay={i * 60}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={FEATURED.length * 60}>
        <Link
          href="/projects"
          className="mt-8 inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-widest text-indigo-600 uppercase hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          View All Projects
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </Link>
      </Reveal>
    </section>
  );
}
