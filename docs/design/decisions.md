# Design decisions

The site's look as it stands, what was tried and ruled out, and the constraints found along the way. This is not a history: when a choice is replaced, its entry here is rewritten, and the old option gets one line under "Tried and ruled out". The round-by-round record of how each choice was reached was removed on 2026-11-15 and is in git history.

## Current choice

**Erased**, adopted 2026-10-30. `src/styles/tokens/themes.css` holds it as one set of role tokens; the textures are in `src/styles/textures/`. To run another comparison round, see [src/lab/README.md](../../src/lab/README.md) and [eye-test.md](eye-test.md).

What Erased is, in plain terms:
- The page is loose, soft colored-pencil hatching that scrolls with the content: yellow and red at the top, pink and green in the middle, violet and blue at the bottom.
- Content sits on patches of cream paper (`#F6EDDA`, the drawings' paper) that look rubbed out of the hatching with an eraser: ragged, grainy, rounded edges, short ones a little tilted, with plenty of paper around the text.
- Drawings fade into the page at ragged edges.
- Graphite text; heavy, tightly spaced sans headlines; small uppercase labels.
- Links in deep pencil blue. Plain buttons: graphite, and outlined.

Applied to the whole site, not just the home page:
- `.patch` (in `global.css`) makes a block a paper patch. The header bar, the footer, the home hero and home sections are tilted patches; each inner page's body is one straight patch, so a long article doesn't swing off its text.
- On Home, the forest drawing fills the screen and two spots in it are links, introduced by a paper cut-out bird (`ForestScene`, 2026-11-14). On phones the drawing pans sideways and opens on the hiker. The `Hero` component, which runs a drawing edge to edge behind a text patch, is not used on any page now; it is shown in the style guide.
- Over the hatching and the forest drawing, the mouse pointer is a small graphite pencil drawn in a sketchy line, with the lead tip as the hotspot (`pencil.svg`, the `--cursor-page` role token, 2026-11-19). On paper, text and links keep their usual cursors. Touch screens don't show it.
- Everything scales up on wide screens (`--root-size`, 2026-11-01): 16px up to a 1280px screen, about 19px at 1920px. The container is 72rem.
- The patch shape (`patch.svg`) is drawn in pixels, so its edge is the same size on a short card and a long article. The lab version stretched to fit, which would have eaten into long pages.

Picked in comparisons, so don't change these without asking:
- The hatching is soft and blurry, not crisp strokes, and it has this much color and no more.
- The hatching scrolls with the page.
- Headings are heavy sans in graphite. Buttons are plain.
- Patches reach well past their text, with ragged, rounded edges.

Home's forest scene (`ForestScene`):
- The name sits on a paper cut-out laid on the drawing, like the bird and the palette: a rough cut edge, a slight tilt, a shadow, and a faint haze of paper around it (picked 2026-11-19; Alex set the blur and haze with sliders, the `--name-paper-*` role tokens).
- Two links, Writing and Contact, both next to the hiker so a phone shows them: Writing on the young pine to his left, Contact on his backpack. The bird lands on the first label as it appears, then moves to its perch on the backpack as the second appears.
- The bird is a paper cut-out colored in with pencil: a light blue edge and dark blue coloring (the `--bird-*` role tokens), sitting on top of the drawing with no blend mode. Alex set the colors himself with color pickers.
- The motion waits for the drawing to load. Until then the scene shows a blurred thumbnail of it and nothing moves. If the drawing takes more than 4 seconds, both labels show without waiting for the bird.
- The words on the "Pause motion" button are a placeholder.
- A painter's palette leans on the near rock on the left (Alex placed it with sliders, 2026-11-19). It's a paper cut-out colored in as wood, like the bird, with six paints in the pencil colors, a graphite dab in the middle and a pink eraser.
- Picking a paint turns the pencil cursor that color and lets you draw on the drawing: a grainy pencil line, above the drawing and under the needles, links and bird. The middle dab turns into an X that stops drawing, and picking the same paint again also stops. The eraser rubs out what's already drawn. Marks stay until you leave the page; nothing is saved.
- Mouse and pen only. Without a fine pointer the palette doesn't show, and phones never show that part of the drawing anyway. The paints work from the keyboard too.
- The palette's accessible names ("Paints", the color names, "Eraser", "Stop drawing") are placeholders.

Home's "What I do" (`SituationScraps`, hidden since 2026-11-14):
- Situations a visitor might be in, as small scraps of paper tossed on the hatching, each tilted and in its own pencil color. Picking one lifts and straightens it, colors it in, swaps its scribble for a drawn underline, and shows the reply on a larger scrap in that color. One reply always shows, so something is on screen without clicking.
- The scraps' edge is brushy (`scrap.svg`, the `--scrap-mask` role token). The reply's edge is one soft blob (`scrap-soft.svg`, `--scrap-mask-soft`).
- Colors run red, green, blue, violet, pink: one per scrap, up to the limit of five. No yellow.
- On phones each reply opens right under its scrap.

The `Hero` component's fade:
- On wide screens the drawing fades in over 77% of the hero's width (`--art-fade-inline`), well past the text's paper. Phones use `--art-fade-block`.

## Tried and ruled out

Don't bring these back without asking.

The look:
- A warm off-white page with a Browns orange (`#FF3C00`) bar and buttons. Replaced by Erased; orange is no longer part of the site.
- Serif headings, and headings in pencil colors.
- Ragged, colored-in pencil buttons.
- Crisp, thin hatching, and denser hatching with more color.
- Hatching fixed in place while the content scrolls over it. It felt like parallax and was harder to scroll.
- The big-head drawing in the middle of Home with the page links placed around it.

The pencil cursor:
- A classic yellow pencil with an eraser, and a blue colored pencil with hatch lines on its body.
- Drawing on the hatching around the paper, with a color wheel fixed in a corner. At most window widths the paper covers the hatching, so there was nowhere to draw, and the wheel covered text.

Home's "What I do":
- Skill names as the list. They read like any consultant's menu; the scraps list the visitor's situations instead.
- An accordion with one row per skill, each with an image and a summary. It was built and then dropped: every row needed a picture, and articles have no obvious picture.
- Tabs with a large image, and sideways swipe cards.
- A cluster of paper clouds, each opening a modal. It hid the work behind a click. Notes are in `plans/archive/skill-clouds.md`; the code is on branch `skill-clouds-lab`.
- A straight torn edge on the scraps, and the brushy edge on the reply, where its stroke ends cut in at the start of each line of text.
- Yellow as a scrap color. It barely shows on the cream paper.

Home's forest scene:
- Swaying treetops made from leaning copies of the drawing. They flickered. The drawing is one flat image, so moving trees would need it redrawn in layers.
- Links on the left of the drawing. They were off screen on a phone.
- An "overlay" blend on the bird. It was too hard to see in front of a dark tree trunk.
- A cream outline on the bird.
- A soft blob of paper behind the name. It melted into the pale sky and read as a hole in the drawing.
- No paper behind the name, with the top of the drawing fading to paper instead.

## Constraints learned along the way

- On the cream paper, the bright pencil colors (yellow, red, pink, green, blue) are under 4.5:1. They're for hatching and fills; text is graphite and links are deep blue (7.0:1).
- Each patch's paper must sit under all text on the page. If patches are separate layers, one reaching up over the header covers the header's links.
- `patch.svg`'s ragged edge is about 100px wide, which leaves a small block nearly see-through. Small blocks use the scrap masks instead.
- On a laptop-width screen the paper covers the whole width, so anything meant to show only in the hatching beside the paper won't be seen there.
