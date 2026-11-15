# Information architecture

These docs describe how the site is organized: which pages exist, what each one is for, what content goes where, and how people move between them. They come before components and visual design. A component exists because a page section needs it, not the other way around.

## What's covered where

- **Sitemap, URLs, navigation, metadata, content types:** this file
- **Each page's purpose and decisions:** one doc per page (linked below)

## How the page docs work

A page doc holds only what the page's code can't tell you:

1. **Purpose.** What the page is for.
2. **Decisions.** What's been settled, in Alex's terms, including things ruled out.
3. **Open questions.** Only if something is still undecided. Each one should make sense on its own. Answer inline; Claude folds answers into Decisions and deletes the question.
4. **Alex's notes.** Only where he wrote some: his own words on who the page is for and what it should do. They are source material for the page's copy.

What a page contains, section by section, is not written here. Read the page in `src/pages/`.

A doc lives as long as its page. When a decision is replaced, the old line is deleted, not marked as replaced. When a page is deleted, its doc is deleted with it. A hidden page (kept in `src/pages/` under a name starting with an underscore) keeps its doc, with a line saying it is hidden.

Decisions marked **(default)** were picked by Claude so the site could be built. Change any of them by editing the line; Claude updates the code to match.

Unwritten text on the built pages shows as a dashed **Fill in** box (the `FillIn` component), so `grep -rn FillIn src/pages` lists every gap.

## Through-lines

Decisions that show up on more than one page:

- **The site is the proof.** Interaction (story choices on Home, a preference game on About, a gated contact form) shows what Alex can do rather than telling. These should share one "make a choice" pattern rather than being separate gimmicks.
- **Problem → Solution, not Client → Implementation.** Work and articles lead with the problem and how it was solved. Client and project names are secondary.
- **One voice.** One bio, no versions for different audiences, no "not a fit for" lists.
- **Not build-and-forget.** Alex will iterate with AI agents: filling in metadata, writing CTA variations to A/B test, and so on. Content types should leave room for that.

## Sitemap

```
/                     Home
├── /work             Work (index; also covers consulting)
│   └── /work/<slug>      Case study
├── /writing          Writing (index)
│   └── /writing/<slug>   Article
├── /about            About
├── /contact          Contact
└── (404)             Not found
```

Page docs:

- [Home](home.md)
- [Work](work.md) (index and case study; hidden)
- [Writing index](writing.md)
- [Article](article.md)
- [About](about.md) (hidden)
- [Contact](contact.md)
- [Not found (404)](not-found.md)

## URLs and redirects

- Lowercase, hyphenated, no trailing file extensions.
- Articles live at `/writing/<slug>`, where the slug is the file name without the number prefix. No date in the URL **(default)**.
- Case studies live at `/work/<slug>`.
- Topic pages live at `/writing/topics/<topic>`.
- The RSS feed is at `/rss.xml`.

Redirects from the old site, set in `astro.config.mjs`:

While Work is not built (2026-11-14), the three redirects below that point at `/work` go to `/` instead.

- `/projects` → `/work`: Closest replacement
- `/projects/shipping-container` → `/work`: Experiment retired
- `/tags` → `/writing`: Old tags not carried over
- `/fractal` → `/`: Experiment retired
- `/consulting` → `/work`: Consulting merged into Work (2026-11-01)
- `/writing/<number>-<slug>` for the 2025 posts **(default)**: the ones copied over go to their new address; the rest go to `/writing`

Old URLs with no redirect (they get the 404 page):

- `/tags/<tag>`: old tag pages **(default)**. Topics are new and don't map one-to-one.

`/work` and `/writing` existed on the old site and keep their addresses.

## Navigation

**Header** (every page): name and role on the left, linking home. Main navigation on the right: Work · Writing · About · Contact. The current page is marked.

For now the menu shows only Writing · Contact: Work and About are off the site until there is more to show (2026-11-14). Their pages are kept in `src/pages/_about.astro` and `src/pages/_work/` but are not built, so they are not in the sitemap and their addresses return the Not found page. Old addresses that redirected to Work go to Home for now. `src/site.ts` says how to bring them back.

Order stays as listed: evidence first, Contact last, all styled alike **(default)**.

**Footer** (every page): name, role, location; LinkedIn, GitHub; © line. No email address (see [Contact](contact.md)).

**In-page paths** (the routes a visitor is meant to take):

- Home → Work → Contact (the prospective client)
- Home → Writing → Article → Contact (arrived via a forwarded article)
- Any article → its CTA → wherever that article's CTA points

## Metadata

- Title pattern: `<Page> | Alex Finnarn — Senior Software Consultant, Troy, Ohio`. Home uses the bare suffix with no page name in front.
- Every page has its own description (one or two sentences, written by Alex).
- Open Graph tags mirror the title and description. No share image for now **(default)**; revisit once articles have images.
- Pages without a written description leave the description tag out rather than shipping a placeholder.
- No analytics yet **(default)**. Pick one together with the article feedback idea (see [Article](article.md)); GoatCounter is the light, privacy-friendly option.

## Content types

Repeating content that should be stored as data (Markdown files or a list in code) rather than written into the page.

### Article
- **title**, required: yes
- **description**, required: yes. Used in the index and in metadata
- **publishedDate**, required: yes, to publish
- **updatedDate**, required: no. Shown when the article was edited after publishing
- **readingTime**, required: no. Computed from the body, not written by hand
- **image**, required: no. Shown in the index; also a candidate share image
- **topics**, required: no. Tags, possibly organized around personas (see [Writing](writing.md))
- **externalUrl**, required: no. For pieces published on Medium: the index links out instead of to a page here
- **cta**, required: no. The article's own closing call to action (see [Article](article.md))
- **draft**, required: yes. `true` keeps it out of production

Stored in `src/content/writing/`. The nine finished 2025 posts that fit the site are copied in (2026-11-15). File names carry a three-digit number in publish order (`001-` is the oldest); the number only orders the files and is dropped from the URL.

### Case study
A page of its own, not a content file: one `.astro` file per case study in `src/pages/_work/`, copied from `_template.astro` there. The file name is the URL slug.

- **title**, required: yes
- **project**, required: no. Client or project name, mentioned in passing
- **problem**, **solution**, **result**, required: yes. The three parts of its page
- Anything more goes below those as plain HTML

The Work index lists case studies by hand (title, summary, link), along with the articles that count as work, by slug.

### Skill
- **title**, required: yes
- **description**, required: yes. One line, shown under the title on Work

Stored in `src/data/skills.ts`, in the order Work lists them.
