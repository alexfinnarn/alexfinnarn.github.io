# Home

- **URL:** `/`

## Purpose

The first page most visitors see. Within a few seconds they should know who Alex is, why they might get in touch, and where to go next. Every other page backs up what this one claims.

## Decisions

- The hero will become interactive: an Ink-style story where the visitor picks from choice cards. Cards work as tap targets on a phone.
- Until the story is designed, the hero is the forest drawing filling the screen, with name, role and location on a scrap of paper (2026-11-14). Two spots in the drawing are links: Writing and Contact. A paper cut-out bird flies in and introduces them in that order. On a phone the drawing pans sideways and opens on the hiker and both links.
- Featured writing shows the three newest articles **(default)**. Nothing is pinned.
- "What I do" is hidden until there is more work to show (2026-11-14). It is commented out, not deleted.
- "What I do" is scraps of paper (round 11 eye test, 2026-11-07). Each scrap is a situation a visitor might be in, in their words, not a skill name. Picking one shows Alex's short reply and one piece of proof, in the scrap's pencil color. No images. Start with 3 scraps and grow to 5 at most, adding one only when there's real proof for it. The situations are in `src/data/situations.ts`, each with its proof's title and link written out; until Alex writes them, each scrap shows a Fill in.

## Open questions

1. Where does the hero story lead? Each run should end somewhere: a case study, an article, Contact. Knowing the possible endings tells us which pages the story has to link to.
2. On featured writing you said "all of them" and "why not rotate the design of sections?" Did you mean the layout of the section changes on each visit, or that each section on Home uses a different layout from the others?
