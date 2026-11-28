# Design decisions

The site's look as it stands, one section per part of the site. Each section has up to three lists:
- **Now:** how it looks and works today.
- **Ruled out:** options that were tried and dropped. Don't bring these back without asking.
- **Watch out:** constraints found along the way.

This is not a history. When a choice is replaced, its "Now" entry is rewritten and the old option gets one line under "Ruled out". The round-by-round record of how each choice was reached is in git history. To run a comparison round, see [src/lab/README.md](../../src/lab/README.md) and [eye-test.md](eye-test.md).

Sections:
- [The overall look](#the-overall-look)
- [Paper: patches, scraps and cut-outs](#paper-patches-scraps-and-cut-outs)
- [Links](#links)
- [The pencil cursor](#the-pencil-cursor)
- [Post lists](#post-lists)
- [Article pages](#article-pages)
- [Home: the forest scene](#home-the-forest-scene)
- [Home: "What I do" (hidden)](#home-what-i-do-hidden)
- [The Hero component (unused)](#the-hero-component-unused)

## The overall look

**Now:**
- The look is called **Erased**, adopted 2026-10-30. `src/styles/tokens/themes.css` holds it as one set of role tokens; the textures are in `src/styles/textures/`.
- The page is loose, soft colored-pencil hatching that scrolls with the content: yellow and red at the top, pink and green in the middle, violet and blue at the bottom.
- Content sits on cream paper (`#F6EDDA`, the drawings' paper) that looks rubbed out of the hatching with an eraser (see [Paper](#paper-patches-scraps-and-cut-outs)).
- Drawings fade into the page at ragged edges (`.art`).
- Graphite text; heavy, tightly spaced sans headlines; small uppercase labels.
- Plain buttons: graphite, and outlined.
- Everything scales up on wide screens (`--root-size`, 2026-11-01): 16px up to a 1280px screen, about 19px at 1920px. The container is 72rem.
- Picked in comparisons, so don't change these without asking:
  - The hatching is soft and blurry, not crisp strokes, and it has this much color and no more.
  - The hatching scrolls with the page.
  - Headings are heavy sans in graphite. Buttons are plain.
  - Patches reach well past their text, with ragged, rounded edges.

**Ruled out:**
- A warm off-white page with a Browns orange (`#FF3C00`) bar and buttons. Replaced by Erased; orange is no longer part of the site.
- Serif headings, and headings in pencil colors.
- Ragged, colored-in pencil buttons.
- Crisp, thin hatching, and denser hatching with more color.
- Hatching fixed in place while the content scrolls over it. It felt like parallax and was harder to scroll.

**Watch out:**
- On the cream paper, the bright pencil colors (yellow, red, pink, green, blue) are under 4.5:1. They're for hatching and fills; text is graphite and links are deep blue (7.0:1).

## Paper: patches, scraps and cut-outs

**Now:**
- `.patch` (in `global.css`) makes a block a patch of paper: ragged, grainy, rounded edges, with plenty of paper around the text. Short ones get `.tilt`. The header bar, the footer and Home's sections are tilted patches; each inner page's body is one straight patch, so a long article doesn't swing off its text.
- The patch shape (`patch.svg`) is drawn in pixels, so its edge is the same size on a short card and a long article. The lab version stretched to fit, which would have eaten into long pages.
- Small blocks use a scrap instead: a brushy edge (`scrap.svg`, `--scrap-mask`) or one soft blob (`scrap-soft.svg`, `--scrap-mask-soft`).
- `.cutout` (in `global.css`) is a paper cut-out lying on the page, like the name on Home's forest: a rough cut edge, a slight tilt (`--cutout-tilt`) and a small shadow. It's for a short label, such as Home's "Writing" heading, and it sits above the patches around it, so it can lie across a patch's edge. Its cut edge is the `paper-cut` filter in `Base.astro` (picked 2026-11-27).

**Watch out:**
- Each patch's paper must sit under all text on the page. If patches are separate layers, one reaching up over the header covers the header's links.
- `patch.svg`'s ragged edge is about 100px wide, which leaves a small block nearly see-through. Small blocks use the scrap masks instead.
- On a laptop-width screen the paper covers the whole width, so anything meant to show only in the hatching beside the paper won't be seen there.

## Links

**Now:**
- Links sit on a hand-drawn blue pencil underline that thickens on hover (`underline.svg`, the `--link-underline*` role tokens; Alex set the values with sliders, 2026-11-27).
- Links in text and the footer are deep pencil blue.
- A heading that is a link, such as a post title in a list, stays graphite and turns blue on hover (`.title-link`).
- In the menu the stroke shows only under the current page and on hover.
- Buttons and topic chips have no underline.

**Ruled out:**
- The browser's plain underline on links in text, and a plain red line under the menu's current page.
- Graphite titles underlined only on hover. They didn't look clickable.
- Deep-blue titles, underlined only on hover or always underlined like links in body text.
- Graphite titles with a blue "Read →" link under each description.

## The pencil cursor

**Now:**
- Over the hatching and the forest drawing, the mouse pointer is a small graphite pencil drawn in a sketchy line, with the lead tip as the hotspot (`pencil.svg`, the `--cursor-page` role token, 2026-11-19).
- On paper, text and links keep their usual cursors. Touch screens don't show it.

**Ruled out:**
- A classic yellow pencil with an eraser, and a blue colored pencil with hatch lines on its body.
- Drawing on the hatching around the paper, with a color wheel fixed in a corner. At most window widths the paper covers the hatching, so there was nowhere to draw, and the wheel covered text.

## Post lists

On Writing, the topic pages and Home's featured writing (`ArticleList` with `ArticleListItem`).

**Now:**
- Each post sits on its own patch of paper, tilted a little and alternating, with hatching between posts (picked 2026-11-27).
- Each post gets a pencil color in turn: red, green, blue, violet, pink.
- Under the description, the date sits on the left with a short dash in the post's color, and "Read more →" sits on the right, underlined in the same color.
- On Writing and the topic pages, the page heading and topics share one patch above the posts.
- On Home, the "Writing" heading is a paper cut-out (`.cutout`, picked 2026-11-27) lying across the top of the first post's paper, and the "All writing" link gets a small scrap.

**Ruled out:**
- One straight patch for the whole list with a rule between posts, with or without a pencil color per post.
- One patch per post with no color.
- A pencil scribble behind each date. The date was hard to read on the color.
- A pencil loop around each date, tight or loose. It looked like a form field.
- The date above the title.
- Home's "Writing" heading on its own small scrap, either floating above the posts or set right on top of the first post's paper; or on the first post's paper with no paper of its own.

## Article pages

**Now:**
- Articles sit on one narrow patch of paper, centered, as wide as the text column (`--article-width: 68ch`, picked 2026-11-27), with hatching showing on both sides. At a 1728px window that is about 90 characters a line.

**Ruled out:**
- The full-width paper with a 44rem text column on its left, leaving a wide empty margin on the right.
- A narrower 62ch column on the narrow paper.
- The full-width paper with a 62ch text column centered on it.

## Home: the forest scene

`ForestScene`, since 2026-11-14.

**Now:**
- The forest drawing fills the screen. On phones it pans sideways and opens on the hiker.
- The name sits on a paper cut-out laid on the drawing, like the bird and the palette: a rough cut edge, a slight tilt, a shadow, and a faint haze of paper around it (picked 2026-11-19; Alex set the blur and haze with sliders, the `--name-paper-*` role tokens).
- Two spots in the drawing are links, Writing and Contact, both next to the hiker so a phone shows them: Writing on the young pine to his left, Contact on his backpack.
- A paper cut-out bird introduces the links: it lands on the first label as it appears, then moves to its perch on the backpack as the second appears.
- The bird is colored in with pencil: a light blue edge and dark blue coloring (the `--bird-*` role tokens), sitting on top of the drawing with no blend mode. Alex set the colors himself with color pickers.
- The motion waits for the drawing to load. Until then the scene shows a blurred thumbnail of it and nothing moves. If the drawing takes more than 4 seconds, both labels show without waiting for the bird.
- The words on the "Pause motion" button are a placeholder.
- A painter's palette leans on the near rock on the left (Alex placed it with sliders, 2026-11-19). It's a paper cut-out colored in as wood, like the bird, with six paints in the pencil colors, a graphite dab in the middle and a pink eraser.
- Picking a paint turns the pencil cursor that color and lets you draw on the drawing: a grainy pencil line, above the drawing and under the needles, links and bird. The middle dab turns into an X that stops drawing, and picking the same paint again also stops. The eraser rubs out what's already drawn. Marks stay until you leave the page; nothing is saved.
- The palette is for mouse and pen only. Without a fine pointer it doesn't show, and phones never show that part of the drawing anyway. The paints work from the keyboard too.
- The palette's accessible names ("Paints", the color names, "Eraser", "Stop drawing") are placeholders.

**Ruled out:**
- The big-head drawing in the middle of Home with the page links placed around it.
- Swaying treetops made from leaning copies of the drawing. They flickered. The drawing is one flat image, so moving trees would need it redrawn in layers.
- Links on the left of the drawing. They were off screen on a phone.
- An "overlay" blend on the bird. It was too hard to see in front of a dark tree trunk.
- A cream outline on the bird.
- A soft blob of paper behind the name. It melted into the pale sky and read as a hole in the drawing.
- No paper behind the name, with the top of the drawing fading to paper instead.

## Home: "What I do" (hidden)

`SituationScraps`, hidden since 2026-11-14.

**Now:**
- Situations a visitor might be in, as small scraps of paper tossed on the hatching, each tilted and in its own pencil color.
- Picking one lifts and straightens it, colors it in, swaps its scribble for a drawn underline, and shows the reply on a larger scrap in that color. One reply always shows, so something is on screen without clicking.
- The scraps' edge is brushy (`--scrap-mask`). The reply's edge is one soft blob (`--scrap-mask-soft`).
- Colors run red, green, blue, violet, pink: one per scrap, up to the limit of five. No yellow.
- On phones each reply opens right under its scrap.

**Ruled out:**
- Skill names as the list. They read like any consultant's menu; the scraps list the visitor's situations instead.
- An accordion with one row per skill, each with an image and a summary. It was built and then dropped: every row needed a picture, and articles have no obvious picture.
- Tabs with a large image, and sideways swipe cards.
- A cluster of paper clouds, each opening a modal. It hid the work behind a click. Notes are in `plans/archive/skill-clouds.md`; the code is on branch `skill-clouds-lab`.
- A straight torn edge on the scraps, and the brushy edge on the reply, where its stroke ends cut in at the start of each line of text.
- Yellow as a scrap color. It barely shows on the cream paper.

## The Hero component (unused)

**Now:**
- `Hero` runs a drawing edge to edge behind a text patch. No page uses it now; it is shown in the style guide.
- On wide screens the drawing fades in over 77% of the hero's width (`--art-fade-inline`), well past the text's paper. Phones use `--art-fade-block`.
