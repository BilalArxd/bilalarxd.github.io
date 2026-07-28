# API Contract: Blog — Paginated List & Post Detail Pages

**None.** This feature has no API routes, REST/RPC endpoints, or server actions — the site is fully statically exported (`output: 'export'`) and all blog routes (`/blog`, `/blog/page/[page]`, `/blog/[slug]`) are pre-rendered at build time via `generateStaticParams`. There is no server to expose a contract for.

The only "interaction contract" is the internal front-matter shape each `content/blog/*.html` file must satisfy for `app/lib/posts.ts` to parse it correctly — that is documented in `specs/002-blog/data-model.md`, not here, since it is a build-time file format, not a runtime API.
