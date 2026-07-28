# Execution Design: Static Portfolio — Hello World Foundation & CI/CD

**Spec**: `specs/001-portfolio-hello-world/spec.md`
**Plan**: `specs/001-portfolio-hello-world/plan.md`
**Created**: 2026-07-28
**Status**: Designed

## Build Slices

### Slice 1 — Foundation
Scaffold the Next.js + TypeScript + Tailwind project at the repo root: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `tailwind.config.ts` (or Tailwind v4 CSS-based config), `.gitignore`. No page content yet — goal is a project that installs and produces an empty successful `next build` with static export enabled.

### Slice 2 — Core Logic
There is no "business logic" in this increment (fully static, no data). This slice is the content layer: `app/layout.tsx` (root shell, `<html lang="en">`, metadata) and `app/page.tsx` (Hello World: name, title, tagline) with Tailwind utility classes for minimal layout/typography.

### Slice 3 — Interface / Integration
Author `.github/workflows/deploy.yml`: checkout → `actions/setup-node` (pinned LTS, npm cache) → `npm ci` → `next lint` → `tsc --noEmit` → `next build` → `actions/configure-pages` → `actions/upload-pages-artifact` (path: `out/`) → `actions/deploy-pages`. Set workflow `permissions: { pages: write, id-token: write }` and `concurrency` group to avoid overlapping deploys.

### Slice 4 — Verification and Hardening
Local verification (`npm run build` succeeds, `npx serve out` renders correctly), then push to `main`, confirm the Actions run is green, manually set repo Settings → Pages → Source = "GitHub Actions" (one-time), and confirm `https://bilalarxd.github.io` serves the live page matching the latest commit. Update `README.md` with the one-time setup note and local dev instructions.

## Component Boundaries

- **Build system** (`next.config.ts`, `tsconfig.json`, `tailwind.config.ts`) — owns how source becomes `out/`. No other slice reaches into these files except to add config as new sections are added later.
- **Content components** (`app/layout.tsx`, `app/page.tsx`, `app/globals.css`) — owns what's rendered. Future specs add new components/routes here without touching build config or the workflow.
- **CI/CD workflow** (`.github/workflows/deploy.yml`) — owns how `out/` gets published. Decoupled from content: any future page/component change flows through the same unchanged pipeline (Story 3's acceptance criterion).

These three boundaries are intentionally decoupled so that Story 3 (foundation ready for incremental content) holds: adding a new section is purely a Content-components change.

## State Transitions / Flows

```
Developer edits app/page.tsx or adds a component
        │
        ▼
git push to main
        │
        ▼
GitHub Actions workflow triggers
        │
   ┌────┴────┐
   │ npm ci  │
   └────┬────┘
        ▼
   ┌─────────────┐
   │ next lint   │──fail──▶ workflow fails, no deploy
   └────┬────────┘
        ▼ pass
   ┌─────────────────┐
   │ tsc --noEmit     │──fail──▶ workflow fails, no deploy
   └────┬────────────┘
        ▼ pass
   ┌─────────────┐
   │ next build   │──fail──▶ workflow fails, no deploy
   │ (export)     │
   └────┬────────┘
        ▼ pass (out/ produced)
   ┌───────────────────────┐
   │ upload-pages-artifact  │
   └────┬──────────────────┘
        ▼
   ┌───────────────┐
   │ deploy-pages   │
   └────┬──────────┘
        ▼
   https://bilalarxd.github.io live
```

There is no runtime state machine — this is a build/deploy pipeline flow, not an application with stateful transitions.

## Failure Modes

| Failure | Where it surfaces | Handling |
|---|---|---|
| Lint error | CI, `next lint` step | Workflow fails before build/deploy; developer fixes locally with `npm run lint` |
| Type error | CI, `tsc --noEmit` step | Workflow fails before build/deploy; developer fixes locally with `npx tsc --noEmit` |
| Build/export error (e.g., accidental use of a server-only API) | CI, `next build` step | Workflow fails before deploy; caught earlier if developer runs `npm run build` locally first (per quickstart.md) |
| Pages Source not set to "GitHub Actions" | Post-deploy, site unreachable (404) despite green workflow | Documented one-time manual step (design/plan risk); Slice 4 verification catches this on first deploy |
| Artifact upload/deploy step fails (GitHub-side transient issue) | CI, `upload-pages-artifact`/`deploy-pages` step | Re-run workflow; no code changes needed |
| Broken relative asset paths (would only occur if `basePath` were misconfigured) | Live site, broken CSS/JS | Not applicable per this design (no basePath set, root user page) — flagged as a regression trigger if repo is ever renamed away from `<user>.github.io` |

## Observability Hooks

Minimal for this increment (per NFR table in spec — no dedicated logging/monitoring required):
- GitHub Actions run history/logs serve as the build observability surface (pass/fail, step-by-step logs, duration).
- GitHub Pages deployment history (repo → Environments → github-pages) shows deploy history and links each deploy to its source commit.
- No application-level logging/analytics in this increment (explicitly out of scope per spec §5).

## Rollback Notes

- **Revert-based rollback**: `git revert` the offending commit on `main` and push; the next Actions run redeploys the previous good state. No manual artifact cleanup needed since deploys are Actions-native (no `gh-pages` branch to reset).
- **Emergency unpublish**: Repo Settings → Pages → Source → "None" immediately takes the site offline without touching code.
- **Full removal**: Delete `.github/workflows/deploy.yml` to stop future auto-deploys while keeping the existing live site until manually unpublished.
