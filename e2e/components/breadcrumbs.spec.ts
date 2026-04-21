import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Breadcrumbs', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('breadcrumbs');
  });

  test('renders as navigation landmark', async ({ page }) => {
    const breadcrumbs = page.locator('ds-breadcrumbs').first();
    await expect(breadcrumbs).toBeVisible();
    await expect(breadcrumbs).toHaveAttribute('role', 'navigation');
  });

  test('renders back link on narrow viewport', async ({ page }) => {
    await page.setViewportSize({ width: 400, height: 800 });
    const backLink = page.locator('ds-breadcrumbs > a').first();
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveAttribute('aria-label', 'Tilbake til Nivå 3');
  });

  test('renders breadcrumb list items', async ({ page }) => {
    const items = page.locator('ds-breadcrumbs ol > li');
    await expect(items.first()).toBeVisible();
    await expect(items.first()).toContainText('Nivå 1');
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
