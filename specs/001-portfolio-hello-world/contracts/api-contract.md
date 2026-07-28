# API Contract: Static Portfolio — Hello World Foundation & CI/CD

None.

This increment ships a fully static site with no API routes, no Next.js Route Handlers, no server actions, and no backend of any kind. `output: 'export'` in `next.config.ts` makes this a hard architectural constraint — API routes are not exportable and would break the build.

If a future increment needs dynamic behavior (e.g., a contact form), it will require either:
- A client-side call to a third-party service (e.g., Formspree, a serverless function on Vercel/Cloudflare Workers) since GitHub Pages itself cannot execute server code, or
- Migrating hosting off GitHub Pages entirely.

That decision is explicitly out of scope for this spec (see spec.md §5 Out of Scope) and would be captured in its own future spec.
