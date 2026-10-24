# The eye test: choosing a design by "1 or 2?"

A tool for choosing a visual direction the way an optometrist finds a prescription: show two
options, ask which is better, keep the winner, repeat. Nobody is asked to describe what they want
or to rate design decisions like line weight or type size. They only react to what they see.

It lives in the dev-only style guide at `/styleguide` (run `npm run dev`). It is never part of
a production build.

## The idea

The general technique is called **pairwise preference elicitation**: drawing out a preference
someone can't state directly by asking them to compare options two at a time.

The phoropter, the optometrist's lens machine, is the model:

> The phoropter is a machine for walking a person down a parameter space they have no vocabulary
> for. Nobody can specify their prescription, but everybody can answer "one or two?"

That describes this project exactly. Alex couldn't comment on design primitives like heading
weight or rule thickness, but could say which of two pages was better, every time.

## What the optometrist does that we copy

The person in the chair only answers "one or two". All the skill is in what the optometrist
chooses to show next. Here, that role belongs to whoever writes the next round: so far, an AI
assistant reading the results in conversation.

- **Big steps first, then small ones.** An optometrist brackets with large lens changes and
  then refines with smaller ones. Round 1 compared whole directions. Round 2 compared bolder
  versions and blends. Round 3 changed one thing per challenger.
- **One change at a time once you're close.** Then a win says what mattered. Round 3 showed that
  the fix for "jarring" orange was less orange *area*, not a lighter shade, fewer orange places,
  or softer type.
- **Blind labels.** Options show up as "1" and "2", not by name, so names don't sway the choice.
- **Flipping, not side by side.** The same preview switches between the two options in place.
  Differences jump out the way a lens change does, and both are seen at full width.
- **No position bias.** The winner stays on and faces the next challenger ("king of the hill"),
  on a randomly chosen side each time.

In psychophysics, the underlying method is a *two-alternative forced choice*: people are poor at
describing a perception and reliable at comparing two.

## What the optometrist does that we don't (yet)

- **"They look about the same" is a valid answer.** At the eye doctor, it tells the optometrist
  to stop adjusting that lens. The eye test forces a pick, so a near-coin-flip looks the same in
  the results as a strong preference. A "no real difference" answer would tell the next round
  which changes don't matter to this person, so it can stop varying them. This is the most useful
  missing feature.
- **A prescription has a right answer; taste doesn't.** Eyes have a correct setting (the
  sharpest vision) and only a few dials. Design has many dials, no correct answer, and
  preferences that can be inconsistent (A over B, B over C, C over A). Treat a winner as "best
  of what was shown, for this person, today", not as proof.
- **It doesn't learn.** Research versions (*preferential Bayesian optimization*, for example
  Yuki Koyama's *Sequential Line Search* and *Sequential Gallery*) build a model of your
  preferences from each pick and calculate what to show next. The eye test only runs
  comparisons and reports results; the reasoning about the next round happens in conversation.
  That's simpler, needs no model, and lets the next round respond to comments as well as picks
  ("the orange is a bit jarring").

## How it's built

There are three layers. Only the first one changes between options.

1. **Tokens** (`src/styles/tokens/`)
   - `base.css`: the raw palette and scales, such as `--browns-orange` and `--space-5`. These
     never change between options.
   - `themes.css`: **role tokens**, which say what a value is for, such as `--color-accent`,
     `--h1-size`, `--hero-bg` and `--button-bg`. Each option is a block
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

**Surface roles** (`--header-*`, `--hero-*`, `--footer-*`, `--button-*`) let an
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
- **Forced choice.** There's no "about the same" answer yet, so weak and strong preferences look
  identical in the results (see above).
- **Preferences aren't always consistent.** Someone can prefer A to B, B to C, and C to A. The
  tool records picks; it doesn't assume a ranking.
- **One person's taste.** It finds what one viewer prefers. It isn't audience research.

## Standalone version

A framework-agnostic prototype of this tool is in `~/Sites/personal/eye-test`, intended to be
open-sourced. Ideas from this doc that apply there:

- the phoropter framing and the name *pairwise preference elicitation*, for the README;
- the loop of AI proposing, a person picking, and AI narrowing, which is what's new compared with
  research tools that fit a model;
- results meant to be pasted back into that conversation, including comments, not just picks;
- a "no real difference" answer, recorded as a tie, so the next round knows what to stop varying;
- coarse-to-fine guidance for whoever writes the challengers.
