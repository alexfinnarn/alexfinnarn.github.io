# Lab

Dev-only pages for eye-test rounds: comparing design options with the "1 or 2?" method in [docs/design/eye-test.md](../../docs/design/eye-test.md). Nothing here is part of the site. This folder is empty between rounds.

## Running a round

- Put the lab page and anything only it uses (option components, textures, dummy data) in this folder.
- Add a route for it in `astro.config.mjs`, next to `/styleguide`. Routes there exist only in `npm run dev`, so a lab never reaches the production build.
- Show each option on the real page or section, with only the thing being compared changed.
- Use dummy text that is obviously dummy. Site copy is Alex's.
- Lab files may break the styling rules (hard-coded values, local masks) while a round runs.
- A lab doesn't have to be a comparison. For a new idea with nothing to compare it to, build one prototype page and change it after each comment (round 13, the forest scene).
- For values Alex should set himself (colors, widths), put controls on the lab page that write CSS variables, print the current values so he can paste them back, and remember them in the browser. Remove the controls once the values are picked.
- To try something on a real page without changing the page, show it in a frame on the lab page and change it from there: set a role token on the frame's root, or add the prototype to the frame's page with a script. Round 14 did both (the cursor, then the forest palette).
- For where something sits, give sliders for position, tilt and size, measured in the coordinates of what it sits on (a drawing's own pixels), instead of nudging it by guess.
- Check the lab at the width Alex is looking at. Something that only works where the hatching shows can do nothing at a laptop width, with no error.
- After each layout change, look at a phone width as well as a desktop one.
- For motion, check each moment of the sequence (pause it and step to set times), and check moving things in every place they end up.

## After Alex picks

- Build the winner into the real component, following the styling rule in [AGENTS.md](../../AGENTS.md).
- Update [docs/design/decisions.md](../../docs/design/decisions.md): rewrite "Current choice" to match the winner, and add one line for each loser under "Tried and ruled out", with his reason if he gave one. Don't log the round itself.
- Delete the lab files and their route, so this folder is back to just this README.
