import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Avatar', () => {
  let componentPage: ComponentPage;

  test.beforeEach(async ({ page }) => {
    componentPage = new ComponentPage(page);
    await componentPage.goto('avatar');
  });

  test('page loads and renders heading', async () => {
    await expect(componentPage.heading).toHaveText('Avatar');
  });

  test('variants section shows circle, square and initials avatars', async () => {
    const section = componentPage.getSection('Varianter');
    await expect(section).toBeVisible();

    const avatars = section.locator('hvi-avatar');
    await expect(avatars).toHaveCount(3);

    // Default (circle) avatar
    await expect(avatars.nth(0)).toBeVisible();
    await expect(avatars.nth(0)).toHaveAttribute('role', 'img');
    await expect(avatars.nth(0)).toHaveAttribute('aria-label', 'Erlend Johnsen');

    // Square variant
    await expect(avatars.nth(1)).toHaveAttribute('data-variant', 'square');

    // With initials
    await expect(avatars.nth(2)).toHaveAttribute('data-initials', 'EJ');
  });

  test('sizes section shows xs, sm, md and lg', async () => {
    const section = componentPage.getSection('Størrelser');
    await expect(section).toBeVisible();

    const avatars = section.locator('hvi-avatar');
    await expect(avatars).toHaveCount(4);

    await expect(avatars.nth(0)).toHaveAttribute('data-size', 'xs');
    await expect(avatars.nth(1)).toHaveAttribute('data-size', 'sm');
    await expect(avatars.nth(2)).toHaveAttribute('data-size', 'md');
    await expect(avatars.nth(3)).toHaveAttribute('data-size', 'lg');
  });

  test('avatar in button section renders avatar inside button', async () => {
    const section = componentPage.getSection('I knapp');
    await expect(section).toBeVisible();

    const button = section.locator('button[hvibutton]');
    await expect(button).toBeVisible();

    const avatar = button.locator('hvi-avatar');
    await expect(avatar).toBeVisible();
    await expect(avatar).toHaveAttribute('data-initials', 'EJ');
  });

  test('all avatars have role="img" and ds-avatar class', async ({ page }) => {
    const avatars = page.locator('hvi-avatar');
    const count = await avatars.count();
    expect(count).toBeGreaterThanOrEqual(3);

    for (let i = 0; i < count; i++) {
      await expect(avatars.nth(i)).toHaveAttribute('role', 'img');
      await expect(avatars.nth(i)).toHaveClass(/ds-avatar/);
    }
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page);
  });
});
