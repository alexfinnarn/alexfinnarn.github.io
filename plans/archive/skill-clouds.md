# Skill clouds

Turn Home's "What I do" into sketched pencil clouds, one per skill. Clicking a cloud opens a
modal with a work example above the page; the cluster underneath stays in place. It replaces
the current accordion only if it wins an eye test against it.

- **Status:** parked (2026-11-01) after steps 1 and 2. The accordion stays on Home.
- **Why parked:** Alex wasn't liking it, and the accordion is safer and simpler. The clouds
  hide the work behind a click, where the accordion shows an example right away. The scatter
  mostly disappears on phones. Step 3 (the modal: focus, dismissal, scrolling, paging, a
  no-JavaScript version) would have added the most complexity to maintain.
- **Where the code is:** branch `skill-clouds-lab`, not merged. The lab ran at `/lab/clouds`
  (dev only), with Home and the cluster at `/lab/clouds/home/six/` and
  `/lab/clouds/home/three/`. Files: `src/lib/cloud.ts` (the bump outline), `src/lab/` (the
  rest), and two routes in `astro.config.mjs`.
- **Worth keeping:** anything paper-colored has to sit on the hatching, not on a patch, or it
  disappears. Small patches need more reach (about 4.5rem by 5rem) before the paper texture
  shows.
- **Learned in step 1:**
  - Cream clouds disappear on a cream patch. They have to sit on the hatching, the way patches
    do, so the section around them can't be a patch; only "What I do" and "All work" get one.
  - Shape A as first described (noise lumps on a rounded patch) read as pebbles, not clouds.
    A became the same ring of bumps as B, with the patches' eraser edge and no line, so the two
    differed only in the edge: rubbed out versus drawn.
  - **Alex picked A** (rubbed out) over B (pencil outline). B is removed from the lab, and the
    "Shape" choice under "Visual choices for the eye test" is settled.
  - Labels run up to three lines: at small (14 × 8.5 rem), "Migrations and upgrades" and
    "Content Management Systems"; at medium, only "Content Management Systems". The cluster
    should size each cloud for its label.
- **Learned in step 2:**
  - Clouds are sized to their names, about two lines each, and a cloud's name scales with it,
    so the sizes read as different rather than padded. Size, nudge and tilt come from the skill's
    name, so the cluster is the same on every build.
  - Small nudges still read as a 3 × 2 grid. The current scatter (up to 3rem sideways and 3.5rem
    up or down) breaks the rows. Three skills fall into a loose triangle.
  - Full-size clouds filled a phone's width and couldn't stagger; on phones they're 70% size,
    alternating left and right, overlapping at their bumps. Six skills take about 1.3 screens.
  - The keyboard focus outline is a rectangle around the cloud. It's clear, but it could follow
    the cloud's shape later.
- **Replaces:** the accordion in `src/components/SkillAccordion.astro`, if it wins

## What Alex wants

- **Scattered cluster.** Clouds of different sizes sit loosely across the section, a little
  overlapping, like thought bubbles on a page. Not a tidy row or grid. Labels and click targets
  remain clear.
- **An example above the clouds.** Clicking a cloud opens a modal over a dimmed page: image,
  kind, title, summary, and the two links (the example's link label and "More <skill>"). The
  other clouds do not shrink, move aside, or change layout.
- **Easy dismissal.** A visible close icon, a click on the backdrop, or Escape closes the modal
  and returns the visitor to the same cluster.
- **Paging between skills.** Inside the modal, previous and next links (for example
  "← Testing and QA · Migrations and upgrades →") open the neighboring skill's example without
  closing, in the order of `src/data/skills.ts`. Kept only if the eye test says it helps.
- **Made like the site's textures.** The clouds are generated in code, like the paper patches
  and pencil hatching. No new artwork is needed; existing work-example images stay.
- **Replace if it wins.** The best cloud version faces the current accordion in an eye test.
  The winner stays on Home.

## Content and initial state

- One cloud per skill that has work, each showing one work example from the same data the
  accordion uses (`getSkillSlides` in `src/lib/content.ts`). Preserve the existing content and
  work-kind-specific link labels.
- Skills follow `src/data/skills.ts` in the DOM, keyboard navigation, and screen-reader order,
  even though their visual arrangement is scattered.
- All clouds start closed. Only one modal can be open at a time. The "All work" link stays
  after the section, and "What I do" stays a plain heading above it.
- Design for both the three skills with work today and the six-skill dev dataset.
- The current accordion starts with its first example visible. The cloud version instead
  requires an interaction to see an example; that tradeoff is part of the eye test.

## How it could be built

Try the shapes in a dev-only lab before choosing. Keep the initial comparison to shape and
scatter, using the site's cream paper and existing role tokens.

- **Cloud shape, option A: lumpy patch.** Adapt the noise-filter approach in
  `src/styles/textures/patch.svg` to create larger, slower edge bumps. Treat the result as a
  prototype: verify that it reads as a cloud at both trigger and modal sizes.
- **Cloud shape, option B: drawn outline.** Generate a circle-bump outline with a soft pencil
  stroke. Give the small trigger and large modal appropriate geometry rather than stretching
  one outline to every aspect ratio.
- **Scatter.** Give each trigger a stable size and position based on its skill, with a small
  tilt like the patches. Keep decoration behind labels and focus outlines. Opening a modal
  leaves the cluster's dimensions and positions unchanged.
- **Modal.** Use a native `<dialog>` opened with `showModal()`, with a cloud-shaped paper
  background on desktop and a dimmed backdrop. Put content in a generous rectangular safe
  area inside the cloud; do not clip text, links, or the close control to the decorative edge.
  Each cloud is a link to its skill's page (`/work/skills/<skill>/`); the script turns it into
  the modal's trigger (see "Without JavaScript").
- **Paging.** Previous and next links at the bottom of the modal swap in the neighboring
  skill's content in the same dialog, wrapping at the ends. Focus moves to the new heading, and
  closing returns focus to the cloud of the skill now showing. Each is also a plain link to that
  skill's page.
- **Closing and focus.** Give the dialog an accessible name from its heading and the close
  icon an accessible label. Move focus inside on opening, keep Tab navigation inside while
  open, and return focus to the originating trigger on closing. Support Enter on triggers, Escape, the close button, and backdrop clicks. Clicking or dragging within the
  content must not accidentally dismiss it. The background is inert while the modal is open.
- **Phones and overflow.** Stack or loosely stagger the triggers without horizontal overflow.
  Use a roomy, lightly scalloped modal panel on narrow screens, with enough edge space for
  content and controls. Constrain its height to the viewport, allow content to scroll, and
  keep the close control reachable. Preserve the page's scroll position when closing.
- **Motion.** Establish the instant open/close behavior first. Then try a short, calm reveal
  that suggests the modal came from the selected cloud. View Transitions is optional; the
  interaction must work without it. Reduced motion gets an instant change.
- **Without JavaScript.** Each cloud is a plain link to its skill's page on Work, which already
  lists that skill's examples, so a click goes there. The script adds the modal on top: it
  intercepts the click and opens the dialog. The clouds render the same either way, so nothing
  swaps or jumps when the script loads, and there's only one component to keep up. Modal content
  ships in the page but stays hidden until opened.

## Steps

1. **Shapes and content fit.** Build small cloud triggers and static modal samples for shapes
   A and B in a dev-only lab, outside the style guide. Use real examples, including the longest
   title and summary, at desktop and phone widths.
   - Done when: both shapes have readable content and usable controls at several sizes, with
     no stretched edges or clipped content. Preserve full summaries.
2. **The cluster.** Place the triggers in a lab page with the rest of Home around them. Check
   both three and six skills, scattered on desktop and stacked or staggered on phones.
   - Done when: labels and targets remain clear, nothing scrolls sideways, and Tab order
     matches the skills list.
3. **The modal.** Add native dialog behavior, dismissal, focus handling, scrolling, paging,
   and the plain-link behavior without JavaScript. Verify the instant interaction before adding
   optional animation.
   - Done when: only one modal opens, the cluster stays in place, all dismissal methods work,
     paging moves through every skill and wraps, focus returns correctly, and the background
     cannot be operated while the modal is open.
     Check a narrow phone viewport, short viewport, zoomed text, keyboard navigation, reduced
     motion, unavailable View Transitions, and disabled JavaScript.
4. **Eye test (round 8).** Compare the current accordion with two or three cloud versions
   selected from the lab. Use the round 7 format: full Home, only this section swapped,
   pairwise comparisons. Keep later challengers to one visual change at a time. Paging can be
   a challenger: the same cloud version with and without it. The eye-test page says at the top
   to open a cloud in each option, so the clouds aren't judged only closed.
   - Done when: Alex has picked a winner after seeing desktop and phone layouts and trying
     opening an example, closing it, opening another skill, and following an example link.
     Compare the closed initial cluster with the accordion's immediately visible example.
     A cloud version must pass the usability checks in step 3 before adoption.
5. **Adopt or drop.** If a cloud version wins, it replaces the accordion on Home and
   `SkillAccordion` is deleted. Update the style guide,
   `docs/ia/home.md`, and `docs/design/decisions.md`, then remove the lab. If the accordion
   wins, log the round and remove the cloud experiment. Either way, archive this plan in
   `plans/archive/`.

## Visual choices for the eye test

- **Shape.** Settled in step 1: the lumpy patch (rubbed-out edge).
- **Scatter.** More or less variation in size, spacing, and tilt, with clear labels in both.
- **Color, if needed later.** Cream paper or a light pencil-color wash per skill. Keep text
  graphite and links deep blue, using role tokens and preserving contrast.

## Risks

- **Hidden evidence.** Visitors see skill names first and must click to see work. The cloud
  version must earn that extra interaction compared with the accordion's visible example.
- **Interruption.** A modal temporarily blocks the rest of Home. Paging lets visitors move
  between skills without closing; the eye test shows whether that's enough or whether a modal
  still feels like a detour.
- **Phones.** The scattered look mostly disappears in one column, and a large modal may feel
  like a separate page. Judge the phone experience alongside desktop.
- **Content fit.** Long titles, summaries, zoomed text, and short screens can crowd the cloud.
  Let the panel grow or scroll and simplify the decorative edge rather than cutting copy.
- **Motion.** A reveal can help connect the modal to its trigger, but should not delay access
  or dismissal. The instant version must feel complete on its own.
