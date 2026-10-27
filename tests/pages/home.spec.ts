import { test, expect } from '@playwright/test';

test('homepage - title and main navigation', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Alex Finnarn — Senior Software Consultant, Troy, Ohio');
  await expect(page.getByRole('heading', { level: 1, name: 'Alex Finnarn' })).toBeVisible();

  const nav = page.getByRole('navigation', { name: 'Main' });
  for (const name of ['Work', 'Writing', 'Consulting', 'About', 'Contact']) {
    await expect(nav.getByRole('link', { name })).toBeVisible();
  }
});
