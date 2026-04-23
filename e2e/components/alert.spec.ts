import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Alert', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('alert');
  });

  test('reflects color input as data-color attribute in browser', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Varianter"]');
    await expect(section).toBeVisible();
    await expect(section.locator('hvi-alert[data-color="success"]')).toBeVisible();
    await expect(section.locator('hvi-alert[data-color="warning"]')).toBeVisible();
    await expect(section.locator('hvi-alert[data-color="danger"]')).toBeVisible();
  });

  test('projects rich content', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Heading og paragraph"]');
    await expect(section).toBeVisible();
    const alert = section.locator('hvi-alert').first();
    await expect(alert.locator('h2')).toBeVisible();
    await expect(alert.locator('p')).toBeVisible();
  });

  test('applies accessibility defaults and allows override', async ({ page }) => {
    const variantsSection = page.locator('app-demo-section[title="Varianter"]');
    await expect(variantsSection.locator('hvi-alert').first()).toHaveAttribute('role', 'status');
    await expect(variantsSection.locator('hvi-alert').first()).toHaveAttribute(
      'aria-live',
      'polite',
    );

    await expect(variantsSection.locator('hvi-alert[data-color="warning"]')).toHaveAttribute(
      'role',
      'status',
    );
    await expect(variantsSection.locator('hvi-alert[data-color="warning"]')).toHaveAttribute(
      'aria-live',
      'polite',
    );

    await expect(variantsSection.locator('hvi-alert[data-color="danger"]')).toHaveAttribute(
      'role',
      'alert',
    );
    await expect(variantsSection.locator('hvi-alert[data-color="danger"]')).not.toHaveAttribute(
      'aria-live',
      /.+/,
    );

    const a11ySection = page.locator(
      'app-demo-section[title="Tilgjengelighet (standard og overstyring)"]',
    );
    await expect(a11ySection.locator('hvi-alert').nth(2)).toHaveAttribute('role', 'status');
    await expect(a11ySection.locator('hvi-alert').nth(2)).toHaveAttribute('aria-live', 'polite');
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
