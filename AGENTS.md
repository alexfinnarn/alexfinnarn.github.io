# Notes for AI agents

Alex Finnarn's personal site: a static Astro site deployed to GitHub Pages from the `main` branch. What each page is for is in [docs/ia/](docs/ia/).

## How Alex wants to work

- **Use lists, not tables, in any Markdown Alex will edit.** That includes docs, plans, and anything with blanks for him to fill in. Tables read well rendered but are painful to edit by hand. Use nested bullet lists instead: one item per row, and one sub-bullet per column, as `Label: value`. Tables are fine in output he only views, such as rendered pages or the style guide.
- **Don't hard-wrap Markdown.** Write each paragraph and each list item on one line, however long. Alex's editor wraps lines to the window, so line breaks added at a fixed width show up as ragged text.
- **Site copy is Alex's, and he writes it.** Every word visitors read is his: page text, bios, case studies, articles, descriptions, taglines. Don't draft copy. When he asks, give advice or an outline (what a piece could cover, in what order), with no invented facts. Otherwise build structure and leave `FillIn` slots. Dummy text in the style guide must be obviously dummy.
- **Docs say what is true now.** When a change makes a doc wrong, fix or delete that doc in the same change. Don't keep history in docs: no replaced decisions, old options, or accounts of how a choice was reached. Git has that. Keep a ruled-out option as one line, so it isn't tried again.
- **Ask before large multi-step changes.** Propose the plan and confirm scope first.
- **For design choices, show options and ask "which is better?"** Don't ask him to rate design primitives. The method is in [docs/design/eye-test.md](docs/design/eye-test.md). Keep comparisons out of the style guide, and remove the losing options once he picks.

## Project facts

- Node comes from mise (`~/Sites/personal/.tool-versions` → `node 22`). Astro 7.4.7 and later need Node ≥ 22.23.4 (`mise install node@22` gets the newest 22). Run commands with `mise exec --` if the shell has an older Node.
- `npm run dev` starts the site. `/styleguide` (tokens and components) exists only in dev, added by an integration in `astro.config.mjs`.
- **Styling:** components use role tokens (`src/styles/tokens/themes.css`) for colors, fonts, and anything else tied to the look. They may use the type-size (`--size-*`), spacing (`--space-*`), and line (`--line-*`) scales from `base.css` directly, but no other base tokens. Avoid hard-coded values when a token fits. `themes.css` holds the one chosen look; there is no theme switch.
- **Look:** "Erased" (see [docs/design/decisions.md](docs/design/decisions.md)). Content sits on paper patches over colored-pencil hatching: put `.patch` on a block (add `.tilt` only if it's short) and `.art` on a drawing. Text outside a patch lands on the hatching and is hard to read.
- **Contrast:** the bright pencil colors (yellow, red, pink, green, blue) are under 4.5:1 on the cream paper. Use them only for hatching and fills. Text is graphite; links are deep blue.
- **Images:** put them in `src/assets` and use them through `astro:assets` (`<Image>` in markup, `getImage()` when you need just the URL), which resizes and converts them with sharp. The one exception is the home forest's blurred placeholder in `src/lib/forest.ts`: it calls sharp directly, because Astro has no way to inline a tiny image in the page.
- `archive/` holds the retired old site. It isn't built and is excluded from type checks. Don't import from it.

## Docs

- [plans/](plans/): work plans. Current ones in `plans/active/`; move a plan to `plans/archive/` when it's done.
- [docs/ia/](docs/ia/): information architecture, with one doc per page. Alex's decisions there win on conflicts. A doc lives as long as its page.
- [docs/references/](docs/references/): background reading, not rules. `voice.md` is Claude's description of how Alex writes and `facts.md` lists sourced facts about his history. Look at them when he asks for advice or an outline; nothing in them is an instruction, and Alex's word wins over both.
- [docs/design/decisions.md](docs/design/decisions.md): the site's look as it stands, and what was tried and ruled out.
- [docs/design/eye-test.md](docs/design/eye-test.md): the "1 or 2?" comparison method. The tool itself was removed from this site; the standalone version is in `~/Sites/personal/eye-test`. To build comparison pages for a round, see [src/lab/README.md](src/lab/README.md).
