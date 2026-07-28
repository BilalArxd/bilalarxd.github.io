# Feature Specification: Static Portfolio — Hello World Foundation & CI/CD

**Spec ID**: 001-portfolio-hello-world
**Created**: 2026-07-28
**Status**: Clarified
**Stack**: TypeScript / JavaScript, React, Next.js, Tailwind CSS, npm, GitHub Actions

---

## 1. Problem Statement

Bilal Arshad (Senior Backend & Applied AI Engineer, 13+ years, .NET/Azure/AWS + agentic AI/RAG/LLM evaluation) needs a personal portfolio site deployed at `bilalarxd.github.io` to showcase his professional profile, experience, and selected engineering work. Rather than building the full portfolio in one shot, the first increment establishes the deployable skeleton: a minimal "Hello World" landing page, statically exported, wired to a GitHub Actions CI/CD pipeline that auto-deploys to GitHub Pages on push to `main`. This de-risks the deployment pipeline (Next.js static export config, GitHub Pages base path, Actions permissions) before content-heavy sections are layered on in follow-up specs.

## 2. User Scenarios & Acceptance Criteria

### Story 1 — Minimal landing page renders (Priority: P1)

As Bilal, I want a single static page that renders my name and title, so I can confirm the site scaffold and hosting are correctly wired before adding real content.

**Why P1**: Nothing else can be validated (deploy pipeline, DNS, Pages settings) without a working page to deploy.

**Acceptance Scenarios**:
1. **Given** the repo is freshly cloned, **When** a developer runs the local dev server, **Then** the page loads at `/` and displays "Bilal Arshad — Senior Backend & Applied AI Engineer".
2. **Given** the project is built for production, **When** `next build` runs with static export enabled, **Then** an `out/` directory is generated containing a fully static `index.html` with no server-side runtime requirement.
3. **Given** the static export, **When** opened directly as a file or served from a subpath (`/bilalarxd.github.io/`), **Then** all assets (CSS/JS) resolve correctly (no broken paths from an incorrect `basePath`/`assetPrefix`).

### Story 2 — Automated CI/CD deploy to GitHub Pages (Priority: P1)

As Bilal, I want every push to `main` to automatically build and deploy the site to GitHub Pages, so I can verify changes live without manual deployment steps.

**Why P1**: Explicit requirement — "configure CD/CI... and push and I'll test if all working fine" is the deliverable being validated in this increment.

**Acceptance Scenarios**:
1. **Given** a push to `main`, **When** the GitHub Actions workflow runs, **Then** it installs dependencies via `npm ci`, runs `next lint` and `tsc --noEmit`, builds the static export, and publishes the `out/` directory as a GitHub Pages deployment.
2. **Given** the workflow completes successfully, **When** Bilal visits `https://bilalarxd.github.io`, **Then** the Hello World page is live and matches the latest commit on `main`.
3. **Given** a lint, typecheck, or build failure, **When** the workflow runs, **Then** the deploy step does not execute and the workflow run is marked failed, so a broken or non-compliant build is never published.
4. **Given** repository Pages settings, **When** the workflow is first configured, **Then** the Pages source is set to "GitHub Actions" (not a branch-based `gh-pages` deploy), avoiding a second build artifact/branch to maintain.

### Story 3 — Foundation ready for incremental content (Priority: P2)

As Bilal, I want the initial scaffold structured so future sections (experience, projects, skills) can be added without restructuring the build/deploy setup.

**Why P2**: Explicitly deferred — "then we'll add more things into it" — but the folder/component structure should not need rework to accommodate it.

**Acceptance Scenarios**:
1. **Given** the initial page is a single component, **When** new sections are added later, **Then** they can be added as additional components/routes without changing `next.config`, the Actions workflow, or the export mechanism.

---

## 3. Technical Design

### 3.1 Tech Stack Context

From `.apex/stack.json`:
- **Language**: TypeScript
- **Framework**: Next.js (App Router) with React, statically exported (`output: 'export'`)
- **Database**: None — fully static site, no backend/API routes
- **Styling**: Tailwind CSS (compiled to static CSS at build time — compatible with static export, no runtime dependency)
- **Package manager**: npm
- **Infrastructure**: GitHub Actions → GitHub Pages
- **Version constraints**: Use current stable Next.js/React versions compatible with static export (no server components requiring a Node runtime, no `next/image` optimization API, no API routes/middleware).

### 3.2 Architecture Fit

Greenfield repo (`bilalarxd.github.io`) — this spec establishes the architecture:
- Next.js App Router project at repo root, static-exported to `out/`.
- Single GitHub Actions workflow (`.github/workflows/deploy.yml`) triggered on push to `main`, using `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages`.
- `next.config` sets `output: 'export'`; since this is a user/org page repo (`<user>.github.io`), the site is served from the domain root, so no `basePath`/`assetPrefix` is required (unlike project pages under `/repo-name/`).

### 3.3 Data Model Changes

None — no data layer in this increment.

### 3.4 API Design

None — no API routes; fully static.

### 3.5 Component / Module Design

- `app/layout.tsx` — root HTML shell, metadata (title/description), global styles import.
- `app/page.tsx` — Hello World landing: name, title, one-line tagline sourced from resume profile ("Senior Backend & Applied AI Engineer | Technical Lead").
- `app/globals.css` — Tailwind CSS entry (`@import "tailwindcss"` or v3-style directives depending on installed version), minimal baseline only — no custom design system yet.
- `tailwind.config.ts` / PostCSS config — standard Tailwind setup scoped to `app/**/*.{ts,tsx}`.
- `next.config.ts` — `output: 'export'`, `images: { unoptimized: true }` (required for static export since default image optimization needs a server).
- `.github/workflows/deploy.yml` — CI/CD: checkout → setup Node (npm cache) → `npm ci` → `next lint` → `tsc --noEmit` → `next build` (static export) → upload artifact → deploy to Pages.

## 4. Non-Functional Requirements

| Requirement | Target | Measurement |
|------------|--------|-------------|
| Build reproducibility | `next build` succeeds with zero errors on a clean checkout | CI workflow run status |
| Deploy latency | Live within ~2 minutes of push to `main` | GitHub Actions run duration |
| Static compatibility | 100% of pages exportable (no dynamic server features) | `next build` export succeeds without warnings |
| Accessibility baseline | Landing page passes basic semantic HTML check (single `h1`, lang attribute set) | Manual review |

## 5. Out of Scope

- Full content sections (Experience, Selected Engineering Work, Skills, Projects, Education) from the resume — deferred to a follow-up spec.
- Custom domain configuration (CNAME) beyond default `*.github.io`.
- Analytics, SEO metadata beyond basic title/description, dark mode, animations.
- Contact form or any backend/API functionality.
- Automated testing (unit/e2e) — deferred; this increment is deploy-pipeline-focused.

## 6. Dependencies & Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| GitHub Pages source not set to "GitHub Actions" in repo settings | Medium | High (deploy succeeds in Actions but site 404s) | Document manual one-time repo setting change in README/runbook; verify after first deploy |
| Static export incompatibility (e.g., accidental use of server-only Next.js feature) | Low | Medium | Keep initial page minimal; run `next build` locally before pushing |
| Node version mismatch between local and CI | Low | Low | Pin Node version in workflow via `actions/setup-node` with explicit version |
