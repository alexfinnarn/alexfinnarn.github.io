import { test, expect } from '@playwright/test';

test('theme settings - alternate dark mode to light mode', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');

    // Open the settings panel by clicking the settings trigger button
    await page.click('.settings-trigger');

    // Wait for the settings panel to be visible
    await page.waitForSelector('.settings-panel.is-open');

    // Select the light theme from the dropdown
    await page.selectOption('#theme', 'light');

    // Verify that the data-color-scheme attribute is set to "light" on the HTML element
    const htmlElementLight = await page.locator('html');
    await expect(htmlElementLight).toHaveAttribute('data-color-scheme', 'light');

    // Select the dark theme from the dropdown
    await page.selectOption('#theme', 'dark');

    // Verify that the data-color-scheme attribute is set to "dark" on the HTML element
    const htmlElementDark = await page.locator('html');
    await expect(htmlElementDark).toHaveAttribute('data-color-scheme', 'dark');

    // Select the system theme (which removes the attribute)
    await page.selectOption('#theme', 'system');

    // Verify that the data-color-scheme attribute is removed
    const htmlElementSystem = await page.locator('html');
    await expect(htmlElementSystem).not.toHaveAttribute('data-color-scheme');

    // Close the settings panel
    await page.click('.close-button');

    // Verify the panel is closed
    await expect(page.locator('.settings-panel.is-open')).not.toBeVisible();
});
