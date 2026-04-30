import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Dropdown', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('dropdown');
  });

  test('opens and closes standard dropdown from trigger and Escape', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Standard"]');
    const trigger = section.getByRole('button', { name: 'Åpne dropdown' });
    const dropdown = section.locator('hvi-dropdown#dropdown1');

    await expect(section).toBeVisible();
    await expect(dropdown).not.toBeVisible();

    await trigger.click();
    await expect(dropdown).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dropdown).not.toBeVisible();
  });

  test('maps dropdownPlacement to data-placement in placement examples', async ({ page }) => {
    const section = page.locator(
      'app-demo-section[title="Med dropdownPlacement kan man definere ulike plasseringer"]',
    );

    await expect(section).toBeVisible();
    await expect(section.locator('hvi-dropdown#dropdown2')).toHaveAttribute(
      'data-placement',
      'top',
    );
    await expect(section.locator('hvi-dropdown#left')).toHaveAttribute('data-placement', 'left');
    await expect(section.locator('hvi-dropdown#right')).toHaveAttribute('data-placement', 'right');
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
