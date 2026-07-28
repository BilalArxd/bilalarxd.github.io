import Link from "next/link";
import {
  CloseIcon,
  GithubIcon,
  LinkedInIcon,
  MailIcon,
  MenuIcon,
} from "./icons";
import { getAllPosts } from "../lib/posts";

const BASE_NAV_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const hasPosts = getAllPosts().length > 0;
  const NAV_LINKS = hasPosts
    ? [
        ...BASE_NAV_LINKS.slice(0, 3),
        { href: "/blog", label: "Blog" },
        ...BASE_NAV_LINKS.slice(3),
      ]
    : BASE_NAV_LINKS;

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-neutral-950/80">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4 xl:max-w-4xl">
        <Link
          href="/"
          className="font-semibold text-neutral-900 dark:text-neutral-100"
        >
          Bilal Arshad
        </Link>

        <nav className="flex items-center gap-5" aria-label="Section navigation">
          <ul className="hidden items-center gap-5 sm:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-mono text-xs font-medium tracking-widest text-neutral-500 uppercase transition-colors hover:text-indigo-600 dark:text-neutral-500 dark:hover:text-indigo-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 border-l border-neutral-200 pl-5 dark:border-white/10">
            <a
              href="https://linkedin.com/in/bilalarxd"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn profile"
              className="text-neutral-500 transition-colors hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/BilalArxd"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub profile"
              className="text-neutral-500 transition-colors hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href="mailto:mail.BilalArshad@gmail.com"
              aria-label="Get in Touch"
              className="text-neutral-500 transition-colors hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400"
            >
              <MailIcon className="h-5 w-5" />
            </a>
          </div>

          {/* Native <details> disclosure — no client JS required, so the
              menu still opens/closes with JavaScript disabled. Panel is
              absolutely positioned against the sticky <header> (which is
              itself a positioning context) so it isn't squeezed into the
              hamburger button's own flex-item width. See ux.md #5. */}
          <details className="group sm:hidden">
            <summary
              className="flex cursor-pointer list-none items-center text-neutral-500 transition-colors hover:text-indigo-600 [&::-webkit-details-marker]:hidden dark:text-neutral-400 dark:hover:text-indigo-400"
              aria-label="Section navigation menu"
            >
              <MenuIcon className="h-5 w-5 group-open:hidden" />
              <CloseIcon className="hidden h-5 w-5 group-open:block" />
            </summary>
            <nav
              className="absolute inset-x-0 top-full flex flex-col gap-1 border-b border-neutral-200 bg-white px-6 py-4 dark:border-white/10 dark:bg-neutral-950"
              aria-label="Section navigation"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-1.5 font-mono text-xs font-medium tracking-widest text-neutral-500 uppercase hover:text-indigo-600 dark:text-neutral-500 dark:hover:text-indigo-400"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </details>
        </nav>
      </div>
    </header>
  );
}
