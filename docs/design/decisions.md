# Design decisions

How the visual direction was chosen, round by round. The tool used from round 2 on is
described in [eye-test.md](eye-test.md). The options compared here were removed once one was
chosen; see "Current choice" below.

## Round 1: three directions (2026-10-17)

Options: A · Engineering firm, B · Editorial, C · Spec sheet.

**Picked B.** Liked the warm, off-white paper. Concern: it looks "Claude-like".
Wanted bolder, more assertive versions of B. Accent changed to Browns orange `#FF3C00`.

## Round 2: bolder B (2026-10-18)

Options: B1 · Broadsheet, B2 · Workshop, B3 · Modern editorial, then blends of B1 and B3
(R1, R2, R3), compared one pair at a time in the eye test.

Feedback before the eye test:
- B2 (dark brown bands) out.
- Prefers B1's light footer: no orange links on a dark background. Applied to B3 and all blends.

Eye-test result:
1. B1 · Broadsheet over B3 · Modern editorial
2. B1 · Broadsheet over R1 · Broadsheet type, modern blocks
3. R2 · Modern type, broadsheet frame over B1 · Broadsheet
4. R3 · All sans, orange forward over R2 · Modern type, broadsheet frame

**Winner: R3.** Heavy sans headlines and sans body, orange top bar, solid orange proof
strip, orange buttons, light footer. Comment: the orange is "a bit jarring sometimes", but
the softer (sans) type softens the bold color.

## Round 3: one change at a time from R3 (2026-10-18)

Each challenger changes one thing:
- R3-less: proof strip back on paper, figures in orange (less orange area)
- R3-light: lighter orange `#FF6B33` for fills and bar
- R3-one: orange only on the proof block (no top bar, black buttons)
- R3-soft: bold instead of extra-bold headlines

Eye-test result:
1. R3-less over R3
2. R3-less over R3-light
3. R3-less over R3-one
4. R3-less over R3-soft

**Winner: R3-less**, unbeaten. The fix for "jarring" orange was less orange *area*, not a
lighter orange, fewer orange places, or softer type.

## R3-less (2026-10-18 to 2026-10-30)

R3-less was adopted to live with while the pages were built, and replaced by Erased in round 6.
In plain terms: warm off-white paper and ink-black text; heavy, tightly spaced sans headlines
over a sans body; Browns orange `#FF3C00` as a bar across the top and on the primary button;
small, extra-bold uppercase labels; a light warm-gray footer. The proof strip was removed after
the IA review (2026-10-24), so R3 and R3-less rendered the same from then on. To see it again,
recover `src/styles/tokens/themes.css` from git before 2026-10-30.

## Round 4: built around the drawings (2026-10-30)

Why: three new colored-pencil drawings (`portrait-extended.png`, `me-on-rock-and-forest.png`,
`me-big-head.png`) sit on a warm cream paper. Alex wants the site's paper to match it, more of the
drawings' color, and a softer, "dreamy" feel than R3-less, with edges that look faded or erased.
Browns orange is no longer required.

Options (home page only, dev-only at `/lab/<name>/`, compared at `/lab/eye-test`):
- Canvas: R3-less with only the paper changed to cream. The control.
- Sketchbook: cream paper with grain, the forest drawing faded in at the edges, loose pencil
  strokes in many colors for the top bar, underlines and skill dividers. No orange.
- Gallery: the big-head drawing in the middle with the page links placed around it; serif headings.
- Erased: the page is colored-pencil hatching; content sits on patches that look rubbed out.

Eye-test result:
1. Sketchbook over Canvas
2. Sketchbook over Gallery
3. Erased over Sketchbook

**Winner: Erased.** Comments: likes the pencil strokes in the background, the softer faded
edges, and the stronger use of the drawings' palette. The images and the text blocks both blend
into it. Every new direction beat Canvas, so matching the drawings mattered more than keeping
R3-less.

## Round 5: one change at a time from Erased (2026-10-30)

Erased is the starting champion. Each challenger changes one thing (home page, `/lab/eye-test`):
- Crisper strokes: sharp, thin, short hatching instead of soft streaks. Tests whether the blur is
  part of the appeal.
- More color: denser hatching, with red, pink, violet and green as strong as yellow and blue.
- Looser patches: rounder, more ragged erased patches, tilted and overlapping a little.
- Serif headings: tests the type alone, since Gallery's loss mixed type with layout and art.

Saved for later: colors that shift as you scroll, button style, the About and 404 pages.

Eye-test result:
1. Erased over Crisper strokes
2. Erased over More color
3. Looser patches over Erased
4. Looser patches over Serif headings

**Winner: Looser patches.** What each pick says:
- The soft, blurry hatching is part of the appeal. Keep it.
- The current amount of color is right. More is not better.
- Pushing the erased edges further (rounder, raggeder, tilted) helped.
- Heavy sans headings stay.

Caveat: every winner was the option shown as "2". The tool picks sides at random, so four in a
row happens about 1 time in 16 by chance. It may hint at a recency bias: in flip view, "2" is
often the last one seen before picking.

## Round 6: one change at a time from Erased with looser patches (2026-10-30)

Erased now has round 5's looser patches built in and is the starting champion. Challengers:
- Even looser patches: rounder, raggeder, more tilt, more overlap.
- Colors down the page: the hatching scrolls with the content, warm at the top (yellow, red),
  pink and green in the middle, cool at the bottom (violet, blue).
- Pencil buttons: ragged, colored-in buttons, blue for the main one and yellow for the other.
- Colored headings: headings in deep pencil colors (blue, green, violet) instead of graphite.

Eye-test result:
1. Even looser patches over Erased
2. Colors down the page over Even looser patches
3. Colors down the page over Pencil buttons
4. Colors down the page over Colored headings

**Winner: Colors down the page.** Winners came from both sides this time (1, 2, 2, 1), so the
side-2 pattern from round 5 looks like chance.

Comments:
- Wants more padding around the text areas. Even looser patches gave that: its patches reach
  further past the text.
- Preferred the page that is "easier to scroll" over a "kind of parallax" effect. In every other
  option the hatching was fixed in place (`background-attachment: fixed`) while the content moved
  over it. Colors down the page was the only one where the hatching scrolls with the content.

So the winner changed two things at once, and the comment points at the scrolling, not the color
shift. Both are kept. Also kept: graphite headings and plain buttons (each lost), and the even
looser patches (beat the base, and give the extra padding).

## Round 7: "What I do" on Home (2026-11-01)

Not the theme this time: one section of Home. The first build (skill titles as tabs on the left,
a large image with the text under it on the right) looked "discombobulated and too spread out".
Alex wanted something more compact, and wondered about the swipe pattern with cards running off
the page. Four whole directions, each the full home page with only this section swapped:
- Compact tabs: titles as tabs; a small image beside the text, about as tall as the list.
- Swipe cards: no tabs; a sideways row of cards, one per skill, the next one cut off at the edge.
- Tags plus swipe: skill tags above the same cards; a tag scrolls to its card.
- Accordion list: titles as rows; the open one expands with a thumbnail, summary and links.

Eye-test result:
1. Compact tabs over Swipe cards
2. Compact tabs over Tags plus swipe
3. Accordion list over Compact tabs

**Winner: Accordion list.** Comment: he hadn't thought of the "classic FAQ pattern", but it might
work, "especially if it takes the whole content area". So the built version runs the full content
width (the lab one was held to reading width), with bigger row titles and a larger image.
Both swipe options lost to compact tabs, so the sideways pattern didn't win here.

## Current choice

**Erased**, adopted 2026-10-30 after round 6. `src/styles/tokens/themes.css` holds it as one set
of role tokens; the textures are in `src/styles/textures/`. The lab pages and the eye-test
dependency were removed; to run another round, rebuild them from git (2026-10-30) and see
[eye-test.md](eye-test.md).

What Erased is, in plain terms:
- The page is loose, soft colored-pencil hatching that scrolls with the content: yellow and red
  at the top, pink and green in the middle, violet and blue at the bottom.
- Content sits on patches of cream paper (`#F6EDDA`, the drawings' paper) that look rubbed out
  of the hatching with an eraser: ragged, grainy, rounded edges, short ones a little tilted, with
  plenty of paper around the text.
- Drawings fade into the page at ragged edges.
- Graphite text; heavy, tightly spaced sans headlines; small uppercase labels.
- Links in deep pencil blue. Plain buttons: graphite, and outlined.

Applied to the whole site, not just the home page:
- `.patch` (in `global.css`) makes a block a paper patch. The header bar, the footer, the home
  hero and home sections are tilted patches; each inner page's body is one straight patch, so a
  long article doesn't swing off its text.
- On Home, the forest drawing runs edge to edge and the hero's patch is rubbed out of it
  (2026-11-01). On phones the drawing sits above the text instead.
- Everything scales up on wide screens (`--root-size`, 2026-11-01): 16px up to a 1280px screen,
  about 19px at 1920px. The container is 72rem.
- The patch shape (`patch.svg`) is drawn in pixels, so its edge is the same size on a short card
  and a long article. The lab version stretched to fit, which would have eaten into long pages.

## Constraints learned along the way

- `#FF3C00` is 3.4:1 on paper: fine for large text, bars and fills, not for links or small
  text. Links use `#C72E00` (5.3:1). Dark text on orange fills passes. (R3-less only.)
- No orange text on dark backgrounds. (R3-less only.)
- On the cream paper, the bright pencil colors (yellow, red, pink, green, blue) are under
  4.5:1. They're for hatching and fills; text is graphite and links are deep blue (7.0:1).
- Each patch's paper must sit under all text on the page. If patches are separate layers, one
  reaching up over the header covers the header's links.
- In round 6, hatching fixed behind the content felt like parallax and was harder to scroll.
  Keep the hatching scrolling with the page.
