# Work

- **URL:** `/work` (index), `/work/<slug>` (each case study)
- **Hidden** since 2026-11-14, until there is more to show. The pages are in `src/pages/_work/` and are not built; `src/site.ts` says how to bring them back.

## Purpose

The evidence page, and since 2026-11-01 the consulting page too. Each example shows a problem and how Alex solved it, so a visitor can judge whether he can handle theirs, and the skills menu answers "what can he do for me?".

## Decisions

- Consulting merged into Work (2026-11-01). `/consulting` redirects here.
- Work is kept simple (2026-11-15). There will only be a handful of case studies, so each is a plain page in `src/pages/_work/`, and the index lists them by hand. There is no work content collection and no filtering by skill. Add filtering back only if the list grows enough to need it.
- Skills are a plain list on the index, each with a one-line description. They don't link anywhere.
- Articles can be listed as work too. The index names them by slug. Until real case studies exist, the articles stand in.
- Every hirer is a client, whether a company or a staffing agency. The site markets Alex directly; it isn't written for agencies to market him.
- Availability is one dated line.
- No "not a fit for" list. Alex is a generalist and would rather people get in touch.
- No process section for now **(default)**.
- An index page, with each case study on its own page so it can be sent to someone on its own.
- Format is **Problem → Solution → Result**, not Client → Implementation. The writing keys in on the problem and what Alex did and learned. The client or project gets mentioned, but isn't the lead.
- Case studies can be project-based rather than client-based.
- No dates on case studies for now.
- Order doesn't matter yet; random is fine.
- Proposal-style work (a written architecture proposal, for example) counts if it's told as a problem and how it was solved.

## Alex's notes

Written for the old Consulting page. What a visitor is asking:

1. "What can Alex do for me?"
2. "What are his skills?" 
3. "How is he different from the others?"

What the page should offer:

An a la carte menu of my various skills that can link to work examples. 

This will evolve over time as it is filled in.
