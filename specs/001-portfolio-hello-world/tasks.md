# Tasks: Static Portfolio — Hello World Foundation & CI/CD

**Spec**: `specs/001-portfolio-hello-world/spec.md`
**Plan**: `specs/001-portfolio-hello-world/plan.md`

---

## Task T1 — Initialize project scaffold

**Phase**: 1
**Priority**: P1
**Depends on**: none
**Traces to**: Plan File Changes (`package.json`, `package-lock.json`, `tsconfig.json`, `.gitignore`); Spec Story 1

### Description
Initialize a Next.js (App Router) + TypeScript project at the repo root using npm. Add `dev`, `build`, `start`, `lint` scripts to `package.json`. Create `tsconfig.json` matching Next.js App Router defaults. Create `.gitignore` excluding `node_modules/`, `.next/`, `out/`. Do not add page content yet — this task only needs `npm install` to succeed and the project to be recognizable as a valid Next.js app.

### Acceptance
- [x] `npm install` completes with no errors
- [x] `package.json` includes `dev`, `build`, `lint` scripts
- [x] `.gitignore` excludes `node_modules/`, `.next/`, `out/`
- [x] `package-lock.json` is committed

### Tests
- [x] N/A (no unit tests for config scaffolding) — verified by successful `npm install`

### guardrailRefs
- `.apex/rules/typescript/coding-style.md`
- `.apex/rules/react/project-structure.md`
- `.apex/rules/common/coding-style.md`

---

## Task T2 — Configure Tailwind CSS

**Phase**: 1
**Priority**: P1
**Depends on**: T1
**Traces to**: Plan File Changes (`postcss.config.mjs`, `tailwind.config.ts`, `app/globals.css`); Clarifications Q1

### Description
Install and configure Tailwind CSS (current stable version) using the syntax appropriate to the installed major version (v4: CSS-based `@import "tailwindcss"` in `app/globals.css`; v3: `tailwind.config.ts` with `content` globs scoped to `app/**/*.{ts,tsx}` plus `@tailwind` directives). Wire PostCSS config. Keep styling minimal — no custom theme/design system in this increment.

### Acceptance
- [x] Tailwind utility classes apply correctly when used in a component
- [x] `app/globals.css` is imported once, from `app/layout.tsx`
- [x] No unused/broken Tailwind config that would fail the build

### Tests
- [x] Manual: apply a utility class (e.g., `text-xl`) in `app/page.tsx` and confirm it renders styled in `npm run dev`

### Deviation
Tailwind v4 uses CSS-based config (`@import "tailwindcss"` in `globals.css` + `@tailwindcss/postcss` in PostCSS config) — no `tailwind.config.ts` file, per Tailwind v4's zero-config content detection. This was flagged as an open unknown in `research.md` and resolved during implementation.

### guardrailRefs
- `.apex/rules/react/styling.md`
- `.apex/rules/react/project-structure.md`

---

## Task T3 — Configure static export

**Phase**: 1
**Priority**: P1
**Depends on**: T1
**Traces to**: Spec Story 1 Scenario 2–3; Plan Architecture Decisions (no basePath, unoptimized images)

### Description
Create `next.config.ts` with `output: 'export'` and `images: { unoptimized: true }`. Do not set `basePath`/`assetPrefix` (this is a root user/org page, served at domain root — see research.md). Confirm no server-only features (API routes, middleware, server actions) are present anywhere in the project, since they are incompatible with static export.

### Acceptance
- [x] `next.config.ts` sets `output: 'export'`
- [x] `next.config.ts` sets `images.unoptimized: true`
- [x] No `basePath`/`assetPrefix` configured
- [x] `npm run build` produces an `out/` directory containing `index.html`

### Tests
- [x] Integration: run `npm run build` and verify `out/index.html` exists and references CSS/JS via root-relative paths that resolve without a basePath prefix

### guardrailRefs
- `.apex/rules/react/project-structure.md`
- `.apex/rules/cloud/cicd/guardrails.md`

---

## Task T4 — Build Hello World layout and page

**Phase**: 2
**Priority**: P1
**Depends on**: T2, T3
**Traces to**: Spec Story 1, Scenario 1

### Description
Create `app/layout.tsx` as the root shell: `<html lang="en">`, `<body>`, page metadata (`title`, `description`) via Next.js `Metadata` export, importing `app/globals.css`. Create `app/page.tsx` rendering a single `<h1>` with "Bilal Arshad" and a subtitle/tagline with "Senior Backend & Applied AI Engineer | Technical Lead" (sourced from `resume/Bilal_Arshad_Resume.pdf` profile line), styled with minimal Tailwind utilities (centered layout, readable typography). Semantic HTML: exactly one `h1` per page.

### Acceptance
- [x] `npm run dev` → `/` displays "Bilal Arshad" and "Senior Backend & Applied AI Engineer" (or equivalent title text)
- [x] Page has `<html lang="en">` and exactly one `<h1>`
- [x] Page has a `<title>` set via metadata (visible in browser tab)

### Tests
- [x] Manual: `npm run dev`, visually confirm content and browser tab title
- [x] Manual: view page source of `npm run build` output (`out/index.html`) and confirm the same content is present (proves static pre-render, not client-only render) — verified via `grep` on `out/index.html`

### guardrailRefs
- `.apex/rules/react/component-architecture.md`
- `.apex/rules/react/accessibility.md`
- `.apex/rules/react/styling.md`

---

## Task T5 — Local static build verification

**Phase**: 2
**Priority**: P1
**Depends on**: T4
**Traces to**: Spec Story 1, Scenarios 2–3; Quickstart "Run / Exercise the feature"

### Description
Run the full local verification sequence before authoring CI: `npm run lint`, `npx tsc --noEmit`, `npm run build`. Optionally preview with `npx serve out` to confirm the static export renders identically to `npm run dev`, with all asset paths resolving (no 404s in browser devtools network tab).

### Acceptance
- [x] `npm run lint` passes with zero errors
- [x] `npx tsc --noEmit` passes with zero errors
- [x] `npm run build` succeeds and produces `out/`
- [x] `npx serve out` (or equivalent) renders the page with no broken asset requests

### Tests
- [x] Manual: full sequence above run locally, confirmed clean — index and CSS both returned HTTP 200 against `npx serve out`

### Deviation
`typescript@7.0.2` (latest at implementation time) is not yet supported by `typescript-eslint` (requires `<6.1.0`). Pinned `typescript` to `6.0.3`. Also pinned `eslint` to `9.39.5` (latest 9.x) instead of `10.8.0` — `eslint-config-next@16.2.12`'s transitive plugins (`eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react`) peer-lock to ESLint `<=9` and threw a runtime `scopeManager.addGlobals is not a function` error under ESLint 10. Tracked as a known ecosystem-lag issue, not a defect in this codebase.

### guardrailRefs
- `.apex/rules/common/testing.md`
- `.apex/rules/common/implementation-standards.md`

---

## Task T6 — Author CI/CD workflow

**Phase**: 3
**Priority**: P1
**Depends on**: T5
**Traces to**: Spec Story 2, Scenarios 1, 3, 4; Plan File Changes (`.github/workflows/deploy.yml`); Contracts (`integration-contracts.md`)

### Description
Create `.github/workflows/deploy.yml`: triggers on `push` to `main` and `workflow_dispatch`. Set `permissions: { contents: read, pages: write, id-token: write }` and a `concurrency` group (`pages`, `cancel-in-progress: false`) to prevent overlapping deploys. Job steps: `actions/checkout`, `actions/setup-node` (pinned LTS version, `cache: npm`), `npm ci`, `npm run lint`, `npx tsc --noEmit`, `npm run build`, `actions/configure-pages`, `actions/upload-pages-artifact` (`path: ./out`), `actions/deploy-pages`. Ensure lint/typecheck/build failures halt the job before the deploy steps run (default `job` step failure behavior — no `continue-on-error`).

### Acceptance
- [x] Workflow triggers on push to `main`
- [x] Workflow has `pages: write` and `id-token: write` permissions
- [x] Steps run in order: checkout → setup-node → npm ci → lint → typecheck → build → configure-pages → upload-pages-artifact → deploy-pages
- [x] A failing lint/typecheck/build step prevents the deploy steps from executing

### Tests
- [ ] Integration: push a branch with an intentional lint error, open a PR or manually trigger the workflow, confirm it fails before the upload/deploy steps (deferred to T8 — requires a real push to GitHub)
- [ ] Integration: push clean code to `main`, confirm the workflow runs to completion successfully (deferred to T8)

### Deviation
Split into two jobs (`build` and `deploy` with `needs: build`) rather than one linear job — this matches GitHub's official Pages-via-Actions template and structurally guarantees the deploy job can never run if the build job (lint/typecheck/build) fails, satisfying the CI/CD guardrail "Pipeline failures block merge" more robustly than step-ordering within a single job.

Used `npm install` instead of `npm ci` for the install step. `npm ci` reproducibly failed on the `ubuntu-latest` runner with `EUSAGE`/lockfile-out-of-sync errors on `@tailwindcss/oxide-wasm32-wasi`'s bundled/optional dependencies (`@emnapi/core`, `picomatch`), even with byte-identical `package-lock.json` and matched Node/npm versions (v22.23.1 / npm 10.9.8) verified locally — a platform-specific (macOS vs Linux) npm validation bug for `wasm32-wasi` optional packages with `bundleDependencies`, not a genuine lockfile drift. `npm install` still resolves against the committed lockfile (no version changes for already-locked deps) and remains gated by the subsequent lint/typecheck/build steps.

### guardrailRefs
- `.apex/rules/cloud/cicd/guardrails.md`
- `.apex/rules/common/git-workflow.md`
- `.apex/rules/common/release-readiness.md`

---

## Task T7 — Update README with setup and deployment instructions

**Phase**: 3
**Priority**: P2
**Depends on**: T6
**Traces to**: Spec Risk (Pages source manual step); Quickstart

### Description
Update `README.md` with: local dev instructions (`npm ci`, `npm run dev`), build instructions (`npm run build`), and the one-time manual repo setup step (Settings → Pages → Source → "GitHub Actions") required before the first deploy will be publicly reachable.

### Acceptance
- [x] README documents local dev/build commands
- [x] README explicitly documents the one-time GitHub Pages "Source = GitHub Actions" setting

### Tests
- [x] N/A — documentation task, verified by review

### guardrailRefs
- `.apex/rules/common/coding-style.md`

---

## Task T8 — Push to main and verify live deployment

**Phase**: 4
**Priority**: P1
**Depends on**: T6, T7
**Traces to**: Spec Story 2, Scenarios 1–4 (full end-to-end acceptance)

### Description
Push all changes to `main`. Confirm the GitHub Actions workflow run succeeds (all steps green). Set repository Settings → Pages → Source to "GitHub Actions" if not already set. Visit `https://bilalarxd.github.io` and confirm the Hello World page is live and matches the latest commit on `main`.

### Acceptance
- [ ] Actions workflow run on `main` completes successfully
- [ ] Repo Settings → Pages → Source = "GitHub Actions"
- [ ] `https://bilalarxd.github.io` is reachable and displays the Hello World content
- [ ] Live page content matches the latest `main` commit

### Tests
- [ ] Integration (manual, remote): full push → Actions → live site verification per quickstart.md "Validation Scenarios" 3–6

### guardrailRefs
- `.apex/rules/cloud/cicd/guardrails.md`
- `.apex/rules/common/release-readiness.md`
