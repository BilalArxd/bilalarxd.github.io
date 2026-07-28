# Clarifications: 002-blog

**Spec**: `specs/002-blog/spec.md`
**Date**: 2026-07-28

---

## Q1 — What is the page size for the paginated list?

**Context**: Story 1 says "the first page shows the newest N posts" and §3.2 references a `PAGE_SIZE` constant, but no number is fixed anywhere in the spec.

**Options**:
- **A. 10 posts per page** — common blog default, works well once there are >10 posts.
- **B. 5 posts per page** — surfaces pagination behavior (Story 1.2/1.4) sooner with only a handful of seed posts, easier to demo/test.
- **C. Configurable via a single exported constant, default 10** — same as A but explicitly named so it's trivial to change later.

**Recommended decision**: **C** — `PAGE_SIZE = 10` exported from `app/lib/posts.ts`. Gives a normal reading experience while keeping the number a one-line change.

**Resolution**: Adopted C. Spec §3.5 updated to name the constant location and default explicitly.

---

## Q2 — Which Markdown rendering approach, and is code-block syntax highlighting in scope?

**Context**: §3.2 lists `remark`/`remark-html` or `next-mdx-remote` as alternatives without choosing one. Story 2.1 requires "code blocks" to render but doesn't say whether they need syntax highlighting.

**Options**:
- **A. `gray-matter` (front-matter) + `remark`/`remark-html` (plain HTML output), no syntax highlighting** — simplest, fewest dependencies, code blocks render as plain monospace `<pre><code>`.
- **B. Same as A, plus `rehype-highlight` or `rehype-pretty-code` for syntax highlighting** — nicer for code-heavy posts, adds build-time-only dependencies (safe for static export).
- **C. `next-mdx-remote` (MDX)** — allows embedding React components in posts, but is more machinery than "keep it simple" calls for and isn't needed by any acceptance criterion.

**Recommended decision**: **A** for this increment, with syntax highlighting explicitly deferred rather than silently dropped.

**Resolution**: Adopted A. Plain Markdown → HTML via `gray-matter` + `remark`/`remark-html`, styled with Tailwind `prose`. Syntax highlighting added to Out of Scope (§5) as a deferred enhancement, not a gap.

---

## Q3 — Should "Blog" appear in the site's primary navigation?

**Context**: The spec defines the `/blog` and `/blog/[slug]` routes but never mentions `app/components/Nav.tsx`, which already links to Experience and Projects. Without an explicit decision, the blog would ship with no discoverable entry point from the rest of the site.

**Options**:
- **A. Add a "Blog" link to `Nav.tsx`** alongside existing Experience/Projects links — consistent with how those sections were surfaced.
- **B. Leave it unlinked for now** (reachable only by direct URL) — matches "keep it simple" literally, defers nav design.

**Recommended decision**: **A** — an unlinked blog contradicts Story 1's premise (visitors browsing to read posts) and existing sections already establish the nav pattern to follow.

**Resolution**: Adopted A. Spec §3.2 and §3.5 updated to include a `Nav.tsx` link to `/blog`.

---

## Q4 — How many seed posts, and how are images inside post bodies handled under static export?

**Context**: Story 3 says content is added as Markdown files with "at least one seed post included so the feature is demonstrable" but doesn't fix a count. Story 2.1 requires images to render inside post bodies, but the spec doesn't say where image files live or how paths resolve under `output: 'export'` + `images: { unoptimized: true }` (per spec `001-portfolio-hello-world`).

**Options**:
- **A. 2–3 seed posts, images referenced via absolute `/public` paths** (e.g. `public/blog/<slug>/cover.png` → `![](/blog/<slug>/cover.png)`) rendered as plain `<img>` (no `next/image`, consistent with the existing unoptimized-images setup) — no seed post is required to include an image, since none of the acceptance criteria mandate one.
- **B. 1 seed post, defer image support entirely** — smaller footprint but leaves Story 2.1's "images" claim untested by seed content.

**Recommended decision**: **A**, but images remain optional per seed post (not every post needs one) — this satisfies the acceptance criterion structurally (the rendering path supports images) without requiring image assets to be fabricated just to prove it.

**Resolution**: Adopted A. Spec §3.3/§3.5 updated: seed content is 2–3 posts, at least one of which includes an image via a `public/blog/` path rendered as a plain `<img>`.

---

## Q5 — Can post files be plain HTML instead of/in addition to Markdown, and does the design support Claude generating a post directly from a work summary?

**Context**: Follow-up question — "Is it possible to have a blog folder and place html files or md files there... so that from Claude I can generate summaries of the work I am doing and generate a blogpost right away?" Story 3 (§2) and §3.2/§3.5 already describe a drop-a-file-and-rebuild workflow, but only for `.md`; the question raises two things: (a) should raw `.html` files be supported as an alternative post format, and (b) does this design actually satisfy "Claude writes a post with no other code changes."

**Context on (b)**: Yes, by construction. `getAllPosts()`/`getPostsPage()`/`getPostBySlug()` (§3.5) read every file in `content/blog/` at build time — there is no manifest, index file, or registration step to update. Dropping in a new `.md` file with valid front-matter and rebuilding is the entire authoring workflow; this is exactly what's needed for "Claude generates a post, drops the file, done."

**Options for (a) — HTML post format**:
- **A. Markdown-only (`.md`)** — one input format, one parser (`gray-matter` + `remark`), one set of front-matter rules. Claude (or Bilal) writes Markdown directly; no HTML escaping/sanitization concerns since the renderer controls all HTML output.
- **B. Support both `.md` and `.html` files in `content/blog/`** — `.html` files would need their own front-matter convention (Markdown front-matter parsers don't apply to raw HTML) and their body would be trusted raw HTML injected into the page, which needs sanitization consideration even though content is self-authored, plus doubles the parsing/validation logic in `posts.ts` for no functional gain over A.
- **C. HTML-only** — drop Markdown; harder for Claude to generate cleanly (more verbose, easier to produce invalid nesting) and loses the plain-text-diffable authoring experience Markdown gives.

**Recommended decision**: **A** — Markdown-only. It already fully satisfies the "Claude generates a post and drops the file" goal (confirmed above), Claude writes clean Markdown at least as easily as HTML, and it avoids maintaining two parsing/validation paths in `app/lib/posts.ts` for a format (raw HTML files) that adds risk (unsanitized HTML injection) without adding capability (Markdown's `remark`/`remark-html` pipeline can already emit any HTML construct Story 2.1 requires — headings, lists, code blocks, links, images).

**Resolution**: Adopted A. Spec Story 3 and §5 (Out of Scope) updated to state explicitly that the content format is Markdown-only (no raw `.html` post files) and that this workflow is designed for either Bilal or Claude to author a post by writing a single `.md` file — no other code/config changes needed to publish it.

---

## Q6 — Runtime discovery vs. build-time discovery, and reversing Q5 to raw HTML post files

**Context**: Follow-up request — "It should not create list on build time but on runtime it should get all folder content so that if I push a new md build don't need to run on it and its there quickly." Then, after being shown the hosting constraint, follow-up: "Let's keep each page as static html page I will create new html page and push — would the blog page be able to read the html files and provide a list based on that?"

**Hard constraint (unchanged, not up for revision here)**: `bilalarxd.github.io` is a fully static export deployed to GitHub Pages (spec `001-portfolio-hello-world`). GitHub Pages serves static files only — there is no server process at request time that could scan `content/blog/` when a visitor loads `/blog`. So literal "runtime folder scan, zero rebuild" is not achievable without changing hosting (rejected — the other two options offered were client-side GitHub-API fetch and moving off GitHub Pages entirely; neither was chosen).

**What "push and it's there quickly" already means today**: Spec `001` already wires every push to `main` to an automatic GitHub Actions build + deploy (§3.2/§4 of spec `001`, ~2 minute target). That part of the ask — *not having to manually run or trigger anything* — is already satisfied and does not change with this spec. What *does* change below is only the content **format** and how the list/detail pages get a post's data at build time.

**Decision — reversing Q5**: Based on the follow-up, switch the post format from Markdown to **raw static HTML files**, one per post, each starting with a small YAML front-matter header (same `---`-delimited block/parser — `gray-matter` — as before, just applied to `.html` files instead of `.md`):

```html
---
title: My Post Title
date: 2026-07-28
excerpt: One-line summary shown in the list.
---
<article>
  <p>Full post body, written as plain HTML.</p>
</article>
```

- `app/lib/posts.ts` still scans `content/blog/*.html` at build time (this scan step cannot be eliminated on GitHub Pages — see constraint above) via `gray-matter`, but **no longer runs Markdown→HTML transformation** (no `remark`/`remark-html`): the front-matter body is already HTML and is used as-is.
- `app/blog/[slug]/page.tsx` renders that body directly (e.g. via `dangerouslySetInnerHTML` in a Server Component) inside the same `prose`-styled wrapper — safe here because content is self-authored (by Bilal or Claude), never visitor-submitted.
- List/pagination pages (`getPostsPage`, `getTotalPages`, `BlogPostCard`, `Pagination`) are unaffected — they only ever consumed `title`/`date`/`excerpt`/`slug` metadata, which still comes from front-matter.
- The actual publish workflow is unchanged in spirit: write one file (`content/blog/<slug>.html`) with a front-matter header, `git push`, CI auto-builds and deploys in ~2 minutes — same as the Markdown version, just a different file format and no Markdown rendering step.

**Options considered for the front-matter/metadata mechanism**:
- **A. YAML front-matter (`---` block) at the top of the `.html` file, parsed with `gray-matter`** — reuses the exact mechanism already planned for Markdown, so `posts.ts` barely changes (drop the `remark` render call, keep everything else); clean separation between metadata and body.
- **B. Metadata embedded as `<meta>` tags inside the HTML body** (e.g. `<meta name="post-date" content="...">`) — avoids a non-HTML header line but requires an HTML parser (not just a front-matter splitter) to extract metadata, more code for no benefit.
- **C. Filename-derived metadata only** (title from filename, date from git commit/file mtime, no excerpt) — simplest possible, but loses excerpt entirely (breaks Story 1's list requirement) and ties date to filesystem/git metadata rather than authorial intent.

**Recommended decision**: **A** — minimal change from the already-planned Markdown pipeline, keeps metadata human/Claude-writable and explicit, and requires no new parsing dependency.

**Resolution**: Adopted A. This reverses Q5's "Markdown-only" decision. `spec.md` updated: Story 2/3, §3.2, §3.3, §3.5, and §5 now describe raw HTML post files with YAML front-matter instead of Markdown, and explicitly restate that build-time discovery (not literal runtime) is what GitHub Pages requires, satisfied today via the existing auto-deploy-on-push pipeline from spec `001`.

---

## Summary of spec updates

All six questions reached a definitive decision — no deferred/unresolved items remain. `spec.md` has been updated in place:
- §3.5 now names `PAGE_SIZE = 10` and its location.
- §3.2/§3.5 now specify `gray-matter` for front-matter parsing (Markdown rendering removed per Q6) + Tailwind `prose`, and a `Nav.tsx` "Blog" link.
- §5 (Out of Scope) now explicitly lists syntax highlighting as deferred, and clarifies raw HTML bodies replace Markdown rendering (superseding the earlier "no raw HTML" line from Q5).
- §3.3/§3.5 now specify seed content: 2–3 posts, images via `public/blog/` paths.
- Story 3 and §5 now state the content format is Markdown-only... **superseded by Q6**: format is now raw HTML files with YAML front-matter, not Markdown. Build-time discovery (unavoidable on GitHub Pages) is satisfied via the existing auto-deploy-on-push CI from spec `001` — no manual rebuild step for Bilal or Claude.
