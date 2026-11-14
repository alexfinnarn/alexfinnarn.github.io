# Notes for AI agents

Alex Finnarn's personal site: a static Astro site deployed to GitHub Pages from the `astro`
branch. What each page is for is in [docs/ia/](docs/ia/).

## How Alex wants to work

- **Use lists, not tables, in any Markdown Alex will edit.** That includes docs, plans, and
  anything with blanks for him to fill in. Tables read well rendered but are painful to edit by
  hand. Use nested bullet lists instead: one item per row, and one sub-bullet per column,
  as `Label: value`. Tables are fine in output he only views, such as rendered pages or the
  style guide.
- **Site copy is Alex's.** Every word visitors read is his: page text, bios, case studies,
  articles, descriptions, taglines. Claude may draft copy only as part of
  [plans/active/copy-plan.md](plans/active/copy-plan.md): in his voice ([docs/voice.md](docs/voice.md)), marked
  as a draft until he edits it, with no invented facts. Otherwise build structure and leave
  `FillIn` slots. Dummy text in the style guide must be obviously dummy.
- **Ask before large multi-step changes.** Propose the plan and confirm scope first.
- **For design choices, show options and ask "which is better?"** Don't ask him to rate
  design primitives. The method is in [docs/design/eye-test.md](docs/design/eye-test.md).
  Keep comparisons out of the style guide, and remove the losing options once he picks.

## Project facts

- Node comes from mise (`~/Sites/personal/.tool-versions` → `node 22`). Astro 7.4.7 and later
  need Node ≥ 22.23.4 (`mise install node@22` gets the newest 22). Run commands with `mise exec --` if the shell has an older Node.
- `npm run dev` starts the site. `/styleguide` (tokens and components) exists only in dev,
  added by an integration in `astro.config.mjs`.
- **Styling:** components use only role tokens (`src/styles/tokens/themes.css`), never base
  tokens (`base.css`) or hard-coded values. `themes.css` holds the one chosen look; there is
  no theme switch.
- **Look:** "Erased" (see [docs/design/decisions.md](docs/design/decisions.md)). Content sits on
  paper patches over colored-pencil hatching: put `.patch` on a block (add `.tilt` only if it's
  short) and `.art` on a drawing. Text outside a patch lands on the hatching and is hard to read.
- **Contrast:** the bright pencil colors (yellow, red, pink, green, blue) are under 4.5:1 on the
  cream paper. Use them only for hatching and fills. Text is graphite; links are deep blue.
- `archive/` holds the retired old site. It isn't built and is excluded from type checks.
  Don't import from it.

## Docs

- [plans/](plans/): work plans. Current ones in `plans/active/`; move a plan to
  `plans/archive/` when it's done.
- [docs/ia/](docs/ia/): information architecture, with one doc per page. Alex's decisions
  there win on conflicts.
- [docs/design/decisions.md](docs/design/decisions.md): how the visual direction was chosen.
- [docs/design/eye-test.md](docs/design/eye-test.md): the "1 or 2?" comparison method. The tool
  itself was removed from this site; the standalone version is in `~/Sites/personal/eye-test`.
  To build comparison pages for a round, see [src/lab/README.md](src/lab/README.md).
