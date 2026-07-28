import type { Metadata } from "next";
import Link from "next/link";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";
import { PROJECTS } from "../lib/projects";

export const metadata: Metadata = {
  title: "Projects | Bilal Arshad",
  description:
    "Selected engineering projects by Bilal Arshad, spanning applied AI, backend platforms, and cloud-native systems.",
};

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 xl:max-w-4xl">
        <div className="py-16 sm:py-24">
          <Link
            href="/"
            className="font-mono text-xs font-medium tracking-widest text-neutral-500 uppercase hover:text-indigo-600 dark:text-neutral-500 dark:hover:text-indigo-400"
          >
            &larr; Home
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-50">
            Projects
          </h1>
          <p className="mt-3 max-w-xl text-neutral-600 dark:text-neutral-400">
            {PROJECTS.length} projects across applied AI, backend platforms,
            and cloud-native systems.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {PROJECTS.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 6) * 60}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
