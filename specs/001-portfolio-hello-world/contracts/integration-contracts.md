# Integration Contracts: Static Portfolio — Hello World Foundation & CI/CD

## External Services

None. No third-party APIs, databases, or SaaS integrations in this increment.

## Events / Jobs / Queues / Webhooks

None — no event-driven or async processing.

## CI/CD Integration (the one real "integration" in this increment)

**GitHub Actions ↔ GitHub Pages**

- **Trigger**: `push` to `main` (and manual `workflow_dispatch` for convenience)
- **Permissions required**: `pages: write`, `id-token: write` (for OIDC-based deployment via `actions/deploy-pages`)
- **Environment**: `github-pages` (GitHub's built-in deployment environment, auto-created on first Pages deploy via Actions)
- **Artifact contract**: The build step must produce a directory (`out/`) matching what `actions/upload-pages-artifact` expects (a `path` input pointing at the static export output); `actions/deploy-pages` consumes that uploaded artifact and publishes it — no other consumer of the artifact.
- **One-time manual prerequisite**: Repository Settings → Pages → Source must be set to "GitHub Actions" before the first workflow run will successfully publish (the workflow can complete without this, but the site will not be reachable until the setting is changed).

No other integrations exist in this increment.
