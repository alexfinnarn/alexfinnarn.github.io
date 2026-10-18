# The eye test: choosing a design by "1 or 2?"

A tool for choosing a visual direction the way an optometrist finds a prescription: show two
options, ask which is better, keep the winner, repeat. Nobody is asked to describe what they want
or to rate design decisions like line weight or type size. They only react to what they see.

It lives in the dev-only style guide at `/styleguide` (run `npm run dev`). It is never part of
a production build.

## Why it works

People are poor at saying what they want from a design and good at comparing two things in front
of them. In psychophysics this is called a *two-alternative forced choice*. The tool adds two
habits from eye exams:

- **Blind labels.** Options show up as "1" and "2", not by name, so names don't sway the choice.
- **Flipping, not side by side.** The same preview switches between the two options in place.
  Differences jump out the way a lens change does, and both are seen at full width.

The winner stays on and faces the next challenger ("king of the hill"). Which side the champion
appears on is random each time, so position doesn't bias the picks.

## How it's built

There are three layers. Only the first one changes between options.

1. **Tokens** (`src/styles/tokens/`)
   - `base.css`: the raw palette and scales, such as `--browns-orange` and `--space-5`. These
     never change between options.
   - `themes.css`: **role tokens**, which say what a value is for, such as `--color-accent`,
     `--h1-size`, `--proof-bg` and `--button-bg`. Each option is a block
     `[data-theme="<id>"] { ... }` that assigns those roles.
2. **Components** (`src/components/`) use only role tokens, never base tokens or hard-coded
   values. That's why one component can look completely different under each option.
3. **The style guide** (`src/styleguide/Styleguide.astro`) renders a sample page inside a wrapper
   whose `data-theme` the eye test changes. A dev-only Astro integration in `astro.config.mjs`
   adds the route.

Three CSS details make this work:

- **Every `[data-theme]` element gets the full default token set** (`:root, [data-theme] { ... }`
  at the top of `themes.css`). Tokens built from other tokens, like
  `--rule-strong: ... var(--color-text)`, are resolved where they're declared. Re-declaring them
  on each themed wrapper means an option can be scoped to one preview box, not just the whole page.
- **Options override only what they change.** Later blocks win at equal specificity, so a theme
  block lists only its differences from the default.
- **Variant families inherit with `|=`.** `[data-theme|="r3"]` matches `r3` and every `r3-*`
  theme, so `r3-less` gets everything from `r3` and overrides a few lines. That makes
  "one change at a time" rounds cheap to write.

**Surface roles** (`--header-*`, `--hero-*`, `--proof-*`, `--footer-*`, `--button-*`) let an
option turn whole areas into bands of color without the components knowing about it.

## Running a new round

1. **Write the challengers** in `src/styles/tokens/themes.css`. For narrowing rounds, make each one
   change exactly one thing from the champion, and name them as variants of it (`r3-less-*` →
   inherits via `|=` if the champion's selector uses `|=`).
2. **Name them** in the `options` list at the top of `src/styleguide/Styleguide.astro`
   (id, short name, one-sentence summary). Names are only revealed at the end of the test.
3. **Append a round** to `src/styleguide/rounds.ts` with a `start` champion and a list of
   `challengers`. The page always runs the last round.
4. **Run it**: open `/styleguide#eye-test`, flip with the `1`/`2` buttons or keys, pick, repeat.
   At the end, "Copy results" puts the winner and picks on the clipboard.
5. **Record it**: add the `result` to the round in `rounds.ts`, write a short entry in
   [decisions.md](decisions.md) (including any comments in the person's own words), and update
   `theme` in `src/site.ts` if the site should switch.

Contrast check before adding a color: any text/background pair must reach 4.5:1 (WCAG AA), or 3:1
for large text, bars and fills. [decisions.md](decisions.md) lists the orange rules learned so far.

## Choosing challengers

- **Broad first, then narrow.** Early rounds compare whole directions. Once one wins, each
  challenger should change one thing, so a win tells you what mattered.
- **Fold in stated preferences.** If someone says "I prefer B1's footer", apply it to every
  option rather than testing it again.
- **Aim challengers at the complaint.** In round 3, "the orange is a bit jarring" led to three
  different ways of reducing it (less area, lighter shade, fewer places) and one alternative
  explanation (heavier type). Only one of them won.
- **Keep rounds short.** Four comparisons is about the limit before the differences blur.

## Known limits

- **King of the hill depends on order.** An option that loses early never comes back, even if it
  would beat the eventual winner. That's fine for narrowing, but for a final decision among a few
  close options, a round robin (every pair once) is fairer.
- **Preferences aren't always consistent.** Someone can prefer A to B, B to C, and C to A. The
  tool records picks; it doesn't assume a ranking.
- **One person's taste.** It finds what one viewer prefers. It isn't audience research.

## Ideas for a standalone version

The pattern isn't specific to this site. A standalone tool could:

- take any set of variants: themes on a wrapper, iframes of URLs, or component props;
- offer different formats: king of the hill, round robin, or Swiss-style pairings for larger sets;
- produce results as text meant to be pasted back into a conversation with an AI assistant, which
  then proposes the next round of variants. That loop (AI proposes, person picks, AI narrows) is
  what made it work here.
