import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Button', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('button');
  });

  test('reflects variant input as data-variant attribute in browser', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Variant"]');
    await expect(section).toBeVisible();
    await expect(section.locator('button[data-variant="secondary"]')).toBeVisible();
    await expect(section.locator('button[data-variant="tertiary"]')).toBeVisible();
  });

  test('reflects color input as data-color attribute in browser', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Color"]');
    await expect(section).toBeVisible();
    await expect(section.locator('button[data-color="danger"]')).toBeVisible();
    await expect(section.locator('button[data-color="neutral"]')).toBeVisible();
  });

  test('reflects size input as data-size attribute in browser', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Size"]');
    await expect(section).toBeVisible();
    await expect(section.locator('button[data-size="sm"]')).toBeVisible();
    await expect(section.locator('button[data-size="lg"]')).toBeVisible();
  });

  test('renders icon, loading and fullWidth button variants', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Varianter"]');
    await expect(section).toBeVisible();
    await expect(section.locator('button[data-icon]')).toBeVisible();
    await expect(section.locator('button[aria-busy="true"]')).toBeVisible();
    await expect(section.locator('button[data-fullwidth]')).toBeVisible();
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
