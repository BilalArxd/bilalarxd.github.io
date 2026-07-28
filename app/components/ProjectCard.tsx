import CompanyLogo from "./CompanyLogo";
import ClientLogo from "./ClientLogo";
import TechIcon from "./TechIcon";
import { CLIENTS } from "../lib/clients";
import type { Project } from "../lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      id={project.slug}
      className="scroll-mt-24 flex gap-4 rounded-lg border border-neutral-200 p-5 transition-colors hover:border-indigo-400 dark:border-white/10 dark:hover:border-indigo-500/60"
    >
      <CompanyLogo company={project.company} size="h-9 w-9" />
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
          {project.name}
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {project.tagline}
        </p>
        <p className="mt-1 font-mono text-xs text-indigo-600 dark:text-indigo-400">
          {project.role}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {project.overview}
        </p>

        <details className="group mt-3">
          <summary className="cursor-pointer list-none text-xs font-semibold text-neutral-500 uppercase [&::-webkit-details-marker]:hidden">
            What I did{" "}
            <span className="text-neutral-400 normal-case dark:text-neutral-600">
              ({project.contributions.length})
            </span>
          </summary>
          <ul className="mt-2 space-y-1.5">
            {project.contributions.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                {item}
              </li>
            ))}
          </ul>
        </details>

        {project.clients && project.clients.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="text-xs text-neutral-500 dark:text-neutral-500">
              Client:
            </span>
            {project.clients.map((key) => (
              <div key={key} className="flex items-center gap-2">
                <ClientLogo client={key} size="h-8 w-8" />
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {CLIENTS[key].name}
                </span>
              </div>
            ))}
          </div>
        )}

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 font-mono text-xs text-neutral-600 dark:bg-white/5 dark:text-neutral-400"
            >
              <TechIcon name={tag} />
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
