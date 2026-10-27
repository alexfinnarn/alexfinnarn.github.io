# Writing (index)

- **URL:** `/writing`
- **Status:** draft

## Purpose

The list of articles, newest first. It shows that Alex thinks and explains clearly, and gives people
something to forward.

## Decisions

- Before anything new is published, show placeholder article stubs, or copy over a few pieces Alex
  likes from the current site.
- Each list item shows title, date, description, and an image when the article has one.
- No pinning.
- Topics (tags) from the start. Alex likes the idea of building around user personas and user
  stories, so topics may be organized that way.
- An RSS feed, at `/rss.xml`.
- Medium pieces are listed here like any other article, marked "on Medium" and linking straight to
  medium.com (the `externalUrl` field) **(default)**.
- Topics are subjects ("CMS", "AI") for now **(default)**. Personas can come later as their own field.
- Each topic gets a page at `/writing/topics/<topic>`.

## Open questions

None right now.

## Primary visitor and their question

*(Fill in)*

## Primary action

*(Fill in)*

## Sections

1. **Page header**
   - What it holds: Heading and short intro
   - Component: PageHeader
   - Notes:
2. **Topic filter**
   - What it holds: Topics, linking to filtered views
   - Component: TopicList
   - Notes:
3. **Article list**
   - What it holds: Newest first
   - Component: ArticleListItem ×n
   - Notes:

## Metadata

- **Title:** `Writing | Alex Finnarn — Senior Software Consultant, Troy, Ohio`
- **Description:** *(Fill in)*
