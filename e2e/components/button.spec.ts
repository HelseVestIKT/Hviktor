import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Button', () => {
  let componentPage: ComponentPage;

  test.beforeEach(async ({ page }) => {
    componentPage = new ComponentPage(page);
    await componentPage.goto('button');
  });

  test('page loads and renders heading', async () => {
    await expect(componentPage.heading).toHaveText('Button');
  });

  test('variant section renders primary, secondary and tertiary', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Variant"]');
    await expect(section).toBeVisible();

    const buttons = section.locator('button.ds-button');
    await expect(buttons).toHaveCount(3);

    await expect(buttons.nth(0)).toContainText('Primary');
    await expect(buttons.nth(1)).toHaveAttribute('data-variant', 'secondary');
    await expect(buttons.nth(1)).toContainText('Secondary');
    await expect(buttons.nth(2)).toHaveAttribute('data-variant', 'tertiary');
    await expect(buttons.nth(2)).toContainText('Tertiary');
  });

  test('color section renders all color variants', async () => {
    const section = componentPage.getSection('Color');
    await expect(section).toBeVisible();

    const buttons = section.locator('button.ds-button');
    await expect(buttons).toHaveCount(5);

    await expect(buttons.nth(0)).toHaveAttribute('data-color', 'brand1');
    await expect(buttons.nth(1)).toHaveAttribute('data-color', 'brand2');
    await expect(buttons.nth(2)).toHaveAttribute('data-color', 'brand3');
    await expect(buttons.nth(3)).toHaveAttribute('data-color', 'neutral');
    await expect(buttons.nth(4)).toHaveAttribute('data-color', 'danger');
  });

  test('size section renders sm, md and lg', async () => {
    const section = componentPage.getSection('Size');
    await expect(section).toBeVisible();

    const buttons = section.locator('button.ds-button');
    await expect(buttons).toHaveCount(3);

    await expect(buttons.nth(0)).toHaveAttribute('data-size', 'sm');
    await expect(buttons.nth(1)).toHaveAttribute('data-size', 'md');
    await expect(buttons.nth(2)).toHaveAttribute('data-size', 'lg');
  });

  test('varianter section renders icon, loading and fullWidth buttons', async () => {
    const section = componentPage.getSection('Varianter');
    await expect(section).toBeVisible();

    const buttons = section.locator('button.ds-button');
    await expect(buttons).toHaveCount(3);

    // Icon-only button
    await expect(buttons.nth(0)).toHaveAttribute('data-icon', '');

    // Loading button
    await expect(buttons.nth(1)).toHaveAttribute('aria-busy', 'true');
    await expect(buttons.nth(1)).toContainText('Loading');

    // Full-width button
    await expect(buttons.nth(2)).toHaveAttribute('data-fullwidth', '');
    await expect(buttons.nth(2)).toContainText('Full Width');
  });

  test('all buttons have ds-button class', async ({ page }) => {
    const buttons = page.locator('article button.ds-button');
    await expect(buttons.first()).toBeVisible();
    const count = await buttons.count();
    expect(count).toBeGreaterThanOrEqual(10);

    for (let i = 0; i < count; i++) {
      await expect(buttons.nth(i)).toHaveClass(/ds-button/);
    }
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, [], 'article');
  });
});
