# Home

- **URL:** `/`
- **Status:** draft

## Purpose

The first page most visitors see. Within a few seconds they should know who Alex is, why they might
get in touch, and where to go next. Every other page backs up what this one claims.

## Decisions

- The hero is interactive: an Ink-style story where the visitor picks from choice cards. Cards work
  as tap targets on a phone.
- Featured writing shows whatever is published; nothing is pinned (see [Writing](writing.md)).
- *(Replaced by the forest scene below.)* Until the story is designed, the hero is static: name,
  role, location, a Fill in slot, and buttons to Work and Contact **(default)**.
- Until the story is designed, the hero is the forest drawing filling the screen, with name, role
  and location on a scrap of paper (2026-11-14). Two spots in the drawing are links: Writing and
  Contact. A paper cut-out bird flies in and introduces them in that order. On a phone the
  drawing pans sideways and opens on the hiker and both links.
- "What I do" is hidden until there is more work to show (2026-11-14). It is commented out, not
  deleted. Work and About are also out of the main menu for now; their pages still exist.
- Featured writing shows the three newest articles **(default)**.
- *(Replaced by the scraps below.)* "What I do" is an accordion across the full content width (round 7 eye test, 2026-11-01). One
  row per skill; the open row shows a work example tagged with that skill: image, kind, title,
  summary, and links to it and to the skill's page on Work. The first row starts open, and only
  one is open at a time. A skill shows only once something is tagged with it. Each row has a
  pencil color, scribbled under its title; the open row's title is underlined in that color
  and the row is colored in with it (rounds 8 and 9, 2026-11-01). Each color also drifts in
  over the paper's edges from the hatching, strongest for the open row, so the section blends
  into the page (round 10, 2026-11-01).
- "What I do" becomes scraps of paper instead of the accordion (round 11, 2026-11-07). Each
  scrap is a situation a visitor might be in, in their words, not a skill name. Picking one
  shows Alex's short reply and one piece of proof, in the scrap's pencil color. No images.
  Start with 3 scraps and grow to 5 at most, adding one only when there's real proof for it.
  The situations are in `src/data/situations.ts`; until Alex writes them, each scrap shows a
  Fill in.

## Open questions

1. Where does the hero story lead? Each run should end somewhere: a case study, an article, Contact.
   Knowing the possible endings tells us which pages the story has to link to.
2. On featured writing you said "all of them" and "why not rotate the design of sections?" Did you
   mean the layout of the section changes on each visit, or that each section on Home uses a different
   layout from the others?

## Primary visitor and their question

*(Fill in)*

## Primary action

*(Fill in. What one thing should a visitor do after this page?)*

## Sections

1. **Hero**
   - What it holds: Name, location, and the story with choice cards
   - Component: ForestScene for now; later Hero, ChoiceCard
   - Notes: The forest scene links to Writing and Contact.
2. **What I do**
   - What it holds: 3 to 5 situations, each opening to a short reply and one work example, and
     a link to Work
   - Component: SituationScraps
   - Notes: Hidden for now (2026-11-14).
3. **Featured writing**
   - What it holds: Recent articles
   - Component: ArticleListItem ×n
   - Notes:
- **Footer** (every page)
  - What it holds: Site-wide
  - Component: Footer
  - Notes:

## Metadata

- **Title:** `Alex Finnarn — Senior Software Consultant, Troy, Ohio`
- **Description:** *(Fill in)*
