# Information architecture

These docs describe how the site is organized: which pages exist, what each one is for, what content
goes where, and how people move between them. They sit between the goals in
[site-vision.md](../site-vision.md) and the actual pages and components.

## What an IA doc usually covers

Agencies vary, but most IA work comes down to these pieces:

- **Sitemap**: What pages exist, and how are they grouped?
  - Here: [Sitemap](#sitemap) below
- **URL scheme**: What is each page's address? What happens to old addresses?
  - Here: [URLs and redirects](#urls-and-redirects) below
- **Navigation**: How do people get from page to page?
  - Here: [Navigation](#navigation) below
- **Page inventory**: For each page: purpose, audience, the main thing a visitor should do
  - Here: One doc per page (linked below)
- **Content model**: What kinds of content repeat (articles, case studies), and what fields do they have?
  - Here: [Content types](#content-types) below
- **Page structure**: What sections does each page have, in what order?
  - Here: The "Sections" list in each page doc
- **Labels and metadata**: What are things called? What title and description does each page get?
  - Here: [Metadata](#metadata) below, plus each page doc

The page docs come first; components and visual design come out of them. A component exists because a
page section needs it, not the other way around.

## How to use the page docs

Each page doc has the same layout:

1. **Purpose.** Taken from site-vision.md. This is the fixed part.
2. **Questions.** Things Claude couldn't decide from the vision doc. Answer inline, or cross them out.
3. **Sections to fill in.** Who the page is for, what it should get them to do, and its sections in
   order. Where the vision doc already lists sections, they're included as a starting point you can keep,
   change, or cut.

Status at the top of each doc: `draft` (questions open) → `agreed` (ready to build stubs) → `built`.

## Sitemap

```
/                     Home
├── /work             Work (case studies)
├── /writing          Writing (article index)
│   └── /writing/<slug>   Article
├── /consulting       Consulting
├── /about            About
├── /contact          Contact
└── (404)             Not found
```

Page docs:

- [Home](home.md)
- [Work](work.md)
- [Writing index](writing.md)
- [Article](article.md)
- [Consulting](consulting.md)
- [About](about.md)
- [Contact](contact.md)
- [Not found (404)](not-found.md)

Not on the site, by decision in site-vision.md §5: the Ink visual-novel experiment, fractal and art
experiments, a projects page, a blogroll, jokes in footers or 404 pages, follower counts.

## URLs and redirects

- Lowercase, hyphenated, no trailing file extensions.
- Articles live at `/writing/<slug>`, where the slug is the file name without the number prefix.
  *(Open question: should the slug include a date? Dates in URLs age an article visibly.)*

Redirects from the old site, set in `astro.config.mjs`:

- `/projects` → `/work`: Closest replacement
- `/projects/shipping-container` → `/work`: Experiment retired
- `/tags` → `/writing`: Tags not carried over
- `/fractal` → `/`: Experiment retired

Old URLs with no redirect (they will 404):

- `/tags/<tag>`: tag pages are gone. *(Open question: send these to `/writing` too?)*
- `/writing/<slug>` for the 2025 posts, which are not migrated. *(Open question: let these 404, or
  redirect each to `/writing`? A redirect is friendlier if anyone linked to them; a 404 is more honest
  about the clean break.)*

`/work` and `/writing` existed on the old site and keep their addresses.

## Navigation

**Header** (every page): name and role on the left, linking home. Main navigation on the right:
Work · Writing · Consulting · About · Contact. The current page is marked.

*(Open question: is that the right order? Common patterns put Contact last and the "proof" pages first.
An alternative is a Contact button styled differently from the other links.)*

**Footer** (every page): name, role, location; email, LinkedIn, GitHub; © line.

**In-page paths** (the routes a visitor is meant to take):

- Home → Work → Contact (the prospective client)
- Home → Writing → Article → Contact (arrived via a forwarded article)
- Any article → article footer → Contact

## Metadata

- Title pattern: `<Page> | Alex Finnarn — Senior Software Consultant, Troy, Ohio`.
  Home uses the bare suffix with no page name in front.
- Every page has its own description (one or two sentences, written by you, listed in each page doc).
- Open Graph tags mirror the title and description. *(Open question: a share image? It shows when a link
  is pasted into LinkedIn or Slack. Could be a plain type-only card generated per page.)*

## Content types

Repeating content that should be stored as data (Markdown files or a list in code) rather than written
into the page.

### Article
- **title**, required: yes
- **description**, required: yes. Used in the index and in metadata
- **publishedDate**, required: yes, to publish
- **updatedDate**, required: no. Shown when present
- **featured**, required: no. 1, 2, or 3: the homepage slot it fills
- **draft**, required: yes. `true` keeps it out of production

### Case study
- **client / project name**, required: yes
- **situation**, required: yes
- **what I did**, required: yes
- **result**, required: yes. Needs at least one number (the plant-manager test)
- **translation**, required: yes. One line in a manufacturer's terms
- **years / dates**, required: ?. *(Open question)*

### Proof figure
- **figure**, required: yes. The number, e.g. "13+"
- **label**, required: yes. What the number counts

### Now entry
- **as-of date**, required: yes. Shown with the block
- **items**, required: yes. 3–5 short lines
