import { test, expect } from '@playwright/test';

test('homepage - menu links are visible', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');

    // Verify the page title
    await expect(page).toHaveTitle("Finn's Big Web | Default Page Title");

    // Verify the site logo/title is visible
    await expect(page.locator('h1 a')).toBeVisible();

    // Verify the Projects link is visible
    await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible();

    // Verify the Writing link is visible
    await expect(page.getByRole('link', { name: 'Writing' })).toBeVisible();
});