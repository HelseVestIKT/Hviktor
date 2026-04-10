import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Chip', () => {
  let componentPage: ComponentPage;

  test.beforeEach(async ({ page }) => {
    componentPage = new ComponentPage(page);
    await componentPage.goto('chip');
  });

  test('page loads and renders heading', async () => {
    await expect(componentPage.heading).toHaveText('Chip');
  });

  test('radio section renders radio chips', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Radio"]');
    await expect(section).toBeVisible();

    const chips = section.locator('label.ds-chip');
    await expect(chips).toHaveCount(2);

    const radios = section.locator('input[type="radio"]');
    await expect(radios).toHaveCount(2);
  });

  test('checkbox section renders checkbox chip', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Checkbox"]');
    await expect(section).toBeVisible();

    const chip = section.locator('label.ds-chip');
    await expect(chip).toHaveCount(1);

    const checkbox = section.locator('input[type="checkbox"]');
    await expect(checkbox).toHaveCount(1);
  });

  test('button section renders button chip', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Button"]');
    await expect(section).toBeVisible();

    const chip = section.locator('button.ds-chip');
    await expect(chip).toHaveCount(1);
    await expect(chip).toContainText('Tøm alle filtre');
  });

  test('removable section renders removable chip', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Button (removable)"]');
    await expect(section).toBeVisible();

    const chip = section.locator('button.ds-chip');
    await expect(chip).toHaveCount(1);
    await expect(chip).toHaveAttribute('data-removable', 'true');
  });

  test('passes accessibility checks', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
