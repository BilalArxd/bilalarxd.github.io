# Clarifications: 001-portfolio-hello-world

## Q1 — Styling approach

**Context** (spec §3.5): `app/globals.css` — minimal baseline styling, no design system specified.

**Options**:
- A. Tailwind CSS — utility-first, scales well for content-heavy sections added later
- B. Plain CSS — zero extra dependencies, simplest for this increment

**Question asked**: Can GitHub Pages even host a React/Tailwind app, given it's static file hosting only?

**Answer**: Yes. GitHub Pages serves static files (HTML/CSS/JS) with no server runtime. Next.js `output: 'export'` pre-renders the React app into static HTML at build time, and React hydrates client-side in the browser — no Node server needed at request time. Tailwind is also a build-time compiler: it generates a static `.css` file during `next build`, with no runtime dependency. Both are fully compatible with GitHub Pages static hosting.

**Decision**: **Tailwind CSS**. Confirmed by user, with the above compatibility caveat resolved.

---

## Q2 — Package manager

**Options**:
- A. npm — default with Node, no extra CI setup
- B. pnpm — faster/more disk-efficient, needs extra CI setup step

**Decision**: **npm**. Simplest for a solo portfolio repo; no additional CI configuration needed.

---

## Q3 — CI scope for this increment

**Options**:
- A. Build + deploy only — matches the narrow Hello World scope
- B. Lint + typecheck + build + deploy — catches basic errors before every future push

**Decision**: **Lint + typecheck + build + deploy**. User opted for the stronger CI gate now, since it will apply to every future content push and is cheap to set up while the pipeline is already being built.

---

## Resolution Summary

| Item | Decision |
|---|---|
| Styling | Tailwind CSS (confirmed compatible with GitHub Pages static export) |
| Package manager | npm |
| CI pipeline steps | `npm ci` → `next lint` → `tsc --noEmit` → `next build` (export) → upload artifact → deploy to Pages |

No unresolved/deferred items remain from this round.
