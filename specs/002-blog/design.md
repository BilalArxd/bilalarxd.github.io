# Execution Design: Blog — Paginated List & Post Detail Pages

**Spec**: `specs/002-blog/spec.md`
**Plan**: `specs/002-blog/plan.md`
**Created**: 2026-07-28
**Status**: Designed

## Build Slices

### Slice 1 — Foundation

Content layer that everything else depends on:
- `content/blog/` directory + 2–3 seed `.html` post files (front-matter + HTML body), at least one with an image under `public/blog/<slug>/`.
- `gray-matter` added as a dependency.
- `app/lib/posts.ts`: front-matter parsing, validation (required fields, unique slugs, valid dates), `PAGE_SIZE = 10`, `getAllPosts()`, `getPostBySlug()`, `getPostsPage(pageNumber)`, `getTotalPages()`.

No UI yet — this slice is validated by unit tests on `posts.ts` alone.

### Slice 2 — Core Logic (list + pagination)

- `app/blog/page.tsx` — page 1, using `getPostsPage(1)`.
- `app/blog/page/[page]/page.tsx` — pages 2..N via `generateStaticParams`.
- `app/components/BlogPostCard.tsx`, `app/components/Pagination.tsx`.

Depends on Slice 1's `posts.ts` contract being stable.

### Slice 3 — Interface / Integration (detail page + nav)

- `app/blog/[slug]/page.tsx` — post detail, `generateStaticParams` over all slugs, raw HTML body via `dangerouslySetInnerHTML` in a `prose` wrapper, back-link to the list.
- `app/components/Nav.tsx` — add "Blog" link.

Depends on Slice 1; independent of Slice 2 (can build in parallel once `posts.ts` exists).

### Slice 4 — Verification and Hardening

- `next build` full static export check: confirm `out/blog/`, `out/blog/page/2/` (if applicable), `out/blog/<slug>/` all exist as pre-rendered routes with no dynamic-route warnings.
- Negative-path checks: missing front-matter field fails the build with a clear file-identifying error; duplicate slugs fail the build; out-of-range pagination page is simply absent (404) rather than erroring at runtime.
- Accessibility pass: single `h1` per page, `lang` attribute inherited from root layout, pagination links are real `<a>`/`Link` elements (not JS-only click handlers) so they work without client JS and are keyboard-navigable.

## Component Boundaries

- **`app/lib/posts.ts`** — sole owner of reading/parsing/validating `content/blog/`. No component or page touches `fs`/`gray-matter` directly; everything goes through this module (mirrors `app/lib/projects.ts`'s role).
- **`app/blog/page.tsx` / `app/blog/page/[page]/page.tsx`** — thin Server Components: call `getPostsPage(n)` + `getTotalPages()`, render `BlogPostCard` list + `Pagination`. No parsing logic here.
- **`app/blog/[slug]/page.tsx`** — thin Server Component: call `getPostBySlug(slug)`, render title/date/body. No parsing logic here.
- **`BlogPostCard` / `Pagination`** — presentational only, no data fetching; receive fully-resolved props.
- **`Nav.tsx`** — one added link; no new state or logic.

## State Transitions / Flows

This is a static-content feature — there is no client-side state machine. The only "flow" is build-time:

```
content/blog/*.html (files added/edited/removed)
        ↓
   git push to main
        ↓
GitHub Actions: npm ci → lint → typecheck → next build
        ↓
  app/lib/posts.ts reads + validates all files
        ↓
generateStaticParams enumerates: all slugs, all valid page numbers
        ↓
  out/ artifact includes new/updated static routes
        ↓
  GitHub Pages deploy (existing pipeline, spec 001)
        ↓
  Post live at /blog/<slug>; list/pagination reflect it
```

Any validation failure (missing field, duplicate slug, bad date) breaks this chain at the "read + validate" step — the build fails and nothing deploys, per Story 3.2.

## Failure Modes

| Failure | Where it surfaces | Handling |
|---------|-------------------|----------|
| Missing required front-matter field | `next build` (local or CI) | Throw with file path + missing field name; build fails, nothing deploys |
| Duplicate slug across two files | `next build` | Throw naming both files; build fails |
| Unparsable `date` | `next build` | Throw with file path; build fails |
| Post references an image path that doesn't exist under `public/` | Browser (broken image icon) | Not build-time validated (out of scope — no requirement to check asset existence); acceptable since content is self-authored and visually checked before push |
| Visitor requests a slug/page number with no static route | GitHub Pages | Standard static 404 — no special handling needed, this is the intended behavior (Story 1.4, 2.3) |
| Malformed HTML in a post body | Rendered post page | That single post's page may render oddly; does not affect other posts or the list — acceptable per `research.md` (self-authored content, no sanitizer) |

## Observability Hooks

None beyond what already exists — this is a static site with no runtime logging/metrics layer (no backend to instrument). Build-time errors are visible directly in the GitHub Actions run output (existing CI from spec `001`), which is sufficient signal for a solo-maintained static blog.

## Rollback Notes

- Purely additive change set (new files + one line in `Nav.tsx` + one new dependency). Reverting the PR fully removes the feature with no residual state (no database, no migrations, no feature flags to unwind).
- If a bad post is pushed and deployed, the fix is either editing/removing that `content/blog/*.html` file or reverting the offending commit — no other cleanup needed.
