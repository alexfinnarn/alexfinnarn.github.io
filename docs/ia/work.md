# Work

- **URL:** `/work` (index), `/work/<slug>` (each case study)
- **Status:** draft

## Purpose

The evidence page, and since 2026-11-01 the consulting page too. Each example shows a problem and
how Alex solved it, so a visitor can judge whether he can handle theirs, and the skills menu
answers "what can he do for me?".

## Decisions

- Consulting merged into Work (2026-11-01). `/consulting` redirects here.
- Work is kept simple (2026-11-15). There will only be a handful of case studies, so each is a
  plain page in `src/pages/work/`, and the index lists them by hand. There is no work content
  collection and no filtering by skill. Add filtering back only if the list grows enough to
  need it.
- Skills are a plain list on the index, each with a one-line description. They don't link
  anywhere.
- Articles can be listed as work too. The index names them by slug. Until real case studies
  exist, the articles stand in.
- From the old Consulting page: every hirer is a client, whether a company or a staffing agency;
  availability is one dated line; no "not a fit for" list; no process section for now.
- An index page, with each case study on its own page so it can be sent to someone on its own.
- Format is **Problem → Solution → Result**, not Client → Implementation. The writing keys in on the
  problem and what Alex did and learned. The client or project gets mentioned, but isn't the lead.
- Case studies can be project-based rather than client-based. Placeholders are fine until the real
  ones are written.
- No dates on case studies for now.
- Order doesn't matter yet; random is fine.
- Proposal-style work (a written architecture proposal, for example) counts if it's told as a
  problem and how it was solved.

## Open questions

None right now.

## Primary visitor and their question

*(Fill in)*

## Primary action

*(Fill in)*

## Sections

Index page:

1. **Page header**
   - What it holds: Heading and a one- or two-sentence intro
   - Component: PageHeader
   - Notes:
2. **Skills menu**
   - What it holds: Each skill's name and one-line description, as plain text
   - Component: none (a list on the page)
   - Notes: From `src/data/skills.ts`.
3. **Work list**
   - What it holds: Kind, title and summary for each example, linking to it
   - Component: ArticleListItem ×n
   - Notes:
4. **Availability**
   - What it holds: One line, dated
   - Component: Callout
   - Notes:
5. **Closing action**
   - What it holds: Lead to Contact
   - Component: Button
   - Notes:

Case study page:

1. **Header**
   - What it holds: Title, project (optional)
   - Component: PageHeader
   - Notes:
2. **Problem / Solution / Result**
   - What it holds: The three parts, in that order
   - Component: Prose
   - Notes:
3. **Closing action**
   - What it holds: Lead to Contact or back to all work
   - Component: Button
   - Notes:

## Metadata

- **Title:** `Work | Alex Finnarn — Senior Software Consultant, Troy, Ohio`; case studies use
  `<Case study title> | Alex Finnarn — …`
- **Description:** *(Fill in)*
