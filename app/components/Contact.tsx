import Reveal from "./Reveal";
import {
  ArrowUpRightIcon,
  GithubIcon,
  LinkedInIcon,
  MailIcon,
} from "./icons";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-24">
      <Reveal>
        <h2 className="font-mono text-xs font-semibold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
          Contact
        </h2>
        <h3 className="mt-4 max-w-xl text-2xl font-bold text-neutral-900 sm:text-3xl dark:text-neutral-50">
          Open to conversations about backend architecture and applied AI.
        </h3>
        <p className="mt-4 max-w-lg text-neutral-600 dark:text-neutral-400">
          Based in Amsterdam and currently focused on production-grade
          agentic AI and backend systems for enterprise clients. The quickest
          way to reach me is by email. I try to reply within a couple of
          days.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="mailto:mail.BilalArshad@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
          >
            <MailIcon className="h-4 w-4" />
            mail.BilalArshad@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/bilalarxd"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:border-indigo-400 hover:text-indigo-600 dark:border-white/15 dark:text-neutral-300 dark:hover:border-indigo-500/60 dark:hover:text-indigo-400"
          >
            <LinkedInIcon className="h-4 w-4" />
            LinkedIn
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
          <a
            href="https://github.com/BilalArxd"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:border-indigo-400 hover:text-indigo-600 dark:border-white/15 dark:text-neutral-300 dark:hover:border-indigo-500/60 dark:hover:text-indigo-400"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
