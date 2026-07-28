# bilalarxd.github.io — Portfolio

Personal portfolio site for Bilal Arshad, deployed to [bilalarxd.github.io](https://bilalarxd.github.io) via GitHub Pages. Built with Next.js (static export), React, TypeScript, and Tailwind CSS.

## Local Development

```bash
npm ci
npm run dev
```

Visit `http://localhost:3000`.

## Build

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Produces a fully static site in `out/`. Preview it with `npx serve out`.

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which lints, typechecks, builds, and deploys the static export to GitHub Pages via `actions/deploy-pages`.

**One-time manual setup required**: in this repo's Settings → Pages, set **Source** to **"GitHub Actions"**. Without this, the workflow will run successfully but the site will not be publicly reachable.
