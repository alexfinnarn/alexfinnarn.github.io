import {expect, test} from "@playwright/test";

test('projects page - content is visible', async ({ page }) => {
    // Navigate to the projects page
    await page.goto('/projects');

    // Verify the page title
    await expect(page).toHaveTitle("Finn's Big Web | Default Page Title");

    // Verify the heading is visible
    await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();

    // Verify the intro paragraph is visible
    await expect(page.getByText('Here are some of my projects.')).toBeVisible();

    // Verify the 3D container is present
    await expect(page.locator('#three-buildings')).toBeVisible();
});