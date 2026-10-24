# Work

- **URL:** `/work` (index), `/work/<slug>` (each case study)
- **Status:** draft

## Purpose

The evidence page. Each case study shows a problem and how Alex solved it, so a visitor can judge
whether he can handle theirs.

## Decisions

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
2. **Case study list**
   - What it holds: Title and problem line for each, linking to its page
   - Component: CaseStudyListItem ×n
   - Notes:
3. **Closing action**
   - What it holds: Lead to Consulting or Contact
   - Component: Button
   - Notes:

Case study page:

1. **Header**
   - What it holds: Title, project (optional), skills
   - Component: PageHeader
   - Notes:
2. **Problem / Solution / Result**
   - What it holds: The three parts, in that order
   - Component: Prose
   - Notes:
3. **Closing action**
   - What it holds: Lead to Contact or a related skill on Consulting
   - Component: Button
   - Notes:

## Metadata

- **Title:** `Work | Alex Finnarn — Senior Software Consultant, Troy, Ohio`; case studies use
  `<Case study title> | Alex Finnarn — …`
- **Description:** *(Fill in)*
