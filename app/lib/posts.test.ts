import path from "path";
import { describe, expect, it } from "vitest";
import {
  PAGE_SIZE,
  getAllPosts,
  getPostBySlug,
  getPostsPage,
  getTotalPages,
} from "./posts";

const fixture = (name: string) =>
  path.join(__dirname, "__fixtures__", name);

describe("getAllPosts", () => {
  it("returns posts sorted newest-first", () => {
    const posts = getAllPosts(fixture("blog-valid"));
    expect(posts.map((p) => p.title)).toEqual([
      "Second Post", // 2026-03-01
      "Third Post", // 2026-02-01
      "First Post", // 2026-01-01
    ]);
  });

  it("derives slug from filename when not set in front-matter", () => {
    const posts = getAllPosts(fixture("blog-valid"));
    const first = posts.find((p) => p.title === "First Post");
    expect(first?.slug).toBe("post-1");
  });

  it("uses explicit slug from front-matter when present", () => {
    const posts = getAllPosts(fixture("blog-valid"));
    const third = posts.find((p) => p.title === "Third Post");
    expect(third?.slug).toBe("custom-slug-three");
  });

  it("keeps the raw HTML body intact", () => {
    const posts = getAllPosts(fixture("blog-valid"));
    const third = posts.find((p) => p.title === "Third Post");
    expect(third?.body).toContain("<img");
  });

  it("throws a file-identifying error when title is missing", () => {
    expect(() => getAllPosts(fixture("blog-missing-title"))).toThrowError(
      /bad-post\.html.*title/i,
    );
  });

  it("throws a file-identifying error when date is missing", () => {
    expect(() => getAllPosts(fixture("blog-missing-date"))).toThrowError(
      /bad-post\.html.*date/i,
    );
  });

  it("throws a file-identifying error when excerpt is missing", () => {
    expect(() => getAllPosts(fixture("blog-missing-excerpt"))).toThrowError(
      /bad-post\.html.*excerpt/i,
    );
  });

  it("throws a file-identifying error when date is unparsable", () => {
    expect(() => getAllPosts(fixture("blog-invalid-date"))).toThrowError(
      /bad-post\.html/i,
    );
  });

  it("throws naming both files when slugs collide", () => {
    expect(() => getAllPosts(fixture("blog-duplicate-slug"))).toThrowError(
      /same-slug.*first\.html.*second\.html|same-slug.*second\.html.*first\.html/i,
    );
  });
});

describe("getPostBySlug", () => {
  it("finds a post by its slug", () => {
    const post = getPostBySlug("custom-slug-three", fixture("blog-valid"));
    expect(post?.title).toBe("Third Post");
  });

  it("returns undefined for an unknown slug", () => {
    const post = getPostBySlug("does-not-exist", fixture("blog-valid"));
    expect(post).toBeUndefined();
  });
});

describe("pagination", () => {
  const dir = fixture("blog-pagination");

  it("PAGE_SIZE is 10", () => {
    expect(PAGE_SIZE).toBe(10);
  });

  it("getTotalPages computes ceil(count / PAGE_SIZE)", () => {
    expect(getTotalPages(dir)).toBe(2); // 12 posts / 10 per page
  });

  it("getPostsPage(1) returns the newest PAGE_SIZE posts", () => {
    const page1 = getPostsPage(1, dir);
    expect(page1).toHaveLength(10);
    expect(page1[0].title).toBe("Post Number 12");
    expect(page1[9].title).toBe("Post Number 03");
  });

  it("getPostsPage(2) returns the remainder", () => {
    const page2 = getPostsPage(2, dir);
    expect(page2).toHaveLength(2);
    expect(page2[0].title).toBe("Post Number 02");
    expect(page2[1].title).toBe("Post Number 01");
  });

  it("a single-page fixture reports totalPages 1", () => {
    expect(getTotalPages(fixture("blog-valid"))).toBe(1);
  });
});

describe("seed content (content/blog)", () => {
  it("parses all real seed posts without error and finds at least 1", () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThanOrEqual(1);
    for (const post of posts) {
      expect(post.title.length).toBeGreaterThan(0);
      expect(post.excerpt.length).toBeGreaterThan(0);
    }
  });

  it("at least one seed post includes an image", () => {
    const posts = getAllPosts();
    expect(posts.some((post) => post.body.includes("<img"))).toBe(true);
  });
});
