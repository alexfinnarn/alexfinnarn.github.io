import { expect, test } from '@playwright/test';

test('writing index - lists articles that open', async ({ page }) => {
  await page.goto('/writing/');

  await expect(page).toHaveTitle(/^Writing \|/);
  await expect(page.getByRole('heading', { level: 1, name: 'Writing' })).toBeVisible();

  const first = page.locator('main li h3 a').first();
  const title = await first.textContent();
  await first.click();

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(title!.trim());
  await expect(page.getByText(/min read/)).toBeVisible();
});

test('topic page - shows only that topic', async ({ page }) => {
  await page.goto('/writing/topics/cms/');

  await expect(page.getByRole('heading', { level: 1, name: 'CMS' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'CMS' })).toHaveAttribute('aria-current', 'page');
});
