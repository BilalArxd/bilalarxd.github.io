import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
};

export const PAGE_SIZE = 10;

const DEFAULT_POSTS_DIRECTORY = path.join(process.cwd(), "content", "blog");

function requireField(value: unknown, field: string, filename: string): void {
  const isEmptyString = typeof value === "string" && value.trim() === "";
  if (value === undefined || value === null || isEmptyString) {
    throw new Error(
      `Blog post "${filename}" is missing required front-matter field "${field}".`,
    );
  }
}

function parsePostFile(
  postsDirectory: string,
  filename: string,
): { post: Post; filename: string } {
  const filePath = path.join(postsDirectory, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  requireField(data.title, "title", filename);
  requireField(data.date, "date", filename);
  requireField(data.excerpt, "excerpt", filename);

  const parsedDate =
    data.date instanceof Date ? data.date : new Date(data.date);
  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error(
      `Blog post "${filename}" has an invalid "date" value: ${JSON.stringify(data.date)}.`,
    );
  }

  const slug =
    typeof data.slug === "string" && data.slug.trim().length > 0
      ? data.slug.trim()
      : filename.replace(/\.html$/, "");

  return {
    filename,
    post: {
      slug,
      title: String(data.title),
      date: parsedDate.toISOString().slice(0, 10),
      excerpt: String(data.excerpt),
      body: content.trim(),
    },
  };
}

export function getAllPosts(
  postsDirectory: string = DEFAULT_POSTS_DIRECTORY,
): Post[] {
  // content/blog is legitimately empty right now, and git doesn't track
  // empty directories, so a fresh clone/CI checkout won't even have this
  // directory on disk — treat "missing" the same as "empty" rather than
  // throwing ENOENT.
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const filenames = fs
    .readdirSync(postsDirectory)
    .filter((name) => name.endsWith(".html"));

  const parsed = filenames.map((filename) =>
    parsePostFile(postsDirectory, filename),
  );

  const filesBySlug = new Map<string, string[]>();
  for (const { post, filename } of parsed) {
    const existing = filesBySlug.get(post.slug) ?? [];
    existing.push(filename);
    filesBySlug.set(post.slug, existing);
  }
  for (const [slug, files] of filesBySlug) {
    if (files.length > 1) {
      throw new Error(
        `Duplicate blog post slug "${slug}" found in files: ${files.join(", ")}.`,
      );
    }
  }

  return parsed
    .map(({ post }) => post)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getPostBySlug(
  slug: string,
  postsDirectory?: string,
): Post | undefined {
  return getAllPosts(postsDirectory).find((post) => post.slug === slug);
}

export function getPostsPage(
  pageNumber: number,
  postsDirectory?: string,
): Post[] {
  const start = (pageNumber - 1) * PAGE_SIZE;
  return getAllPosts(postsDirectory).slice(start, start + PAGE_SIZE);
}

export function getTotalPages(postsDirectory?: string): number {
  return Math.ceil(getAllPosts(postsDirectory).length / PAGE_SIZE);
}
