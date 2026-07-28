import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BlogPostCard from "./BlogPostCard";
import type { Post } from "../lib/posts";

const post: Post = {
  slug: "my-post",
  title: "My Post",
  date: "2026-07-28",
  excerpt: "A short excerpt.",
  body: "<p>Full body</p>",
};

describe("BlogPostCard", () => {
  it("renders the title, date, and excerpt", () => {
    render(<BlogPostCard post={post} />);
    expect(screen.getByText("My Post")).toBeInTheDocument();
    expect(screen.getByText("2026-07-28")).toBeInTheDocument();
    expect(screen.getByText("A short excerpt.")).toBeInTheDocument();
  });

  it("links to the post's detail page", () => {
    render(<BlogPostCard post={post} />);
    const links = screen.getAllByRole("link");
    for (const link of links) {
      expect(link).toHaveAttribute("href", "/blog/my-post");
    }
  });
});
