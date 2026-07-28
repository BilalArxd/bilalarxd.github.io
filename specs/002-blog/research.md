# Research Notes: Blog — Paginated List & Post Detail Pages

## Decision Log

- **Topic**: Post content format (Markdown vs. HTML vs. MDX)
  - **Options considered**: Markdown + `remark`/`remark-html`; MDX via `next-mdx-remote`; raw `.html` files with a front-matter header.
  - **Recommended choice**: Raw `.html` files with YAML front-matter, parsed with `gray-matter` only.
  - **Rationale**: See `clarifications.md` Q2 (initial Markdown decision), Q5 (considered and rejected mixing formats), Q6 (final reversal to HTML-only). Driving factor: user wants Claude to generate a post file directly and push it — plain HTML is at least as easy for Claude to produce correctly as Markdown, and dropping the Markdown render step removes a dependency (`remark`) with no loss of capability, since the body can already contain any HTML construct the acceptance criteria require.

- **Topic**: Pagination mechanism under static export
  - **Options considered**: Client-side pagination (fetch all posts, paginate in the browser); server-side pagination (requires a running server — not available on GitHub Pages); build-time pagination via `generateStaticParams` producing one static route per page.
  - **Recommended choice**: Build-time pagination, one route per page (`/blog`, `/blog/page/2`, …).
  - **Rationale**: Only option compatible with GitHub Pages (no server, no client-side data fetching needed for something this simple); keeps first-load payload small (only that page's posts are in the HTML) versus shipping every post's data to paginate client-side.

- **Topic**: How "publish without a manual step" is actually achieved
  - **Options considered**: (a) true runtime folder scan — impossible, no server at request time; (b) client-side fetch from GitHub API/raw.githubusercontent.com at page load — avoids rebuild but costs SEO and hits anonymous API rate limits; (c) move to a host with a running server (e.g. Vercel) — solves it but abandons the GitHub Pages pipeline just built in spec `001`; (d) keep static build-time generation, rely on the CI pipeline that already auto-builds+deploys on every push.
  - **Recommended choice**: (d).
  - **Rationale**: `clarifications.md` Q6 — the user's real requirement ("push and it's there quickly, no manual step") is already satisfied by the existing push-triggered Actions workflow from spec `001` (~2 min). The "runtime" framing in the original request was about avoiding manual effort, not literal request-time computation; (b) and (c) both introduce real costs ((b): no SEO, rate limits, CSR flash; (c): full re-architecture) for no additional benefit once (d) is understood to already deliver the actual goal.

- **Topic**: Front-matter parsing library
  - **Options considered**: `gray-matter` (mature, format-agnostic — splits a `---` block from any following content regardless of file extension); hand-rolled regex splitter.
  - **Recommended choice**: `gray-matter`.
  - **Rationale**: Already the plan's front-matter tool from the Markdown-based design (Q1–Q5); works identically on `.html` files since it doesn't care what the body content is, so switching formats in Q6 required no change to this choice — only the removal of the Markdown render step that used to follow it.

- **Topic**: Rendering the post body safely
  - **Options considered**: `dangerouslySetInnerHTML` (React's standard escape hatch for pre-formatted HTML); a sanitizer library (e.g. `sanitize-html` / DOMPurify) before rendering.
  - **Recommended choice**: `dangerouslySetInnerHTML`, no sanitizer.
  - **Rationale**: Content is exclusively self-authored (Bilal or Claude writing files into the repo, never visitor-submitted or fetched from an untrusted source) — the standard XSS threat model for `dangerouslySetInnerHTML` (rendering attacker-controlled content) doesn't apply here. Adding a sanitizer would be scope creep with no corresponding requirement.

## Unknowns

None outstanding — all six clarification rounds (`clarifications.md` Q1–Q6) reached definitive, non-deferred decisions before planning began.

## References

- `specs/002-blog/spec.md` — resolved specification (Status: Clarified)
- `specs/002-blog/clarifications.md` — Q1–Q6 decision log
- `specs/001-portfolio-hello-world/spec.md` — establishes the static-export + GitHub Pages CI/CD architecture this spec builds on top of, unchanged
- `app/lib/projects.ts`, `app/components/ProjectCard.tsx` — existing project patterns mirrored by `app/lib/posts.ts` / `app/components/BlogPostCard.tsx`
