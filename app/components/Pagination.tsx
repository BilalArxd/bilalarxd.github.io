import Link from "next/link";

function pageHref(basePath: string, page: number): string {
  return page === 1 ? basePath : `${basePath}/page/${page}`;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath = "/blog",
}: {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-10 flex items-center justify-between gap-4 font-mono text-xs tracking-widest uppercase"
    >
      {currentPage > 1 ? (
        <Link
          href={pageHref(basePath, currentPage - 1)}
          className="text-neutral-500 hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400"
        >
          &larr; Prev
        </Link>
      ) : (
        <span className="text-neutral-300 dark:text-neutral-700">&larr; Prev</span>
      )}

      <ul className="flex items-center gap-3">
        {pages.map((page) => (
          <li key={page}>
            {page === currentPage ? (
              <span
                aria-current="page"
                className="text-indigo-600 dark:text-indigo-400"
              >
                {page}
              </span>
            ) : (
              <Link
                href={pageHref(basePath, page)}
                className="text-neutral-500 hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400"
              >
                {page}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {currentPage < totalPages ? (
        <Link
          href={pageHref(basePath, currentPage + 1)}
          className="text-neutral-500 hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400"
        >
          Next &rarr;
        </Link>
      ) : (
        <span className="text-neutral-300 dark:text-neutral-700">Next &rarr;</span>
      )}
    </nav>
  );
}
