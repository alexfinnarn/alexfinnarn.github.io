# The eye test: choosing a design by "1 or 2?"

A tool for choosing a visual direction the way an optometrist finds a prescription: show two options, ask which is better, keep the winner, repeat. Nobody is asked to describe what they want or to rate design decisions like line weight or type size. They only react to what they see.

It ran in this site's dev-only style guide until the theme was chosen. It was removed on 2026-10-27 to keep the style guide to the site's actual tokens and components. Rounds 4 to 6 (2026-10-30) used the standalone version below, on dev-only `/lab/` pages that were removed once Erased was adopted. Round 7 (2026-11-01, Home's "What I do") ran the same way. The last version is in git at commit `457c6ce` (`src/styleguide/`, `src/styles/tokens/themes.css`); the standalone version (below) is where it continues.

## The idea

The general technique is called **pairwise preference elicitation**: drawing out a preference someone can't state directly by asking them to compare options two at a time.

The phoropter, the optometrist's lens machine, is the model:

> The phoropter is a machine for walking a person down a parameter space they have no vocabulary
> for. Nobody can specify their prescription, but everybody can answer "one or two?"

That describes this project exactly. Alex couldn't comment on design primitives like heading weight or rule thickness, but could say which of two pages was better, every time.

## What the optometrist does that we copy

The person in the chair only answers "one or two". All the skill is in what the optometrist chooses to show next. Here, that role belongs to whoever writes the next round: so far, an AI assistant reading the results in conversation.

- **Big steps first, then small ones.** An optometrist brackets with large lens changes and then refines with smaller ones. Round 1 compared whole directions. Round 2 compared bolder versions and blends. Round 3 changed one thing per challenger.
- **One change at a time once you're close.** Then a win says what mattered. Round 3 showed that the fix for "jarring" orange was less orange *area*, not a lighter shade, fewer orange places, or softer type.
- **Blind labels.** Options show up as "1" and "2", not by name, so names don't sway the choice.
- **Flipping, not side by side.** The same preview switches between the two options in place. Differences jump out the way a lens change does, and both are seen at full width.
- **No position bias.** The winner stays on and faces the next challenger ("king of the hill"), on a randomly chosen side each time.

In psychophysics, the underlying method is a *two-alternative forced choice*: people are poor at describing a perception and reliable at comparing two.

## What the optometrist does that we don't (yet)

- **"They look about the same" is a valid answer.** At the eye doctor, it tells the optometrist to stop adjusting that lens. The eye test forces a pick, so a near-coin-flip looks the same in the results as a strong preference. A "no real difference" answer would tell the next round which changes don't matter to this person, so it can stop varying them. This is the most useful missing feature.
- **A prescription has a right answer; taste doesn't.** Eyes have a correct setting (the sharpest vision) and only a few dials. Design has many dials, no correct answer, and preferences that can be inconsistent (A over B, B over C, C over A). Treat a winner as "best of what was shown, for this person, today", not as proof.
- **It doesn't learn.** Research versions (*preferential Bayesian optimization*, for example Yuki Koyama's *Sequential Line Search* and *Sequential Gallery*) build a model of your preferences from each pick and calculate what to show next. The eye test only runs comparisons and reports results; the reasoning about the next round happens in conversation. That's simpler, needs no model, and lets the next round respond to comments as well as picks ("the orange is a bit jarring").

## Choosing challengers

- **Broad first, then narrow.** Early rounds compare whole directions. Once one wins, each challenger should change one thing, so a win tells you what mattered.
- **Fold in stated preferences.** If someone says "I prefer B1's footer", apply it to every option rather than testing it again.
- **Aim challengers at the complaint.** In round 3, "the orange is a bit jarring" led to three different ways of reducing it (less area, lighter shade, fewer places) and one alternative explanation (heavier type). Only one of them won.
- **Keep rounds short.** Four comparisons is about the limit before the differences blur.

## Known limits

- **King of the hill depends on order.** An option that loses early never comes back, even if it would beat the eventual winner. That's fine for narrowing, but for a final decision among a few close options, a round robin (every pair once) is fairer.
- **Forced choice.** There's no "about the same" answer yet, so weak and strong preferences look identical in the results (see above).
- **Preferences aren't always consistent.** Someone can prefer A to B, B to C, and C to A. The tool records picks; it doesn't assume a ranking.
- **One person's taste.** It finds what one viewer prefers. It isn't audience research.

## When there's nothing to compare yet (round 13, 2026-11-14)

Round 13 (the forest scene on Home) wasn't a "1 or 2?" round, and it still used the lab. What it showed about the method:

- **An open "what would it look like if…" starts as one prototype, not a pair.** There was no current version of the idea to be king of the hill. One lab page, changed after each comment, got there in six passes. "1 or 2?" is for narrowing; it needs at least one option worth keeping first.
- **Comments did the steering, and they were about problems, not preferences.** "Flickering", "don't crop me out", "the outline is white and I don't like that", "too hard to see". Each one named a thing that was wrong, which is easier to act on than a pick.
- **A panel of open controls is the opposite of the blind rules, and that was fine for color.** Alex set the bird's five colors with color pickers on the real page, with the values printed so he could paste them back into the conversation. Two pastes settled it. Blind sliders would have taken far longer for five linked colors. It is not a comparison, so treat the result as "what he set today", and look at it again later.
- **A setting made in one state can fail in another.** His first paste used an "overlay" blend. It looked right while he was adjusting it and was too hard to see once the bird sat in front of a dark tree trunk. Anything that moves, or sits over a busy drawing, has to be checked in every place it ends up before the values are kept.
- **Offering a control invites using it.** The blend control was added as an extra, and it produced the one setting that had to be undone. Give controls only for what is actually in question.
- **Look at a phone width before settling the layout.** The first layout that looked right on a desktop had both links off screen on a phone. Checking a narrow width after each layout change would have caught it a step earlier.
- **Motion needs its own way of being checked.** A screenshot shows one moment. To check a sequence, pause it and step it to set times (start, each stop, the end), and look at each. A browser tab in the background may not run animations at all, so "nothing moved" can be the tab, not the page.

## A blind round that led to a prototype (round 14, 2026-11-19)

Round 14 picked a mouse cursor for the site and then turned into a new feature: a painter's palette in Home's forest that lets a visitor draw on the drawing. What it showed about the method:

- **Some things can only be judged by using them.** A cursor doesn't show in a screenshot, so the lab showed the real page in a frame and swapped only the cursor inside it. Alex compared the pencils by moving the mouse, not by looking at pictures. Three options took two comparisons; the graphite pencil won.
- **A pick can start the next idea.** Right after choosing the graphite pencil, Alex asked for a palette whose paints recolor it, which turned the round into a prototype (the round 13 way of working). Leave room after a pick for "what if…", not just "done".
- **"Nothing happens" is a result too, and often a silent one.** The first drawing prototype only drew on the hatching, and at Alex's window width the paper covered all of it, so nothing drew and nothing reported an error. The check that passed had run at a much wider window. Test at the width the person will actually use, and make a prototype say where it works.
- **After the second "move it a bit", hand over the knobs.** Placing the palette by guessing took three passes of "smaller", "lower", "slightly…". Then Alex asked for sliders. Four sliders (across, down, tilt, size) with a printed line to paste back settled it in one paste. Placement is a value he should set himself, like the bird's colors in round 13.
- **Measure placement in the picture's own coordinates.** The sliders moved the palette in the drawing's pixels, not the screen's, so where Alex put it holds at every window size.

## Standalone version

A framework-agnostic prototype of this tool is in `~/Sites/personal/eye-test`, intended to be open-sourced. Ideas from this doc that apply there:

- the phoropter framing and the name *pairwise preference elicitation*, for the README;
- the loop of AI proposing, a person picking, and AI narrowing, which is what's new compared with research tools that fit a model;
- results meant to be pasted back into that conversation, including comments, not just picks;
- a "no real difference" answer, recorded as a tie, so the next round knows what to stop varying;
- coarse-to-fine guidance for whoever writes the challengers;
- the notes from round 13 above: a prototype-first stage before any comparison, open controls for linked values like colors, and checking picks in every state (copied into that repo's `docs/knobs.md`, 2026-11-14);
- the notes from round 14 above: judging by use, a pick that starts a new idea, silent "nothing happens" results, and handing over placement sliders early (copied into that repo's `docs/knobs.md`, 2026-11-19).
