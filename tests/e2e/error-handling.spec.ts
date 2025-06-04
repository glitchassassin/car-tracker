import { test, expect } from '@playwright/test';

test.describe('Error Handling', () => {
  test('should display 404 page for non-existent routes', async ({ page }) => {
    const response = await page.goto('/non-existent-page');
    expect(response?.status()).toBe(404);
    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByText('The requested page could not be found.')).toBeVisible();
  });

  test('should have proper error boundary structure', async ({ page }) => {
    await page.goto('/non-existent-page');
    
    // Check that the error is displayed within the main container
    const mainContainer = page.locator('main.pt-16.p-4.container.mx-auto');
    await expect(mainContainer).toBeVisible();
    
    // Check that the error message is within the container
    await expect(mainContainer.getByText('404')).toBeVisible();
    await expect(mainContainer.getByText('The requested page could not be found.')).toBeVisible();
  });

  test('should maintain consistent styling on error pages', async ({ page }) => {
    await page.goto('/non-existent-page');
    
    // Check that the page still has the proper HTML structure
    await expect(page.locator('html[lang="en"]')).toBeVisible();
    await expect(page.locator('meta[charset="utf-8"]')).toBeAttached();
    await expect(page.locator('meta[name="viewport"]')).toBeAttached();
    
    // Verify that the main container has the expected CSS classes
    const mainContainer = page.locator('main');
    await expect(mainContainer).toHaveClass(/pt-16/);
    await expect(mainContainer).toHaveClass(/p-4/);
    await expect(mainContainer).toHaveClass(/container/);
    await expect(mainContainer).toHaveClass(/mx-auto/);
  });
}); 