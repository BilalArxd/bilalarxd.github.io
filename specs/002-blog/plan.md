# Implementation Plan: Blog — Paginated List & Post Detail Pages

**Spec**: `specs/002-blog/spec.md`
**Created**: 2026-07-28
**Status**: Planned

## Technical Context

- **Runtime/framework**: Next.js 16 (App Router) + React 19 + TypeScript, statically exported (`output: 'export'`) — same project as spec `001-portfolio-hello-world`, no new runtime.
- **Hosting**: GitHub Pages, served from the `out/` artifact produced by the existing `.github/workflows/deploy.yml` on every push to `main`. No server exists at request time (hard constraint carried from spec `001`, reaffirmed in `clarifications.md` Q6) — all blog routes must be fully resolvable via `generateStaticParams` at build time.
- **Content source**: `content/blog/*.html` — one file per post, a `---`-delimited YAML front-matter header parsed with `gray-matter`, followed by the post's raw HTML body (no Markdown/MDX transform; decided in Q6, superseding Q2/Q5).
- **Styling**: Tailwind CSS 4, consistent with existing site components; post bodies wrapped in a `prose` container for typography.
- **New dependency**: `gray-matter` only (front-matter parsing). No `remark`, `remark-html`, or `next-mdx-remote` — those were considered in Q2/Q5 and dropped once the format moved to raw HTML.
- **Database**: None.

## Architecture Decisions

1. **File-based content, zero manifest** — `app/lib/posts.ts` globs `content/blog/*.html` at build time via Node `fs`; there is no index file to maintain. Adding a post is adding a file. *Rationale*: this is the entire point of Story 3/Q5/Q6 — Bilal or Claude publish by writing one file, not by registering it anywhere.
2. **Raw HTML bodies, not Markdown** — front-matter body is used as-is, rendered via `dangerouslySetInnerHTML`. *Rationale*: Q6 reversed the original Markdown plan; content is always self-authored (never visitor input), so this carries no injection risk from untrusted sources, and it removes a rendering dependency (`remark`) entirely.
3. **Build-time pagination via `generateStaticParams`, not client-side** — page 1 lives at `/blog`; pages 2..N live at `/blog/page/[page]`, both enumerated at build time from `getTotalPages()`. *Rationale*: static export has no server to compute pagination on demand; requesting an out-of-range page must 404 by simply not existing as a route (Story 1.4).
4. **Mirror existing patterns, don't invent new ones** — `app/lib/posts.ts` mirrors the shape of `app/lib/projects.ts`; `BlogPostCard.tsx` follows `ProjectCard.tsx`'s conventions but as a distinct component (different fields: date/excerpt vs. tech stack). *Rationale*: `.apex/rules/frontend-architecture-decision` and `react` rule packs favor consistency with established project patterns over new abstractions.
5. **No new CI/CD** — publishing relies entirely on the existing push-triggered GitHub Actions workflow from spec `001`. *Rationale*: Q6 explicitly confirmed this already satisfies "push and it's live quickly" without needing a faster/different deploy mechanism.

## Delivery Strategy

Single-phase build (no incremental rollout needed — two pages, one lib module, no external integrations):

1. **Content layer** — `app/lib/posts.ts` (front-matter parsing, sort, pagination math) + `content/blog/` with 2–3 seed `.html` posts (per Q4/Q6), at least one with an image under `public/blog/<slug>/`.
2. **List UI** — `app/blog/page.tsx`, `app/blog/page/[page]/page.tsx`, `app/components/BlogPostCard.tsx`, `app/components/Pagination.tsx`.
3. **Detail UI** — `app/blog/[slug]/page.tsx`, using the same `prose` styling as the list card excerpt.
4. **Navigation** — add "Blog" link to `app/components/Nav.tsx` (Q3).
5. **Validation** — `next build` locally to confirm all blog routes statically generate, pagination boundaries are correct, and a deliberately broken seed post (missing front-matter field) fails the build with a clear error (Story 3.2).

No feature flags, no phased rollout — this ships as one PR per the project's existing single-increment-per-spec pattern (see spec `001`).

## File Changes

| File | Action | Purpose |
|------|--------|---------|
| `app/lib/posts.ts` | Create | Front-matter parsing, `getAllPosts()`, `getPostBySlug()`, `getPostsPage()`, `getTotalPages()`, `PAGE_SIZE` |
| `app/blog/page.tsx` | Create | Blog list, page 1 (`/blog`) |
| `app/blog/page/[page]/page.tsx` | Create | Blog list, pages 2..N, with `generateStaticParams` |
| `app/blog/[slug]/page.tsx` | Create | Post detail page, with `generateStaticParams` |
| `app/components/BlogPostCard.tsx` | Create | List item: title, date, excerpt, link |
| `app/components/Pagination.tsx` | Create | Prev/next + page links, hidden when 1 page |
| `app/components/Nav.tsx` | Modify | Add "Blog" nav link |
| `content/blog/*.html` | Create | 2–3 seed posts (front-matter + HTML body) |
| `public/blog/<slug>/*` | Create | Seed image asset(s) for at least one post |
| `package.json` | Modify | Add `gray-matter` dependency |

## Risks & Mitigations

(Carried from `spec.md` §6, unchanged)

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Front-matter parsing adds server-only APIs incompatible with static export | Low | Medium | `gray-matter` + Node `fs` used only inside Server Components/`generateStaticParams`, never client-side |
| Pagination route numbering drifts from actual post count as posts are added/removed | Low | Low | Always derive from `getAllPosts().length` via `getTotalPages()`, never hard-code |
| Large post bodies (images, code blocks) breaking styling consistency | Medium | Low | Tailwind `prose` wrapper scopes typography for the raw HTML body |
| Raw HTML body via `dangerouslySetInnerHTML` rendering malformed markup if hand-edited carelessly | Low | Low | Content is self-authored only; a malformed file breaks only that one post's page |
| Expecting instant (non-rebuild) publish when GitHub Pages requires a CI build | Medium | Low | Already set via spec `001`'s ~2-minute build+deploy target; no new expectation introduced here |
