import Link from "next/link";
import { GithubIcon, MailIcon } from "./icons";

const NAV_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
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
              aria-label="Send an email"
              className="text-neutral-500 transition-colors hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400"
            >
              <MailIcon className="h-5 w-5" />
            </a>
          </div>
        </nav>
      </div>

      <nav
        className="mx-auto flex max-w-3xl flex-wrap gap-x-5 gap-y-2 px-6 pb-4 sm:hidden xl:max-w-4xl"
        aria-label="Section navigation"
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-mono text-xs font-medium tracking-widest text-neutral-500 uppercase hover:text-indigo-600 dark:text-neutral-500 dark:hover:text-indigo-400"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
