export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-8 text-center dark:border-white/10">
      <a
        href="/assets/resume/Bilal_Arshad_Resume.pdf"
        download="Bilal_Arshad_Resume.pdf"
        className="font-mono text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
      >
        Download CV
      </a>
      <p className="mt-3 font-mono text-xs text-neutral-500 dark:text-neutral-500">
        Built by Bilal Arshad with Next.js &amp; Tailwind CSS.
      </p>
    </footer>
  );
}
