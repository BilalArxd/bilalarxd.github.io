import Link from "next/link";
import type { Post } from "../lib/posts";

export default function BlogPostCard({ post }: { post: Post }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-neutral-200 p-5 transition-colors hover:border-indigo-400 dark:border-white/10 dark:hover:border-indigo-500/60">
      <p className="font-mono text-xs text-neutral-500 dark:text-neutral-500">
        <time dateTime={post.date}>{post.date}</time>
      </p>
      <h3 className="mt-2 font-semibold text-neutral-900 dark:text-neutral-100">
        <Link
          href={`/blog/${post.slug}`}
          className="hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {post.excerpt}
      </p>
      <Link
        href={`/blog/${post.slug}`}
        className="mt-4 font-mono text-xs font-medium tracking-widest text-indigo-600 uppercase hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
      >
        Read post &rarr;
      </Link>
    </article>
  );
}
