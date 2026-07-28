export default function Hero() {
  return (
    <section className="py-20 sm:py-28">
      <p className="font-mono text-sm text-indigo-600 dark:text-indigo-400">
        Amsterdam, Netherlands
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl dark:text-neutral-50">
        Bilal Arshad
      </h1>
      <p className="mt-3 text-xl font-medium text-neutral-700 dark:text-neutral-300">
        Senior Backend &amp; Applied AI Engineer
      </p>
      <p className="mt-5 max-w-xl text-neutral-600 dark:text-neutral-400">
        13+ years building backend platforms, cloud-native systems, and
        agentic AI, from .NET &amp; Azure to LangGraph &amp; AWS Bedrock.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
        >
          View Work
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:border-indigo-400 hover:text-indigo-600 dark:border-white/15 dark:text-neutral-300 dark:hover:border-indigo-500/60 dark:hover:text-indigo-400"
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
}
