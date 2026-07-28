# Integration Contracts: Blog — Paginated List & Post Detail Pages

**None.** No external services, webhooks, queues, or scheduled jobs are introduced by this feature.

The only "integration" is with the existing GitHub Actions → GitHub Pages pipeline established in spec `001-portfolio-hello-world` (`.github/workflows/deploy.yml`), which is unchanged by this feature: it already builds and deploys on every push to `main`, and the blog's new static routes are simply additional output in the same `out/` artifact it already publishes.
