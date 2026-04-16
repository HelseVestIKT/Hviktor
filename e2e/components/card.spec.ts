import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Card', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('card');
  });

  test('standard section renders a card', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Standard"]');
    await expect(section.locator('hvi-card')).toBeVisible();
  });

  test('colors and variants section applies data-variant and data-color attributes', async ({
    page,
  }) => {
    const section = page.locator('app-demo-section[title="Farger og varianter"]');
    await expect(section.locator('hvi-card[data-variant="default"]').first()).toBeVisible();
    await expect(section.locator('hvi-card[data-variant="tinted"]').first()).toBeVisible();
    await expect(section.locator('hvi-card[data-color]').first()).toBeVisible();
  });

  test('sections section renders card blocks', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Med inndeling"]');
    await expect(section.locator('.ds-card__block').first()).toBeVisible();
  });

  test('link card section has a card containing a link', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Lenkekort"]');
    await expect(section.locator('hvi-card a').first()).toBeVisible();
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
