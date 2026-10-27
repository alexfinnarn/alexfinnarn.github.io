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

## Current choice

**R3-less**. Adopted to live with while the pages are built, not final.

The proof strip was removed from the site after the IA review (2026-10-24). R3-less differed
from R3 only in the proof strip, so the two now render the same.

On 2026-10-27 the other options and the eye test were removed. `src/styles/tokens/themes.css`
now holds only this look, as one set of role tokens; there's no `data-theme` switch anymore.
To revisit, recover the options from git (commit `457c6ce`) and run another round (see
[eye-test.md](eye-test.md)).

What R3-less is, in plain terms:
- Warm off-white paper, ink-black text
- Heavy, tightly spaced sans-serif headlines; sans-serif body
- Browns orange `#FF3C00` as a bar across the top and the primary button (with dark text)
- Small, extra-bold uppercase labels
- Light warm-gray footer

## Constraints learned along the way

- `#FF3C00` is 3.4:1 on paper: fine for large text, bars and fills, not for links or small
  text. Links use `#C72E00` (5.3:1). Dark text on orange fills passes.
- No orange text on dark backgrounds.
