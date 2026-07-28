# Quickstart: Blog — Paginated List & Post Detail Pages

## Preconditions

- Node version matching CI (see project memory: use Node 22 via nvm locally to match CI — `nvm use 22`).
- Repo dependencies installed (`npm install`); `gray-matter` added as part of this feature.

## Setup

```bash
nvm use 22
npm install
```

No environment variables, database, or external service credentials are needed — this feature has no backend.

## Run / Exercise the feature

```bash
npm run dev
```

- Visit `http://localhost:3000/blog` — should show the newest posts (up to `PAGE_SIZE`), newest first.
- If more than `PAGE_SIZE` seed posts exist, visit `http://localhost:3000/blog/page/2` to confirm the next page and pagination controls.
- Click a post card — should land on `http://localhost:3000/blog/<slug>` and render the full post body plus a link back to the list.
- Confirm "Blog" appears in the site nav and links to `/blog`.

## Validation Scenarios

Maps to `spec.md` acceptance criteria:

1. **List pagination boundaries** (Story 1): with N seed posts and `PAGE_SIZE = 10`, confirm `/blog` shows page 1, `/blog/page/2` exists only if N > 10, and a request to a page number beyond the last valid page 404s after `next build` (no such static route generated).
2. **Post detail rendering** (Story 2): confirm a seed post's title, date, and full HTML body render correctly, including the seed post with an image (`public/blog/<slug>/...`).
3. **Unknown slug 404s** (Story 2.3): after `next build`, confirm no route exists for a slug with no matching file.
4. **New post via file drop** (Story 3): add a new `content/blog/<slug>.html` file with valid front-matter, rerun `npm run build`, confirm the post appears in the list (correctly ordered by date) and its detail page renders — no other code changes.
5. **Build fails loud on bad content** (Story 3.2): temporarily remove a required front-matter field (e.g. `title`) from a seed post, run `npm run build`, confirm the build fails with an error identifying that file; then restore the field.
6. **Static export completeness**: run `npm run build` and confirm `out/blog/`, `out/blog/page/2/` (if applicable), and `out/blog/<slug>/` directories exist with static `index.html` files — no server runtime warnings from `next build`.

## Rollback / Cleanup

- This feature adds new files only (plus one line in `Nav.tsx` and one new dependency in `package.json`) — no destructive changes to existing routes or components.
- To roll back: revert the PR. No database state, no migrations, no external service configuration to undo.
