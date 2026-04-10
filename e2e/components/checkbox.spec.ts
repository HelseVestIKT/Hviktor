import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Checkbox', () => {
  let componentPage: ComponentPage;

  test.beforeEach(async ({ page }) => {
    componentPage = new ComponentPage(page);
    await componentPage.goto('checkbox');
  });

  test('page loads and renders heading', async () => {
    await expect(componentPage.heading).toHaveText('Checkbox');
  });

  test('simple checkbox section renders a checkbox with label', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Enkel checkbox"]');
    await expect(section).toBeVisible();

    const checkbox = section.locator('input[type="checkbox"]');
    await expect(checkbox).toBeVisible();
    await expect(checkbox).toHaveClass(/ds-input/);

    const label = section.locator('label');
    await expect(label).toContainText('Checkbox label');
  });

  test('simple checkbox can be toggled', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Enkel checkbox"]');
    const checkbox = section.locator('input[type="checkbox"]');

    await expect(checkbox).not.toBeChecked();
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  });

  test('confirmation section renders checkbox in fieldset', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Bekrefting med checkbox"]');
    await expect(section).toBeVisible();

    const fieldset = section.locator('fieldset');
    await expect(fieldset).toBeVisible();
    await expect(fieldset).toHaveClass(/ds-fieldset/);

    const legend = fieldset.locator('legend');
    await expect(legend).toContainText('Bekreft at du er over 18');

    const checkbox = fieldset.locator('input[type="checkbox"]');
    await expect(checkbox).toBeVisible();
  });

  test('grouping section renders multiple checkboxes in fieldset', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Gruppering"]');
    await expect(section).toBeVisible();

    const checkboxes = section.locator('input[type="checkbox"]');
    await expect(checkboxes).toHaveCount(3);

    // All should have the same name for grouping
    for (let i = 0; i < 3; i++) {
      await expect(checkboxes.nth(i)).toHaveAttribute('name', 'kontakt');
    }
  });

  test('error section shows validation message', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Med feil"]');
    await expect(section).toBeVisible();

    const validationText = section.locator('.ds-validation-message', {
      hasText: 'Du må velge minst to alternativ',
    });
    await expect(validationText).toBeVisible();
  });

  test('readonly section has readonly checkboxes', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Skrivebeskyttet (readonly)"]');
    await expect(section).toBeVisible();

    const checkboxes = section.locator('input[type="checkbox"]');
    await expect(checkboxes).toHaveCount(3);

    // All should have readonly attribute
    for (let i = 0; i < 3; i++) {
      await expect(checkboxes.nth(i)).toHaveAttribute('readonly', '');
    }

    // First one should be checked and remain checked after click
    await expect(checkboxes.first()).toBeChecked();
    await checkboxes.first().click({ force: true });
    await expect(checkboxes.first()).toBeChecked();
  });

  test('disabled section has disabled checkboxes', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Disabled"]');
    await expect(section).toBeVisible();

    const checkboxes = section.locator('input[type="checkbox"]');
    await expect(checkboxes).toHaveCount(3);

    for (let i = 0; i < 3; i++) {
      await expect(checkboxes.nth(i)).toBeDisabled();
    }
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
