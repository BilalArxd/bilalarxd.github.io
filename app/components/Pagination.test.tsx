import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Pagination from "./Pagination";

describe("Pagination", () => {
  it("renders nothing when there is only one page", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("hides Prev on the first page and shows Next", () => {
    render(<Pagination currentPage={1} totalPages={3} />);
    expect(screen.queryByRole("link", { name: /prev/i })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /next/i })).toBeInTheDocument();
  });

  it("hides Next on the last page and shows Prev", () => {
    render(<Pagination currentPage={3} totalPages={3} />);
    expect(screen.getByRole("link", { name: /prev/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /next/i })).not.toBeInTheDocument();
  });

  it("shows both Prev and Next on a middle page", () => {
    render(<Pagination currentPage={2} totalPages={3} />);
    expect(screen.getByRole("link", { name: /prev/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /next/i })).toBeInTheDocument();
  });

  it("links page 1 to the base path with no /page/ segment", () => {
    render(<Pagination currentPage={2} totalPages={3} basePath="/blog" />);
    const pageOneLink = screen.getByRole("link", { name: "1" });
    expect(pageOneLink).toHaveAttribute("href", "/blog");
  });

  it("links other pages to /page/N", () => {
    render(<Pagination currentPage={1} totalPages={3} basePath="/blog" />);
    const pageThreeLink = screen.getByRole("link", { name: "3" });
    expect(pageThreeLink).toHaveAttribute("href", "/blog/page/3");
  });

  it("marks the current page with aria-current and no link", () => {
    render(<Pagination currentPage={2} totalPages={3} />);
    const current = screen.getByText("2");
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current.tagName).not.toBe("A");
  });
});
