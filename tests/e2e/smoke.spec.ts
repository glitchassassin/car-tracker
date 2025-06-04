import { test, expect } from '@playwright/test';

test.describe('Car Tracker - Smoke Tests', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Check that the page title is correct
    await expect(page).toHaveTitle('Car Tracker');
    
    // Check that at least one React Router logo is visible (light or dark mode)
    await expect(page.locator('img[alt="React Router"]').first()).toBeVisible();
    
    // Check that the "What's next?" text is present
    await expect(page.getByText("What's next?")).toBeVisible();
    
    // Verify navigation links are present
    await expect(page.getByRole('link', { name: 'React Router Docs' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Join Discord' })).toBeVisible();
    
    // Check that the message from Cloudflare is displayed
    await expect(page.locator('text=/Hello from Cloudflare/i')).toBeVisible();
  });

  test('should have proper meta description', async ({ page }) => {
    await page.goto('/');
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', 'Car Tracker');
  });

  test('should have responsive design', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    await expect(page.getByText("What's next?")).toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await expect(page.getByText("What's next?")).toBeVisible();
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    await expect(page.getByText("What's next?")).toBeVisible();
  });

  test('should have working external links', async ({ page, context }) => {
    await page.goto('/');
    
    // Check React Router Docs link
    const docsLink = page.getByRole('link', { name: 'React Router Docs' });
    await expect(docsLink).toHaveAttribute('href', 'https://reactrouter.com/docs');
    await expect(docsLink).toHaveAttribute('target', '_blank');
    await expect(docsLink).toHaveAttribute('rel', 'noreferrer');
    
    // Check Discord link
    const discordLink = page.getByRole('link', { name: 'Join Discord' });
    await expect(discordLink).toHaveAttribute('href', 'https://rmx.as/discord');
    await expect(discordLink).toHaveAttribute('target', '_blank');
    await expect(discordLink).toHaveAttribute('rel', 'noreferrer');
  });

  test('should handle dark mode styling', async ({ page }) => {
    await page.goto('/');
    
    // Test light mode image is visible by default
    const lightLogo = page.locator('img[alt="React Router"].block');
    await expect(lightLogo).toBeVisible();
    
    // Simulate dark mode by adding dark class to html
    await page.addStyleTag({ content: 'html { color-scheme: dark; }' });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    
    // Wait a moment for styles to apply
    await page.waitForTimeout(100);
    
    // The dark mode image should now be visible (this test verifies the CSS classes exist)
    const darkLogo = page.locator('img[alt="React Router"].dark\\:block');
    await expect(darkLogo).toBeAttached();
  });
}); 