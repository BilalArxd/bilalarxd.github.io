import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import { getAllPosts, getPostBySlug } from "../../lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getAllPosts();
  // output: export requires at least one entry, or the build fails outright
  // (see bug.md BLOCKER). With zero posts there's no real slug to emit, so
  // fall back to a placeholder that resolves to notFound() below like any
  // other unknown slug would.
  if (posts.length === 0) return [{ slug: "__placeholder__" }];
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Bilal Arshad`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 xl:max-w-4xl">
        <div className="py-16 sm:py-24">
          <Link
            href="/blog"
            className="font-mono text-xs font-medium tracking-widest text-neutral-500 uppercase hover:text-indigo-600 dark:text-neutral-500 dark:hover:text-indigo-400"
          >
            &larr; Blog
          </Link>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-50">
            {post.title}
          </h1>
          <p className="mt-3 font-mono text-xs text-neutral-500 dark:text-neutral-500">
            <time dateTime={post.date}>{post.date}</time>
          </p>

          {/* No DOMPurify: post.body only ever comes from content/blog/*.html,
              self-authored by Bilal or Claude at build time — never visitor
              input — so the sanitization threat model this rule targets
              doesn't apply here (see specs/002-blog/research.md). */}
          <div
            className="prose prose-neutral dark:prose-invert mt-10 max-w-none"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          <Link
            href="/blog"
            className="mt-12 inline-block font-mono text-xs font-medium tracking-widest text-indigo-600 uppercase hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            &larr; Back to Blog
          </Link>
        </div>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
