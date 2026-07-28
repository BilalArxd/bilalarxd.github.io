# Quickstart: Static Portfolio — Hello World Foundation & CI/CD

## Preconditions

- Node.js LTS installed locally (matching the version pinned in `.github/workflows/deploy.yml`)
- npm available (bundled with Node)
- Repo cloned locally, on `main` (or a feature branch merged into `main`)

## Setup

```bash
npm ci
```

## Run / Exercise the feature

**Local dev server**:
```bash
npm run dev
```
Visit `http://localhost:3000` — should display "Bilal Arshad — Senior Backend & Applied AI Engineer".

**Production static build (what CI runs)**:
```bash
npm run lint
npx tsc --noEmit
npm run build
```
Confirms an `out/` directory is generated with a static `index.html` and no build errors.

**Preview the static export locally** (optional, simulates what Pages will serve):
```bash
npx serve out
```

## Validation Scenarios

1. `npm run dev` → page loads at `/` with correct name/title (Story 1, Scenario 1).
2. `npm run build` → `out/index.html` exists, references CSS/JS via relative/root paths that resolve correctly (Story 1, Scenarios 2–3).
3. Push to `main` → GitHub Actions "deploy" workflow run appears in the repo's Actions tab and completes successfully (Story 2, Scenario 1).
4. Visit `https://bilalarxd.github.io` after the workflow completes → Hello World page is live and matches latest `main` (Story 2, Scenario 2).
5. Intentionally introduce a lint or type error on a branch, open the workflow (or run locally) → confirm it fails before any deploy step runs (Story 2, Scenario 3).
6. Repo Settings → Pages → confirm "Source" is set to "GitHub Actions" (Story 2, Scenario 4) — **one-time manual step, cannot be automated from the workflow file**.

## Rollback / Cleanup

- **Bad deploy**: Revert the offending commit on `main` and push — the next Actions run redeploys the reverted (working) state. GitHub Pages via Actions has no separate branch/artifact to manually clean up.
- **Full teardown**: Repo Settings → Pages → set Source to "None" to unpublish the site; delete `.github/workflows/deploy.yml` to stop future deploys.
