import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Divider', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('divider');
  });

  test('renders divider with ds-divider class and aria-hidden in standard section', async ({
    page,
  }) => {
    const section = page.locator('app-demo-section[title="Standard"]');
    await expect(section).toBeVisible();

    const divider = section.locator('hr.ds-divider').first();
    await expect(divider).toBeVisible();
    await expect(divider).toHaveAttribute('aria-hidden', 'true');
  });

  test('keeps surrounding paragraph content separated by divider', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Standard"]');
    await expect(section.locator('p:has-text("Innhold over skillelinjen")')).toBeVisible();
    await expect(section.locator('hr.ds-divider')).toBeVisible();
    await expect(section.locator('p:has-text("Innhold under skillelinjen")')).toBeVisible();
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
