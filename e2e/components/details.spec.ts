import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Details', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('details');
  });

  test('varianter section renders tinted and default data-variant attributes', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Varianter"]');
    await expect(section.locator('u-details[data-variant="tinted"]')).toBeVisible();
    await expect(section.locator('u-details[data-variant="default"]')).toBeVisible();
  });

  test('varianter section details expand on click', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Varianter"]');
    const firstDetails = section.locator('u-details').first();
    const summary = firstDetails.locator('u-summary');

    await expect(firstDetails).not.toHaveAttribute('open');
    await summary.click();
    await expect(firstDetails).toHaveAttribute('open');
  });

  test('i kort section has a pre-opened details panel', async ({ page }) => {
    const section = page.locator('app-demo-section[title="I kort"]');
    await expect(section.locator('u-details[open]')).toBeVisible();
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
