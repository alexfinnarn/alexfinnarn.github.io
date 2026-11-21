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

  // The motion only runs for visitors who haven't asked for less of it, so say so rather than
  // rely on each browser's default.
  test.use({ viewport: { width: 390, height: 844 }, contextOptions: { reducedMotion: 'no-preference' } });

  test('motion holds until a slow drawing arrives, then the links appear in view', async ({ page }) => {
    // Stop the page's timers so the slow-connection fallback can't fire while the test looks,
    // however long the page takes to load. install() alone fakes the clock but lets it keep
    // running; pausing it holds every timer. CSS animations still run in real time.
    const start = new Date('2026-01-01T00:00:00Z');
    await page.clock.install({ time: start });
    await page.clock.pauseAt(new Date(start.getTime() + 1000));
    // Hold the drawing until the test has checked the waiting state, however slow the server is.
    let release = () => {};
    const released = new Promise<void>((resolve) => (release = resolve));
    await page.route(isDrawing, async (route) => {
      const response = await route.fetch();
      await released;
      await route.fulfill({ response });
    });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const scene = page.locator('[data-forest-scene]');
    await expect(scene).toHaveClass(/waiting/);
    await expect(scene.locator('.tag-first')).toHaveCSS('opacity', '0');

    release();
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

  test('the palette stays out of view', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-forest-scene] [data-palette]')).not.toBeInViewport();
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

// The painter's palette in the forest: its paints draw on the drawing with a mouse or pen.
test.describe('drawing with the palette', () => {
  test('a paint draws, the eraser rubs out, and the X stops drawing', async ({ page }) => {
    await page.goto('/');
    const scene = page.locator('[data-forest-scene]');
    const palette = scene.getByRole('group', { name: 'Paints' });
    const marks = scene.locator('[data-marks] path');
    const box = (await scene.locator('.pan svg').boundingBox())!;

    // Drag across the trees between the name and the links, as fractions of the drawing.
    const drag = async (y: number) => {
      await page.mouse.move(box.x + box.width * 0.3, box.y + box.height * y);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width * 0.42, box.y + box.height * (y + 0.05), { steps: 12 });
      await page.mouse.up();
    };

    // Nothing draws until a paint is picked.
    await drag(0.3);
    await expect(marks).toHaveCount(0);

    const red = palette.getByRole('button', { name: 'Red' });
    await red.click();
    await expect(red).toHaveAttribute('aria-pressed', 'true');
    await drag(0.3);
    await expect(marks).toHaveCount(1);
    // The stroke follows the pointer, not just the point where it started.
    expect((await marks.first().getAttribute('d'))!.split('L').length).toBeGreaterThan(5);

    await palette.getByRole('button', { name: 'Eraser' }).click();
    await drag(0.28);
    await expect(scene.locator('mask path')).toHaveCount(1);

    await palette.getByRole('button', { name: 'Stop drawing' }).click();
    await expect(scene).toHaveAttribute('data-tool', 'off');
    await expect(red).toHaveAttribute('aria-pressed', 'false');
    await drag(0.4);
    await expect(marks).toHaveCount(1);
  });
});
