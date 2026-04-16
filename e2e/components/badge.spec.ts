import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Badge', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('badge');
  });

  test('reflects base variant as data-variant attribute in browser', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Base variant"]');
    await expect(section).toBeVisible();
    await expect(
      section.locator('hvi-badge[data-variant="base"][data-count="9+"]').first(),
    ).toBeVisible();
  });

  test('reflects tinted variant as data-variant attribute in browser', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Tinted variant"]');
    await expect(section).toBeVisible();
    await expect(section.locator('hvi-badge[data-variant="tinted"]').first()).toBeVisible();
  });

  test('status indicator renders badge without count', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Status indikator"]');
    await expect(section).toBeVisible();
    const badge = section.locator('hvi-badge[data-color="success"]');
    await expect(badge).toBeVisible();
    await expect(badge).not.toHaveAttribute('data-count');
  });

  test('positioning section renders badge inside badge-position with correct attributes', async ({
    page,
  }) => {
    const section = page.locator('app-demo-section[title="Med posisjonering"]');
    await expect(section).toBeVisible();
    const position = section.locator('hvi-badge-position[data-placement="top-left"]');
    await expect(position).toBeVisible();
    await expect(position.locator('hvi-badge[data-count="3"][data-color="danger"]')).toBeAttached();
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
