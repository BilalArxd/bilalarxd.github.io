# Research Notes: Static Portfolio — Hello World Foundation & CI/CD

## Decision Log

### Topic: Can a React/Next.js app be hosted on GitHub Pages?
- **Options considered**: (a) Plain static HTML/CSS/JS, (b) Next.js with static export, (c) Client-side-only Vite+React SPA
- **Recommended choice**: Next.js with `output: 'export'`
- **Rationale**: GitHub Pages only serves static files — no Node server at request time. Next.js's static export pre-renders all pages to static HTML/CSS/JS at build time; React hydrates client-side in the browser afterward. This satisfies GitHub Pages' constraints while keeping the Next.js App Router structure for future growth. Already validated against `.apex/stack.json` which declares `nextjs`/`react`.

### Topic: User page vs. project page path handling
- **Options considered**: (a) Treat as project page with `basePath: '/bilalarxd.github.io'`, (b) Treat as user/org page served at domain root with no basePath
- **Recommended choice**: (b) — no basePath
- **Rationale**: A repo named exactly `<username>.github.io` is GitHub's special "user/org page" convention, served directly at `https://<username>.github.io/` (root), not under a subpath. Only *project* pages (any other repo name) get served under `/repo-name/` and need `basePath`/`assetPrefix`.

### Topic: Deploy mechanism — Actions-native vs. `gh-pages` branch
- **Options considered**: (a) `peaceiris/actions-gh-pages` or manual push to a `gh-pages` branch, (b) GitHub's native `actions/upload-pages-artifact` + `actions/deploy-pages`
- **Recommended choice**: (b)
- **Rationale**: Native Actions deployment is GitHub's current recommended approach — no extra branch to manage, deploy history is visible in the Actions/Environments UI, and it uses short-lived OIDC tokens rather than a personal access token or `GITHUB_TOKEN` push permission to a branch.

### Topic: Tailwind CSS compatibility with static export
- **Options considered**: (a) Tailwind CSS, (b) Plain CSS
- **Recommended choice**: (a) Tailwind CSS (user preference, confirmed compatible)
- **Rationale**: Tailwind is a build-time CSS compiler (via PostCSS) — it scans source files and emits a static `.css` file during `next build`. It has no runtime/server dependency, so it works identically under static export as it would in a normal Next.js deployment.

## Unknowns

- Exact Tailwind major version to install (v3 vs v4) — resolve at implementation time by using the current stable release and its corresponding config style (v4 uses CSS-based `@import "tailwindcss"` config; v3 uses `tailwind.config.js` + `@tailwind` directives). Does not change the architecture, only file syntax.
- Exact Node LTS version to pin in CI — resolve at implementation time using the current active LTS at build time.

## References

- Spec: `specs/001-portfolio-hello-world/spec.md`
- Clarifications: `specs/001-portfolio-hello-world/clarifications.md`
- Resume source: `resume/Bilal_Arshad_Resume.pdf` (profile/title used for Hello World copy)
- GitHub Docs: "Configuring a publishing source for your GitHub Pages site" (Actions-based deployment)
- GitHub Docs: "About GitHub Pages" (user/org page vs. project page path behavior)
