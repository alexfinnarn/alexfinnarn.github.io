# Not found (404)

- **URL:** any address that doesn't exist (GitHub Pages serves `404.html`)
- **Status:** draft

## Purpose

Catches broken and old links and gets the visitor back on track.

## Decisions

- Offer a way to report the broken link: file an issue or start a discussion on GitHub.
- No explanation that the site was rebuilt or that old posts were retired.
- Buttons to Home and Contact come first; the GitHub link is smaller, after them **(default)**. Most
  non-developers don't have GitHub accounts. The link opens a new issue with the broken address
  filled in.

## Open questions

None right now.

## Sections

1. **Page header**
   - What it holds: Heading and one sentence
   - Component: PageHeader
   - Notes:
2. **Links onward**
   - What it holds: Home and Contact
   - Component: Button
   - Notes:
3. **Report it**
   - What it holds: Link to a new GitHub issue or discussion
   - Component: Link
   - Notes:

## Metadata

- **Title:** `Page not found | Alex Finnarn — Senior Software Consultant, Troy, Ohio`
