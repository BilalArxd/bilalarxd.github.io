import type { Metadata } from "next";
import Link from "next/link";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import BlogPostCard from "../components/BlogPostCard";
import Pagination from "../components/Pagination";
import Reveal from "../components/Reveal";
import { getAllPosts, getPostsPage, getTotalPages } from "../lib/posts";

export const metadata: Metadata = {
  title: "Blog | Bilal Arshad",
  description:
    "Writing on applied AI, backend engineering, and building production systems.",
};

export default function BlogPage() {
  const posts = getPostsPage(1);
  const totalPages = getTotalPages();
  const totalPosts = getAllPosts().length;

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
            Blog
          </h1>
          <p className="mt-3 max-w-xl text-neutral-600 dark:text-neutral-400">
            {totalPosts === 0
              ? "No posts yet — check back soon."
              : `${totalPosts} post${totalPosts === 1 ? "" : "s"} on applied AI, backend engineering, and building production systems.`}
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 6) * 60}>
                <BlogPostCard post={post} />
              </Reveal>
            ))}
          </div>

          <Pagination currentPage={1} totalPages={totalPages} />
        </div>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
