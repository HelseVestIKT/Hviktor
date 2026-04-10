import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Card', () => {
  let componentPage: ComponentPage;

  test.beforeEach(async ({ page }) => {
    componentPage = new ComponentPage(page);
    await componentPage.goto('card');
  });

  test('page loads and renders heading', async () => {
    await expect(componentPage.heading).toHaveText('Card');
  });

  test('standard section renders a card with ds-card class', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Standard"]');
    await expect(section).toBeVisible();

    const card = section.locator('hvi-card');
    await expect(card).toBeVisible();
    await expect(card).toHaveClass(/ds-card/);
    await expect(card).toContainText('Lykkeland Barneskole');
  });

  test('colors and variants section renders default and tinted cards', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Farger og varianter"]');
    await expect(section).toBeVisible();

    const cards = section.locator('hvi-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(4);

    // Check that both variants exist
    await expect(section.locator('hvi-card[data-variant="default"]').first()).toBeVisible();
    await expect(section.locator('hvi-card[data-variant="tinted"]').first()).toBeVisible();

    // Check color attributes
    await expect(cards.first()).toHaveAttribute('data-color');
  });

  test('sections section renders card blocks with ds-card__block class', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Med inndeling"]');
    await expect(section).toBeVisible();

    const blocks = section.locator('.ds-card__block');
    const count = await blocks.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('link card section renders card with link inside', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Lenkekort"]');
    await expect(section).toBeVisible();

    const card = section.locator('hvi-card').first();
    await expect(card).toBeVisible();

    const link = card.locator('a');
    await expect(link).toBeVisible();
    await expect(link).toContainText('Myrkheim Museum');
  });

  test('all cards have ds-card class', async ({ page }) => {
    const cards = page.locator('article hvi-card');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(6);

    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i)).toHaveClass(/ds-card/);
    }
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
