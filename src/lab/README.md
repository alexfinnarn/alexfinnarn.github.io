# Lab

Dev-only pages for eye-test rounds: comparing design options with the "1 or 2?" method in
[docs/design/eye-test.md](../../docs/design/eye-test.md). Nothing here is part of the site.
This folder is empty between rounds.

## Running a round

- Put the lab page and anything only it uses (option components, textures, dummy data) in
  this folder.
- Add a route for it in `astro.config.mjs`, next to `/styleguide`. Routes there exist only
  in `npm run dev`, so a lab never reaches the production build.
- Show each option on the real page or section, with only the thing being compared changed.
- Use dummy text that is obviously dummy. Site copy is Alex's.
- Lab files may break the styling rules (hard-coded values, local masks) while a round runs.
- A lab doesn't have to be a comparison. For a new idea with nothing to compare it to, build one
  prototype page and change it after each comment (round 13, the forest scene).
- For values Alex should set himself (colors, widths), put controls on the lab page that write
  CSS variables, print the current values so he can paste them back, and remember them in the
  browser. Remove the controls once the values are picked.
- After each layout change, look at a phone width as well as a desktop one.
- For motion, check each moment of the sequence (pause it and step to set times), and check
  moving things in every place they end up.

## After Alex picks

- Build the winner into the real component, using only role tokens.
- Log the round in [docs/design/decisions.md](../../docs/design/decisions.md): what was
  compared, the result, and his comments.
- Delete the lab files and their route, so this folder is back to just this README.
