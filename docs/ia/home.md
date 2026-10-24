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

## Open questions

1. Where does the hero story lead? Each run should end somewhere: a case study, an article, Contact.
   Knowing the possible endings tells us which pages the story has to link to.
2. On featured writing you said "all of them" and "why not rotate the design of sections?" Did you
   mean the layout of the section changes on each visit, or that each section on Home uses a different
   layout from the others?
3. Is there a "What I do" section below the hero, or does the story cover that? If it stays, it
   should probably be the same skills menu as [Consulting](consulting.md), in short form.

## Primary visitor and their question

*(Fill in)*

## Primary action

*(Fill in. What one thing should a visitor do after this page?)*

## Sections

1. **Hero**
   - What it holds: Name, location, and the story with choice cards
   - Component: Hero, ChoiceCard
   - Notes:
2. **What I do** *(see open question 3)*
   - What it holds: Short skills list linking to Consulting
   - Component: SkillMenu
   - Notes:
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
