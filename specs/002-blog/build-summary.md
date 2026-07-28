# Build Summary: Blog — Paginated List & Post Detail Pages

**Spec**: `specs/002-blog/spec.md`
**Tasks**: `specs/002-blog/tasks.md`
**Run date**: 2026-07-28
**Tasks completed this run**: T1–T9 (all)

---

## Files changed

### Added
- `app/lib/posts.ts` — front-matter parsing, validation, sort, pagination
- `app/lib/posts.test.ts` — unit tests (18 tests)
- `app/lib/__fixtures__/blog-valid/*.html`, `blog-missing-title/`, `blog-missing-date/`, `blog-missing-excerpt/`, `blog-invalid-date/`, `blog-duplicate-slug/`, `blog-pagination/` (test fixtures)
- `app/components/BlogPostCard.tsx` + `BlogPostCard.test.tsx`
- `app/components/Pagination.tsx` + `Pagination.test.tsx`
- `app/blog/page.tsx` — list page 1
- `app/blog/page/[page]/page.tsx` — pagination pages 2..N (see deviation below)
- `app/blog/[slug]/page.tsx` — post detail page
- `content/blog/building-velocity-ai.html`, `apex-governance-framework.html`, `static-blog-on-github-pages.html` — seed posts
- `public/blog/building-velocity-ai/cover.svg` — seed image asset
- `vitest.config.ts`, `vitest.setup.ts` — test runner setup (new, see deviation below)

### Modified
- `app/components/Nav.tsx` — added "Blog" nav link
- `app/globals.css` — added `@plugin "@tailwindcss/typography"` for the `prose` classes used on post bodies
- `package.json` — added `gray-matter` (runtime dep), `vitest` + `@testing-library/*` + `jsdom` + `@vitejs/plugin-react` + `@tailwindcss/typography` (dev deps), added `"test": "vitest run"` script
- `.github/workflows/deploy.yml` — added a `Test` step (`npm test`) between typecheck and build

## Tests added

- `app/lib/posts.test.ts` — 18 tests: sort order, slug derivation (explicit + filename-derived), raw-HTML body passthrough, all 4 validation-rule failures (missing title/date/excerpt, invalid date), duplicate-slug detection, `getPostBySlug` (found/not found), pagination boundary math (12-post fixture: page 1 = 10 items, page 2 = 2 items, `getTotalPages` = 2), single-page fixture reports `totalPages = 1`, real seed-content smoke test (≥2 posts parse cleanly, at least one has an image).
- `app/components/Pagination.test.tsx` — 7 tests: hides entirely at 1 page, Prev/Next boundary states (first/last/middle page), page-1 link omits `/page/` segment, other pages link to `/page/N`, current page has `aria-current` and is not a link.
- `app/components/BlogPostCard.test.tsx` — 2 tests: renders title/date/excerpt, all links point at the post's detail URL.

**27 tests total, all passing.** No E2E/browser test runner exists in this project (see Deviations) — integration-level acceptance criteria (page rendering, 404s on invalid routes/slugs, negative-path build failures) were verified directly against the static `next build` output and via `curl` against a local static file server, with exact commands recorded below.

## Commands run

```bash
npm install gray-matter
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react @testing-library/dom @tailwindcss/typography
npm run lint          # clean
npx tsc --noEmit       # clean
npm test               # 27/27 passing
npm run build           # succeeds; routes: /blog, /blog/[slug] ×3, /blog/page/[page] → /blog/page/1
```

Negative-path verification (each performed, confirmed failing correctly, then reverted with a `diff` check to confirm a clean restore):
- Removed `title` from `content/blog/building-velocity-ai.html` → `next build` failed with `Blog post "building-velocity-ai.html" is missing required front-matter field "title".`
- Forced a duplicate `slug: building-velocity-ai` into `apex-governance-framework.html` → `next build` failed with `Duplicate blog post slug "building-velocity-ai" found in files: apex-governance-framework.html, building-velocity-ai.html.`

Live static-server verification (`npx serve out`, then `curl -o /dev/null -w '%{http_code}'`):
- `/blog` → 200
- `/blog/building-velocity-ai` → 200
- `/blog/does-not-exist` → 404
- `/blog/page/2` → 404 (no route generated; only 3 seed posts fit on page 1)

## Notable deviations from plan/design

1. **Added a test runner (Vitest) not present in the original plan.** The project had zero test infrastructure. Rather than silently skip the unit/component tests `tasks.md` calls for, this was raised to the user directly (`AskUserQuestion`), who chose "Add Vitest." This added `vitest.config.ts`, `vitest.setup.ts`, and several devDependencies not listed in `plan.md`'s File Changes table.

2. **No E2E/browser test runner.** `plan.md`/`tasks.md` call several acceptance items "Integration/E2E." No Playwright/Cypress exists in this project, and spec `001-portfolio-hello-world` explicitly deferred automated E2E testing. Rather than add a new E2E framework (out of scope for this feature), those checks were done via `next build` static-output inspection and `curl` against a locally served `out/` — sufficient to verify real rendered HTML and real 404 behavior, just not via a browser automation tool. Flagged here as a scope decision, not a silent gap.

3. **Real Next.js `output: 'export'` constraint discovered and fixed, not anticipated in design.md.** A dynamic route (`app/blog/page/[page]/page.tsx`) whose `generateStaticParams()` legitimately returns zero entries (because `getTotalPages() === 1` with only 3 seed posts) is rejected by Next.js at build time with `Error: Page "/blog/page/[page]" is missing "generateStaticParams()"` — even though the function exists and correctly computes zero extra pages. Root cause confirmed in `next/dist/build/index.js`: an app-router dynamic route under static export needs `generateStaticParams` to return **at least one** entry.
   - **Fix**: `[page]`'s `generateStaticParams` now always includes page 1 (in addition to any real pages 2..N), guaranteeing ≥1 entry in all cases (even 0 posts → 1 page → `[{page: "1"}]`).
   - Visiting `/blog/page/1` directly redirects (`next/navigation`'s `redirect()`) to the canonical `/blog`, so this never surfaces as a duplicate-content page in practice — `Pagination.tsx` never links to `/blog/page/1` in the first place (only ever to `/blog`).
   - This is a deviation from `design.md`'s stated rule ("page 1 stays at `/blog` and is not duplicated under `/page/1`") in that the *route* now technically exists at build time, but the *behavior* (no duplicate content served/linked) is preserved via the redirect.

4. **Added `@tailwindcss/typography`**, not listed as a dependency anywhere in `plan.md`. Needed for the `prose`/`prose-invert` classes used to style rendered post bodies (spec §3.2/§3.5 calls for Tailwind `prose` styling, but the plugin itself wasn't in the dependency list).

5. **Seed content is fiction written for this feature** (about Velocity AI, Apex itself, and this blog's own static-content architecture) rather than pre-existing material — no existing blog content existed to seed from.

## Post-compliance local run (found and fixed 2 bugs)

Ran `/apex:compliance` then `npm run dev` locally per user request, and caught two real bugs that the static-build/curl checks during T9 hadn't exercised (because they only hit the currently-valid routes):

1. **`/blog/does-not-exist` returned a blank `200` instead of `404`.** `app/blog/[slug]/page.tsx` returned `null` when `getPostBySlug` found nothing, instead of calling `notFound()`. Fixed: added `export const dynamicParams = false` and `notFound()` from `next/navigation`. Verified: `curl` now returns `404` for unknown slugs, both against `next dev` and the real static `next build` output served via `npx serve`.
2. **`/blog/page/2` (out of range) 500s in `next dev`, but correctly 404s in the actual static build.** Root cause: with `output: 'export'`, Next's dev server does its own static-param validation for a dynamic route and throws an internal `Error: Page "..." is missing param ... required with "output: export" config` for an out-of-range *numeric* segment specifically (a non-numeric segment like `/blog/page/abc` reaches the page component's own `notFound()` guard and 404s cleanly in dev) — this reproduced identically with or without `dynamicParams = false` set, so it's a `next dev` + `output: export` interaction, not something app code controls. Added an explicit `notFound()` guard for out-of-range/non-integer page numbers regardless (correct behavior, and fixes the non-numeric case). **Confirmed the actual deployed artifact is unaffected**: re-ran the full `next build` → `npx serve out` → `curl` cycle and `/blog/page/2` correctly returns `404` against the real static output, which is what GitHub Pages actually serves. The 500 is a `next dev`-only cosmetic quirk in this specific edge case, not a production defect — recorded here rather than silently ignored.

Full re-verification after both fixes (against the rebuilt static output): `/`, `/blog`, and all 3 post detail pages → `200`; `/blog/does-not-exist`, `/blog/page/2`, `/blog/page/abc` → `404`; nav "Blog" link present on the home page. `npx tsc --noEmit`, `npm run lint`, and `npm test` (27/27) all still clean after the fix.

## Blockers / follow-up items

None blocking. Two low-priority notes:
- `npm audit` reports 12 high-severity advisories in transitive dev/build dependencies (pre-existing before this feature; not newly introduced — same count before and after `gray-matter`/Vitest installs were traced). Not investigated further as out of scope for this feature; worth a separate look.
- With only 3 seed posts, pagination page 2+ has no real content to visually verify beyond the fixture-based unit tests. If more posts are added later such that `getTotalPages() > 1`, it would be worth a quick manual check of `/blog/page/2` in a browser at that time.
