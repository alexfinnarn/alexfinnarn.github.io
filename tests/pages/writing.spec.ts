import {expect, test} from "@playwright/test";

test('writing page - content is visible', async ({ page }) => {
    // Navigate to the writing page
    await page.goto('/writing');

    // Verify the page title
    await expect(page).toHaveTitle(/Writing/);

    // Verify the heading is visible
    await expect(page.getByRole('heading', { name: 'Writing' })).toBeVisible();

    // Verify the welcome paragraph is visible
    await expect(page.getByText('Welcome to my writing space')).toBeVisible();

    // Verify the writing list container is present
    await expect(page.locator('.writing-list')).toBeVisible();
});