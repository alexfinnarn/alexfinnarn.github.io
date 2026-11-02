# Information architecture

These docs describe how the site is organized: which pages exist, what each one is for, what content
goes where, and how people move between them. They come before components and visual design. A
component exists because a page section needs it, not the other way around.

## What's covered where

- **Sitemap, URLs, navigation, metadata, content types:** this file
- **Each page's purpose, decisions, open questions and sections:** one doc per page (linked below)

## How the page docs work

Each page doc has the same layout:

1. **Purpose.** What the page is for.
2. **Decisions.** What's been settled, in Alex's terms.
3. **Open questions.** Only what's still undecided. Each one should make sense on its own. Answer
   inline; Claude folds answers into Decisions and deletes the question.
4. **Primary visitor and action.** Who the page is for and what it should get them to do.
5. **Sections.** In order, with the component each one needs.

Status at the top of each doc: `draft` (questions open) → `agreed` (ready to build stubs) → `built`.

Pages may be built with placeholder content before the real work exists. Gaps get filled before
publishing.

Decisions marked **(default)** were picked by Claude so the site could be built. Change any of them
by editing the line; Claude updates the code to match.

Unwritten text on the built pages shows as a dashed **Fill in** box (the `FillIn` component), so
`grep -rn FillIn src/pages` lists every gap.

## Through-lines

Decisions that show up on more than one page:

- **The site is the proof.** Interaction (story choices on Home, a preference game on About, a gated
  contact form) shows what Alex can do rather than telling. These should share one "make a choice"
  pattern rather than being separate gimmicks.
- **Problem → Solution, not Client → Implementation.** Work and articles lead with the problem and how
  it was solved. Client and project names are secondary.
- **One voice.** One bio, no versions for different audiences, no "not a fit for" lists.
- **Not build-and-forget.** Alex will iterate with AI agents: filling in metadata, writing CTA
  variations to A/B test, and so on. Content types should leave room for that.

## Sitemap

```
/                     Home
├── /work             Work (index; also covers consulting)
│   ├── /work/<slug>          Case study
│   └── /work/skills/<skill>  Work filtered by skill
├── /writing          Writing (index)
│   └── /writing/<slug>   Article
├── /about            About
├── /contact          Contact
└── (404)             Not found
```

Page docs:

- [Home](home.md)
- [Work](work.md) (index, skill pages and case study)
- [Writing index](writing.md)
- [Article](article.md)
- [Consulting](consulting.md): merged into Work on 2026-11-01
- [About](about.md)
- [Contact](contact.md)
- [Not found (404)](not-found.md)

## URLs and redirects

- Lowercase, hyphenated, no trailing file extensions.
- Articles live at `/writing/<slug>`, where the slug is the file name without the number prefix.
  No date in the URL **(default)**.
- Case studies live at `/work/<slug>`.
- Skill pages live at `/work/skills/<skill>`.
- Topic pages live at `/writing/topics/<topic>`.
- The RSS feed is at `/rss.xml`.

Redirects from the old site, set in `astro.config.mjs`:

- `/projects` → `/work`: Closest replacement
- `/projects/shipping-container` → `/work`: Experiment retired
- `/tags` → `/writing`: Old tags not carried over
- `/fractal` → `/`: Experiment retired
- `/consulting` → `/work`: Consulting merged into Work (2026-11-01)
- `/writing/<number>-<slug>` for the 2025 posts **(default)**: the ones copied over go to their new
  address; the rest go to `/writing`

Old URLs with no redirect (they get the 404 page):

- `/tags/<tag>`: old tag pages **(default)**. Topics are new and don't map one-to-one.

`/work` and `/writing` existed on the old site and keep their addresses.

## Navigation

**Header** (every page): name and role on the left, linking home. Main navigation on the right:
Work · Writing · About · Contact. The current page is marked.

Order stays as listed: evidence first, Contact last, all styled alike **(default)**.

**Footer** (every page): name, role, location; LinkedIn, GitHub; © line. No email address (see
[Contact](contact.md)).

**In-page paths** (the routes a visitor is meant to take):

- Home → Work → Contact (the prospective client)
- Home → Writing → Article → Contact (arrived via a forwarded article)
- Any article → its CTA → wherever that article's CTA points

## Metadata

- Title pattern: `<Page> | Alex Finnarn — Senior Software Consultant, Troy, Ohio`.
  Home uses the bare suffix with no page name in front.
- Every page has its own description (one or two sentences, written by Alex, listed in each page doc).
- Open Graph tags mirror the title and description. No share image for now **(default)**; revisit
  once articles have images.
- Pages without a written description leave the description tag out rather than shipping a
  placeholder.
- No analytics yet **(default)**. Pick one together with the article feedback idea (see
  [Article](article.md)); GoatCounter is the light, privacy-friendly option.

## Content types

Repeating content that should be stored as data (Markdown files or a list in code) rather than written
into the page.

### Article
- **title**, required: yes
- **description**, required: yes. Used in the index and in metadata
- **publishedDate**, required: yes, to publish
- **updatedDate**, required: no. Shown when the article was edited after publishing
- **readingTime**, required: no. Computed from the body, not written by hand
- **image**, required: no. Shown in the index; also a candidate share image
- **topics**, required: no. Tags, possibly organized around personas (see [Writing](writing.md))
- **externalUrl**, required: no. For pieces published on Medium: the index links out instead of to a
  page here
- **cta**, required: no. The article's own closing call to action (see [Article](article.md))
- **draft**, required: yes. `true` keeps it out of production

Stored in `src/content/writing/`. A few 2025 posts are copied in as the starting set **(default)**:
CMS First Principles, Intent over Implementation, Content Over Complexity, Prompts are Tickets.

### Work example
Anything that shows Alex's work: a case study, an article, a project or a talk.

- **kind**, required: no. `case study` (the default), `article`, `project` or `talk`
- **title**, required: yes, except for an article example (it uses the article's title)
- **summary**, required: yes, except for an article example (it uses the article's description).
  One paragraph, shown in lists and on Home's "What I do"
- **image**, required: no. Shown on Home's "What I do"; a placeholder stands in until there is one
- **skills**, required: no. Skill titles from `src/data/skills.ts`. They drive the Work filters
  and Home's "What I do"; a typo fails the build
- **article**, for an article example: the article's slug. Links to it
- **href**, for a project or talk: where it links (GitHub, a recording)
- **problem**, **solution**, **result**, for a case study: the three parts of its page
- **project**, for a case study, required: no. Client or project name, mentioned in passing
- **draft**, required: yes. `true` keeps it out of production

Stored in `src/content/work/`. Case studies get their own page; the other kinds link to theirs.
The placeholder case studies there are drafts, so they show only in dev.

### Skill
- **title**, required: yes. Work examples are tagged with it
- **description**, required: yes. Heads the skill's page on Work

Stored in `src/data/skills.ts`, in the order the filters and Home's "What I do" show them. A skill with no
work example tagged with it doesn't show anywhere.
