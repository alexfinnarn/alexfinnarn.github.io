# Writing (index)

- **URL:** `/writing`

## Purpose

The list of articles, newest first. It shows that Alex thinks and explains clearly, and gives people something to forward.

## Decisions

- Each list item shows title, date, description, and an image when the article has one.
- No pinning.
- Topics are a short list of subjects: AI, CMS and Workflows (2026-11-15). A topic needs at least two articles and names a subject, not a tool or a language. Personas can come later as their own field.
- Each topic gets a page at `/writing/topics/<topic>`.
- An RSS feed, at `/rss.xml`.
- Medium pieces are listed here like any other article, marked "on Medium" and linking straight to medium.com (the `externalUrl` field) **(default)**.
