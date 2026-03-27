import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Badge', () => {
  let componentPage: ComponentPage;

  test.beforeEach(async ({ page }) => {
    componentPage = new ComponentPage(page);
    await componentPage.goto('badge');
  });

  test('page loads and renders heading', async () => {
    await expect(componentPage.heading).toHaveText('Badge');
  });

  test('base variant section renders badges with correct attributes', async () => {
    const section = componentPage.getSection('Base variant');
    await expect(section).toBeVisible();

    const badges = section.locator('hvi-badge');
    await expect(badges).toHaveCount(8);

    // All should have base variant
    for (let i = 0; i < 8; i++) {
      await expect(badges.nth(i)).toHaveAttribute('data-variant', 'base');
      await expect(badges.nth(i)).toHaveAttribute('data-count', '9+');
      await expect(badges.nth(i)).toHaveClass(/ds-badge/);
    }
  });

  test('tinted variant section renders badges with tinted variant', async () => {
    const section = componentPage.getSection('Tinted variant');
    await expect(section).toBeVisible();

    const badges = section.locator('hvi-badge');
    await expect(badges).toHaveCount(8);

    for (let i = 0; i < 8; i++) {
      await expect(badges.nth(i)).toHaveAttribute('data-variant', 'tinted');
    }
  });

  test('status indicator section renders badge without count', async () => {
    const section = componentPage.getSection('Status indikator');
    await expect(section).toBeVisible();

    const badge = section.locator('hvi-badge');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveAttribute('data-color', 'success');
    await expect(badge).not.toHaveAttribute('data-count');
  });

  test('positioning section renders badge inside badge-position', async () => {
    const section = componentPage.getSection('Med posisjonering');
    await expect(section).toBeVisible();

    const position = section.locator('hvi-badge-position');
    await expect(position).toBeVisible();
    await expect(position).toHaveClass(/ds-badge--position/);
    await expect(position).toHaveAttribute('data-placement', 'top-left');

    const badge = position.locator('hvi-badge');
    await expect(badge).toHaveAttribute('data-count', '3');
    await expect(badge).toHaveAttribute('data-color', 'danger');
  });

  test('accessibility check', async ({ page }) => {
    await expect(componentPage.heading).toBeVisible();
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
