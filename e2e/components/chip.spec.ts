import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Chip', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('chip');
  });

  test('radio section renders label chips with radio inputs', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Radio"]');
    await expect(section.locator('label.ds-chip').first()).toBeVisible();
    await expect(section.locator('input[type="radio"]').first()).toBeVisible();
  });

  test('checkbox section renders label chip with checkbox input', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Checkbox"]');
    await expect(section.locator('label.ds-chip')).toBeVisible();
    await expect(section.locator('input[type="checkbox"]')).toBeVisible();
  });

  test('button section renders a button chip', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Button"]');
    await expect(section.locator('button.ds-chip')).toBeVisible();
  });

  test('removable section renders chip with data-removable attribute', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Button (removable)"]');
    await expect(section.locator('button.ds-chip[data-removable="true"]')).toBeVisible();
  });

  test('passes accessibility checks', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
