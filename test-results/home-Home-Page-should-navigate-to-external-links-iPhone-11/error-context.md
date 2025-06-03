# Test info

- Name: Home Page >> should navigate to external links
- Location: /workspace/e2e/home.spec.ts:39:3

# Error details

```
Error: browserType.launch:
╔══════════════════════════════════════════════════════╗
║ Host system is missing dependencies to run browsers. ║
║ Missing libraries:                                   ║
║     libgstreamer-1.0.so.0                            ║
║     libgtk-4.so.1                                    ║
║     libgraphene-1.0.so.0                             ║
║     libwoff2dec.so.1.0.2                             ║
║     libgstallocators-1.0.so.0                        ║
║     libgstapp-1.0.so.0                               ║
║     libgstbase-1.0.so.0                              ║
║     libgstpbutils-1.0.so.0                           ║
║     libgstaudio-1.0.so.0                             ║
║     libgsttag-1.0.so.0                               ║
║     libgstvideo-1.0.so.0                             ║
║     libgstgl-1.0.so.0                                ║
║     libgstcodecparsers-1.0.so.0                      ║
║     libgstfft-1.0.so.0                               ║
║     libflite.so.1                                    ║
║     libflite_usenglish.so.1                          ║
║     libflite_cmu_grapheme_lang.so.1                  ║
║     libflite_cmu_grapheme_lex.so.1                   ║
║     libflite_cmu_indic_lang.so.1                     ║
║     libflite_cmu_indic_lex.so.1                      ║
║     libflite_cmulex.so.1                             ║
║     libflite_cmu_time_awb.so.1                       ║
║     libflite_cmu_us_awb.so.1                         ║
║     libflite_cmu_us_kal16.so.1                       ║
║     libflite_cmu_us_kal.so.1                         ║
║     libflite_cmu_us_rms.so.1                         ║
║     libflite_cmu_us_slt.so.1                         ║
║     libavif.so.15                                    ║
║     libharfbuzz-icu.so.0                             ║
║     libepoxy.so.0                                    ║
║     libenchant-2.so.2                                ║
║     libsecret-1.so.0                                 ║
║     libhyphen.so.0                                   ║
║     libwayland-egl.so.1                              ║
║     libwayland-client.so.0                           ║
║     libmanette-0.2.so.0                              ║
║     libGLESv2.so.2                                   ║
╚══════════════════════════════════════════════════════╝
```

# Test source

```ts
   1 |
   2 | import { test, expect } from '@playwright/test';
   3 |
   4 | test.describe('Home Page', () => {
   5 |   test('should display the home page correctly', async ({ page }) => {
   6 |     await page.goto('/');
   7 |     await expect(page).toHaveTitle(/Car Tracker/);
   8 |
   9 |     // Check if at least one logo is visible (light or dark mode)
  10 |     const lightLogo = page.locator('img[alt="React Router"].block');
  11 |     const darkLogo = page.locator('img[alt="React Router"].hidden');
  12 |
  13 |     await expect(lightLogo).toBeVisible({ timeout: 3000 });
  14 |     // If light logo is not visible, check dark logo
  15 |     if (!(await lightLogo.isVisible())) {
  16 |       await expect(darkLogo).toBeVisible({ timeout: 3000 });
  17 |     }
  18 |
  19 |     // Check if the message is displayed
  20 |     const message = page.locator('p:has-text("What\'s next?")');
  21 |     await expect(message).toBeVisible();
  22 |
  23 |     const messageList = page.locator('ul > li').last();
  24 |     await expect(messageList).toBeVisible();
  25 |   });
  26 |
  27 |   test('should display links in the navigation', async ({ page }) => {
  28 |     await page.goto('/');
  29 |
  30 |     // Check React Router Docs link
  31 |     const docsLink = page.locator('a >> text=React Router Docs');
  32 |     await expect(docsLink).toBeVisible();
  33 |
  34 |     // Check Discord link
  35 |     const discordLink = page.locator('a >> text=Join Discord');
  36 |     await expect(discordLink).toBeVisible();
  37 |   });
  38 |
> 39 |   test('should navigate to external links', async ({ page, context }) => {
     |   ^ Error: browserType.launch:
  40 |     await page.goto('/');
  41 |
  42 |     // Open React Router Docs link in a new tab
  43 |     const [docsPage] = await Promise.all([
  44 |       context.waitForEvent('page'),
  45 |       page.locator('a >> text=React Router Docs').click(),
  46 |     ]);
  47 |
  48 |     // Check if the new tab has loaded a URL
  49 |     await expect(docsPage.url()).toContain('reactrouter.com');
  50 |
  51 |     await docsPage.close();
  52 |   });
  53 | });
  54 |
```
