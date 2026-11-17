import { test, expect } from '@playwright/test';

test('homepage - title and main navigation', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Alex Finnarn — Senior Software Consultant, Troy, Ohio');
  await expect(page.getByRole('heading', { level: 1, name: 'Alex Finnarn' })).toBeVisible();

  const nav = page.getByRole('navigation', { name: 'Main' });
  for (const name of ['Writing', 'Contact']) {
    await expect(nav.getByRole('link', { name })).toBeVisible();
  }
  // Out of the menu until there is more to show (src/site.ts).
  for (const name of ['Work', 'About']) {
    await expect(nav.getByRole('link', { name })).toHaveCount(0);
  }
});

// The forest scene's motion waits for the drawing (src/components/ForestScene.astro).
test.describe('forest scene on a phone', () => {
  const isDrawing = (url: URL) => url.href.includes('me-on-rock-and-forest');

  // The motion only runs for visitors who haven't asked for less of it. Some browsers (WebKit on
  // Linux CI) report reduced motion by default, so say which one these tests mean.
  test.use({ viewport: { width: 390, height: 844 }, contextOptions: { reducedMotion: 'no-preference' } });

  test('motion holds until a slow drawing arrives, then the links appear in view', async ({ page }) => {
    await page.route(isDrawing, async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      await route.fallback();
    });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const scene = page.locator('[data-forest-scene]');
    await expect(scene).toHaveClass(/waiting/);
    await expect(scene.locator('.tag-first')).toHaveCSS('opacity', '0');

    await expect(scene).not.toHaveClass(/waiting/);
    for (const name of ['Writing', 'Contact']) {
      const label = scene.getByRole('link', { name }).getByText(name, { exact: true });
      await expect(label.locator('..')).toHaveCSS('opacity', '1', { timeout: 10_000 });
      await expect(label).toBeInViewport({ ratio: 0.99 });
    }
  });

  test('the links show after a few seconds when the drawing never arrives', async ({ page }) => {
    // Never answered, like a stalled connection.
    await page.route(isDrawing, () => {});
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const scene = page.locator('[data-forest-scene]');
    for (const name of ['Writing', 'Contact']) {
      const label = scene.getByRole('link', { name }).getByText(name, { exact: true });
      await expect(label.locator('..')).toHaveCSS('opacity', '1', { timeout: 10_000 });
      await expect(label).toBeInViewport({ ratio: 0.99 });
    }
    await expect(scene).toHaveClass(/waiting/);
  });

  test.describe('without scripts', () => {
    test.use({ javaScriptEnabled: false });

    test('the links still appear', async ({ page }) => {
      await page.goto('/');
      for (const tag of ['.tag-first', '.tag-second']) {
        await expect(page.locator(`[data-forest-scene] ${tag}`)).toHaveCSS('opacity', '1', { timeout: 10_000 });
      }
    });
  });
});
