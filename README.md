# Finn's Big Beautiful Web

Here lies Alex Finnarn's idea of a big beatufiul web. It contains his portfolio of web work, 
musings on the web and other life things, and hidden treasures.

## Structure

The site is built using Astro and you can read more about [Astro docs here](docs/astro.md).

Alex likes to live in the open and very dangeously, so he gladly publishes his dirty laundry and 
works in progress in [a tasks document](docs/tasks.md) you can review yourself. 

Testing is tested in the testing-most way: [see how I do testing](docs/testing.md) 

## Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the `astro` 
branch. The deployment is handled by a GitHub Actions workflow defined in 
`.github/workflows/deploy.yml`.

The site will be available at https://alexfinnarn.github.io/ . Some blog posts are marked as 
drafts and will not be accessible on the production site until they are published.

### Manual Deployment

You can also trigger a manual deployment from the Actions tab on GitHub by selecting the "Deploy 
to GitHub Pages" workflow and clicking "Run workflow".
