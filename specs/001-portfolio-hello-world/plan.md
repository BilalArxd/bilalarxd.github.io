# Implementation Plan: Static Portfolio — Hello World Foundation & CI/CD

**Spec**: `specs/001-portfolio-hello-world/spec.md`
**Created**: 2026-07-28
**Status**: Planned

## Technical Context

- **Runtime**: Node.js (LTS, pinned in CI via `actions/setup-node`)
- **Framework**: Next.js (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Package manager**: npm (`package-lock.json` committed)
- **Output**: Static export (`output: 'export'`) → `out/` directory, no server runtime
- **Deployment target**: GitHub Pages, served from repo root at `https://bilalarxd.github.io` (user/org page repo — no `basePath` needed)
- **CI/CD**: GitHub Actions workflow on push to `main`: `npm ci` → `next lint` → `tsc --noEmit` → `next build` → `actions/upload-pages-artifact` → `actions/deploy-pages`

## Architecture Decisions

| Decision | Rationale |
|---|---|
| Next.js App Router + static export over plain Vite/React or a static site generator (Astro/Hugo) | Matches `.apex/stack.json` (react, nextjs already declared); keeps the door open for future use of React Server Components patterns even though this increment is fully static; large ecosystem for later content sections. |
| Tailwind CSS over plain CSS or CSS Modules | User preference, confirmed compatible with static export (compiles to static CSS at build time, no runtime cost). |
| GitHub Actions "deploy via Actions" (`actions/deploy-pages`) over legacy `gh-pages` branch push | Avoids a second build-artifact branch to maintain; is GitHub's current recommended pattern; keeps `main` as the single source of truth. |
| npm over pnpm/yarn | User preference; zero extra CI setup, default with Node. |
| Lint + typecheck gates in CI before deploy | User preference; cheap to add now, prevents broken/non-compliant builds from ever reaching production once more content is added. |
| No `basePath`/`assetPrefix` in `next.config.ts` | Repo is `<user>.github.io`, a root user page — GitHub serves it at the domain root, not under a `/repo-name/` path (unlike project pages). |
| `images: { unoptimized: true }` in `next.config.ts` | Next.js's built-in image optimization API requires a server; static export has no server, so this must be disabled to avoid build/runtime errors when `next/image` is used later. |

## Delivery Strategy

Single phase, sequential (no parallelizable work — this is a scaffold):

1. **Scaffold** — Initialize Next.js + TypeScript + Tailwind project structure at repo root.
2. **Content** — Build the Hello World `app/page.tsx` and `app/layout.tsx` with Bilal's name/title from the resume profile.
3. **Static export config** — Configure `next.config.ts` for `output: 'export'`.
4. **CI/CD** — Author `.github/workflows/deploy.yml` implementing the lint → typecheck → build → deploy pipeline.
5. **Local verification** — Run `npm run build` locally to confirm a clean static export before pushing.
6. **Push & remote verification** — Push to `main`; confirm the Actions run succeeds and the Pages source setting is "GitHub Actions" (one-time manual repo setting — cannot be automated from the workflow file itself).

No parallel workstreams: each step depends on the prior one (can't write the workflow before the build command it invokes exists; can't verify remotely before pushing).

## File Changes

| File | Action | Purpose |
|------|--------|---------|
| `package.json` | Create | Project manifest: Next.js, React, TypeScript, Tailwind deps + `dev`/`build`/`lint` scripts |
| `package-lock.json` | Create | npm lockfile, committed for reproducible CI installs |
| `tsconfig.json` | Create | TypeScript config for Next.js App Router |
| `next.config.ts` | Create | `output: 'export'`, `images.unoptimized: true` |
| `postcss.config.mjs` | Create | Tailwind's PostCSS plugin wiring |
| `tailwind.config.ts` | Create | Content globs scoped to `app/**/*.{ts,tsx}` |
| `app/layout.tsx` | Create | Root HTML shell, `<html lang="en">`, metadata (title/description) |
| `app/page.tsx` | Create | Hello World landing: name, title, tagline |
| `app/globals.css` | Create | Tailwind directives/import + minimal base styles |
| `.github/workflows/deploy.yml` | Create | CI/CD pipeline: checkout → setup-node → npm ci → lint → typecheck → build → upload-pages-artifact → deploy-pages |
| `.gitignore` | Create | Exclude `node_modules/`, `out/`, `.next/` |
| `README.md` | Update | Add one-time GitHub Pages setup instruction (Settings → Pages → Source = GitHub Actions) and local dev instructions |

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| GitHub Pages source not set to "GitHub Actions" in repo settings | Medium | High (deploy succeeds in Actions but site 404s) | Documented as a required manual one-time step in README and in Step 6 of delivery; verified immediately after first successful workflow run |
| Static export incompatibility (e.g., accidental use of a server-only Next.js feature) | Low | Medium | Keep initial page minimal (no server components/actions, no API routes); run `next build` locally before every push |
| Node version mismatch between local and CI | Low | Low | Pin an explicit Node LTS version in `actions/setup-node`; document the same version in README |
| Lint/typecheck gate blocks an otherwise-working deploy due to overly strict defaults | Low | Low | Use Next.js's default ESLint config (`next lint` with `next/core-web-vitals`) rather than a custom strict ruleset for this increment |
