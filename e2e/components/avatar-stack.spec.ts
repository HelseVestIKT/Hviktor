import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('AvatarStack', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('avatar-stack');
  });

  test('renders stack with avatars', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Standard Avatar Stack"]');
    await expect(section).toBeVisible();
    await expect(section.locator('hvi-avatar-stack')).toBeVisible();
  });

  test('reflects suffix input as data-suffix attribute in browser', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Med suffix"]');
    await expect(section).toBeVisible();
    await expect(section.locator('hvi-avatar-stack[data-suffix="+4"]')).toBeVisible();
  });

  test('reflects expandable input as data-expandable attribute in browser', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Expandable"]');
    await expect(section).toBeVisible();
    await expect(section.locator('hvi-avatar-stack[data-expandable="true"]')).toBeVisible();
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
