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

test('forest links are in view on a phone before the image and scripts load', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.route(/me-on-rock-and-forest\..*\.webp(?:\?|$)/, (route) => route.abort());
  await page.route('**/*', (route) =>
    route.request().resourceType() === 'script' ? route.abort() : route.fallback(),
  );
  await page.goto('/');

  const scene = page.locator('[data-forest-scene]');
  for (const name of ['Writing', 'Contact']) {
    const label = scene.getByRole('link', { name }).getByText(name, { exact: true });
    await expect(label).toBeInViewport({ ratio: 0.99 });
    await expect(label.locator('..')).toHaveCSS('opacity', '1');
  }
  await expect(scene.locator('.artwork')).toHaveCSS('overflow-x', 'clip');

  await scene.getByRole('link', { name: 'Writing' }).getByText('Writing', { exact: true }).click();
  await expect(page).toHaveURL(/\/writing\/$/);
});
