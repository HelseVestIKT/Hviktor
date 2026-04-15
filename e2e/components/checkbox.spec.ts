import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Checkbox', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('checkbox');
  });

  test('simple checkbox renders with ds-input class and can be toggled', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Enkel checkbox"]');
    const checkbox = section.locator('input[type="checkbox"]');

    await expect(checkbox).toHaveClass(/ds-input/);
    await expect(checkbox).not.toBeChecked();
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  });

  test('confirmation section renders checkbox inside ds-fieldset', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Bekrefting med checkbox"]');
    await expect(section.locator('fieldset.ds-fieldset')).toBeVisible();
    await expect(section.locator('input[type="checkbox"]')).toBeVisible();
  });

  test('grouping section renders checkboxes with shared name attribute', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Gruppering"]');
    await expect(section.locator('input[name="kontakt"]').first()).toBeVisible();
  });

  test('error section shows validation message', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Med feil"]');
    await expect(section.locator('.ds-validation-message')).toBeVisible();
  });

  test('readonly checkbox stays checked after click', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Skrivebeskyttet (readonly)"]');
    const checkbox = section.locator('input[readonly]').first();

    await expect(checkbox).toBeChecked();
    await checkbox.click({ force: true });
    await expect(checkbox).toBeChecked();
  });

  test('disabled section has disabled checkboxes', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Disabled"]');
    await expect(section.locator('input[type="checkbox"]:disabled').first()).toBeVisible();
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
