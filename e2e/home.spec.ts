
import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the home page correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Car Tracker/);

    // Check if at least one logo is visible (light or dark mode)
    const lightLogo = page.locator('img[alt="React Router"].block');
    const darkLogo = page.locator('img[alt="React Router"].hidden');

    await expect(lightLogo).toBeVisible({ timeout: 3000 });
    // If light logo is not visible, check dark logo
    if (!(await lightLogo.isVisible())) {
      await expect(darkLogo).toBeVisible({ timeout: 3000 });
    }

    // Check if the message is displayed
    const message = page.locator('p:has-text("What\'s next?")');
    await expect(message).toBeVisible();

    const messageList = page.locator('ul > li').last();
    await expect(messageList).toBeVisible();
  });

  test('should display links in the navigation', async ({ page }) => {
    await page.goto('/');

    // Check React Router Docs link
    const docsLink = page.locator('a >> text=React Router Docs');
    await expect(docsLink).toBeVisible();

    // Check Discord link
    const discordLink = page.locator('a >> text=Join Discord');
    await expect(discordLink).toBeVisible();
  });

  test('should navigate to external links', async ({ page, context }) => {
    await page.goto('/');

    // Open React Router Docs link in a new tab
    const [docsPage] = await Promise.all([
      context.waitForEvent('page'),
      page.locator('a >> text=React Router Docs').click(),
    ]);

    // Check if the new tab has loaded a URL
    await expect(docsPage.url()).toContain('reactrouter.com');

    await docsPage.close();
  });
});
