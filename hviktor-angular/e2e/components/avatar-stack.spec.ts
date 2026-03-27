import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('AvatarStack', () => {
  let componentPage: ComponentPage;

  test.beforeEach(async ({ page }) => {
    componentPage = new ComponentPage(page);
    await componentPage.goto('avatar-stack');
  });

  test('page loads and renders heading', async () => {
    await expect(componentPage.heading).toHaveText('AvatarStack');
  });

  test('standard stack section renders avatars inside stack', async () => {
    const section = componentPage.getSection('Standard Avatar Stack');
    await expect(section).toBeVisible();

    const stack = section.locator('figure[hviavatarstack]');
    await expect(stack).toBeVisible();
    await expect(stack).toHaveClass(/ds-avatar-stack/);

    const avatars = stack.locator('hvi-avatar');
    await expect(avatars).toHaveCount(3);
  });

  test('suffix section renders data-suffix attribute', async () => {
    const section = componentPage.getSection('Med suffix');
    await expect(section).toBeVisible();

    const stack = section.locator('figure[hviavatarstack]');
    await expect(stack).toHaveAttribute('data-suffix', '+4');
  });

  test('expandable section renders data-expandable attribute', async () => {
    const section = componentPage.getSection('Expandable');
    await expect(section).toBeVisible();

    const stack = section.locator('figure[hviavatarstack]');
    await expect(stack).toHaveAttribute('data-expandable', 'true');
  });

  test('all stacks have ds-avatar-stack class', async () => {
    const article = componentPage.article;
    const stacks = article.locator('figure[hviavatarstack]');
    await expect(stacks.first()).toBeVisible();
    const count = await stacks.count();
    expect(count).toBeGreaterThanOrEqual(3);

    for (let i = 0; i < count; i++) {
      await expect(stacks.nth(i)).toHaveClass(/ds-avatar-stack/);
    }
  });

  test('accessibility check', async ({ page }) => {
    await expect(componentPage.heading).toBeVisible();
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
