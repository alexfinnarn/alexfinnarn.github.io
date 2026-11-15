# Finn's Big Beautiful Web

Here lies Alex Finnarn's idea of a big beatufiul web. It contains his portfolio of web work, musings on the web and other life things, and hidden treasures.

## Working on the site

The site is built with [Astro](https://astro.build). Node 22 comes from mise.

- **Install:** `npm install`
- **Start:** `npm run dev`, then open the address it prints. `/styleguide` shows the design tokens and components, and exists only while the dev server runs.
- **Write:** articles are Markdown files in `src/content/writing/`, named with a three-digit number in publish order, such as `010-the-post-slug.md`. The number only orders the files. The address drops it: `/writing/the-post-slug/`. An article with `draft: true` shows in dev and is left out of the live site.
- **Preview the real build:** `npm run build`, then `npm run preview`
- **Test:** `npm test` runs the Playwright tests in `tests/`

Notes for AI agents are in [AGENTS.md](AGENTS.md). What each page is for, and what has been decided about it, is in [docs/ia/](docs/ia/).

## Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the `astro` branch. The deployment is handled by a GitHub Actions workflow defined in `.github/workflows/deploy.yml`.

The site will be available at https://alexfinnarn.github.io/ . Some blog posts are marked as drafts and will not be accessible on the production site until they are published.

### Manual Deployment

You can also trigger a manual deployment from the Actions tab on GitHub by selecting the "Deploy to GitHub Pages" workflow and clicking "Run workflow".
