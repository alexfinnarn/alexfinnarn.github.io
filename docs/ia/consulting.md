# Consulting

- **URL:** `/consulting`
- **Status:** draft

## Purpose

Tells anyone thinking of hiring Alex what he can do for them and how to start.

## Decisions

- Every hirer is a client, whether a company or a staffing agency. The site markets Alex directly; it
  isn't written for agencies to market him.
- The page is an à la carte menu of skills, each linking to work that shows it. It will grow over time.
- Build the structure with placeholder work examples now (an Ignition Maker Edition project, for
  example) and fill the gaps before publishing.
- Availability changes over time. Right now: open, outside the day job.
- No "not a fit for" list. Alex is a generalist and would rather people get in touch.

## Open questions

1. Process: is there a "how working with me goes" section (steps from first conversation to handover),
   or does the skills menu carry the page on its own?

## Primary visitor and their question

1. "What can Alex do for me?"
2. "What are his skills?" 
3. "How is he different from the others?"

## Primary action

An a la carte menu of my various skills that can link to work examples. 

This will evolve over time as it is filled in.

## Sections

1. **Page header**
   - What it holds: Heading and short intro
   - Component: PageHeader
   - Notes:
2. **Skills menu**
   - What it holds: Each skill with a short description and links to case studies that show it
   - Component: SkillMenu
   - Notes:
3. **Process** *(see open question 1)*
   - What it holds: Steps
   - Component: ProcessSteps
   - Notes:
4. **Availability**
   - What it holds: One line, dated
   - Component: Callout
   - Notes:
5. **Action**
   - What it holds: Lead to Contact
   - Component: Button
   - Notes:

## Metadata

- **Title:** `Consulting | Alex Finnarn — Senior Software Consultant, Troy, Ohio`
- **Description:** *(Fill in)*
