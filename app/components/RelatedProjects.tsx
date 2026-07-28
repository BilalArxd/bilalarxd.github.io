import Link from "next/link";
import type { CompanyKey } from "../lib/companies";
import { projectsByCompany } from "../lib/projects";

export default function RelatedProjects({ company }: { company: CompanyKey }) {
  const related = projectsByCompany(company);
  if (related.length === 0) return null;

  return (
    <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-500 dark:text-neutral-500">
      <span>Projects:</span>
      {related.map((project, idx) => (
        <span key={project.slug}>
          <Link
            href={`/projects#${project.slug}`}
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            {project.name}
          </Link>
          {idx < related.length - 1 ? "," : ""}
        </span>
      ))}
    </p>
  );
}
