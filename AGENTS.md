# Notes for AI agents

Alex Finnarn's personal site: a static Astro site deployed to GitHub Pages from the `astro`
branch. What each page is for is in [docs/ia/](docs/ia/).

## How Alex wants to work

- **Use lists, not tables, in any Markdown Alex will edit.** That includes docs, plans, and
  anything with blanks for him to fill in. Tables read well rendered but are painful to edit by
  hand. Use nested bullet lists instead: one item per row, and one sub-bullet per column,
  as `Label: value`. Tables are fine in output he only views, such as rendered pages or the
  style guide.
- **Don't write site copy.** Alex writes every word visitors read: page text, bios, case
  studies, articles, descriptions, taglines. Build structure and leave clearly marked slots
  (`*(Fill in)*`, TODO). Dummy text in the style guide must be obviously dummy.
- **Ask before large multi-step changes.** Propose the plan and confirm scope first.
- **For design choices, show options and ask "which is better?"** Don't ask him to rate
  design primitives. See the eye test in [docs/design/eye-test.md](docs/design/eye-test.md).

## Project facts

- Node comes from mise (`~/Sites/personal/.tool-versions` → `node 22`). Astro 7.4 needs
  Node ≥ 22.22. Run commands with `mise exec --` if the shell has an older Node.
- `npm run dev` starts the site. `/styleguide` (tokens, components and the eye test) exists
  only in dev, added by an integration in `astro.config.mjs`.
- **Styling:** components use only role tokens (`src/styles/tokens/themes.css`), never base
  tokens (`base.css`) or hard-coded values. The site's chosen option is `theme` in
  `src/site.ts`, applied as `<html data-theme>`.
- **Contrast:** Browns orange `#FF3C00` is 3.4:1 on the paper background. Use it only for large
  text, bars and fills. Links use `#C72E00`. Don't put orange text on dark backgrounds.
- `archive/` holds the retired old site. It isn't built and is excluded from type checks.
  Don't import from it, except the style guide's portrait sample.

## Docs

- [docs/ia/](docs/ia/): information architecture, with one doc per page. Alex's decisions
  there win on conflicts.
- [docs/design/decisions.md](docs/design/decisions.md): how the visual direction was chosen.
- [docs/design/eye-test.md](docs/design/eye-test.md): the "1 or 2?" comparison tool and how to
  run a new round.
