# Data Model: Blog — Paginated List & Post Detail Pages

## Entities

### Post (file-based, not a database record)

One `.html` file in `content/blog/` = one Post. No ORM, no schema migrations — the "model" is a TypeScript type describing the parsed shape of each file.

```ts
type Post = {
  slug: string;
  title: string;
  date: string;   // ISO 8601, e.g. "2026-07-28"
  excerpt: string;
  body: string;   // raw HTML, everything after the front-matter block
};
```

## Fields and Constraints

| Field | Source | Required | Constraint |
|-------|--------|----------|------------|
| `slug` | Front-matter `slug:`, or derived from filename (`my-post.html` → `my-post`) if omitted | Yes (one or the other) | Must be unique across all posts; used directly in the `/blog/[slug]` route |
| `title` | Front-matter `title:` | Yes | Non-empty string |
| `date` | Front-matter `date:` | Yes | Valid ISO date string; used for sort order (descending) |
| `excerpt` | Front-matter `excerpt:` | Yes | Non-empty string; shown in list view, not truncated/generated from body |
| `body` | Everything after the `---` front-matter closing delimiter | Yes (may be minimal, but file must have content) | Raw HTML; not validated/sanitized (self-authored content only, per `research.md`) |

## Relationships

None — posts are independent, flat entities. No categories, tags, authors, or cross-post references in this increment (all explicitly out of scope, spec §5).

## Migrations

Not applicable — no database. Content evolves by adding, editing, or removing files in `content/blog/`; each change takes effect on the next CI build (push to `main`).

## Validation Rules

Enforced at build time in `app/lib/posts.ts`, applied to every file `getAllPosts()` reads:

1. **Required fields present**: `title`, `date`, `excerpt` must all be present and non-empty in front-matter. A `slug` is required either explicitly or derivable from the filename.
2. **Fail loud, not silent**: if any required field is missing, the build throws an error naming the offending file path — never renders a partially-populated post (spec Story 3.2).
3. **Unique slugs**: if two files resolve to the same `slug`, the build throws an error naming both files (prevents a silent route collision in `generateStaticParams`).
4. **Valid date**: `date` must parse to a valid `Date`; unparsable dates fail the build with the offending file path (needed for correct sort order — Story 1.1).
