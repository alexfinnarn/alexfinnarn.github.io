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

    // Verify the projects listing is present
    await expect(page.locator('#projects-listing')).toBeVisible();

    // Verify all three projects are displayed
    await expect(page.locator('.project-container')).toHaveCount(3);

    // Verify the first project is the Shipping Container Project
    await expect(page.getByRole('heading', { name: 'Shipping Container Project' })).toBeVisible();

    // Verify project images are displayed
    await expect(page.locator('.project-image img')).toHaveCount(3);

    // Verify the alternating layout (first and third projects should not have 'reverse' class)
    await expect(page.locator('.project-container').first()).not.toHaveClass(/reverse/);
    await expect(page.locator('.project-container').nth(1)).toHaveClass(/reverse/);
    await expect(page.locator('.project-container').nth(2)).not.toHaveClass(/reverse/);

    // Verify the background thread is present
    await expect(page.locator('.background-thread')).toBeVisible();
});

test('projects page - responsive design', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 480, height: 800 });

    // Navigate to the projects page
    await page.goto('/projects');

    // Verify that all project containers have column layout on mobile
    const projectContainers = await page.locator('.project-container').all();
    for (const container of projectContainers) {
        // Check computed style to verify column layout
        const flexDirection = await container.evaluate((el) => {
            return window.getComputedStyle(el).flexDirection;
        });
        expect(flexDirection).toBe('column');
    }
});
