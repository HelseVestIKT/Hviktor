import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('ErrorSummary', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('error-summary');
  });

  test('manual mode renders summary links with expected attributes', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Manuell modus"]');
    const summary = section.locator('ds-error-summary.ds-error-summary');
    const firstLink = section.locator('a.ds-link').first();

    await expect(summary).toBeVisible();
    await expect(firstLink).toBeVisible();
    await expect(firstLink).toHaveAttribute('data-color', 'neutral');
    await expect(firstLink).toHaveAttribute('href', '#fodselsdato');
  });

  test('form mode summary link moves focus to the related field', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Bruk i skjema"]');
    const firstLink = section.locator('ds-error-summary a.ds-link').first();
    const fornavnInput = section.locator('#fornavn');

    await expect(firstLink).toBeVisible();
    await firstLink.click();
    await expect(fornavnInput).toBeFocused();
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
