import { expect, test } from '@playwright/test';

// Fonten så lenge riktig ut lokalt fordi den var installert som systemfont, uten at
// noe faktisk lastet den. Denne testen fanger at webfonten leveres fra pakken.
test.describe('Tema', () => {
  test('Albert Sans lastes som webfont fra pakken, ikke fra et eksternt CDN', async ({ page }) => {
    const fontRequests: string[] = [];
    page.on('request', (req) => {
      if (req.resourceType() === 'font') fontRequests.push(req.url());
    });

    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);

    const loadedFonts = await page.evaluate(() =>
      [...document.fonts].filter((font) => font.status === 'loaded').map((font) => font.family),
    );

    expect(loadedFonts).toContain('Albert Sans Variable');
    expect(fontRequests.length).toBeGreaterThan(0);

    const appOrigin = new URL(page.url()).origin;
    expect(fontRequests.filter((url) => new URL(url).origin !== appOrigin)).toEqual([]);
  });
});
