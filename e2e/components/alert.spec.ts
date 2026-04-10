import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Alert', () => {
  let componentPage: ComponentPage;

  test.beforeEach(async ({ page }) => {
    componentPage = new ComponentPage(page);
    await componentPage.goto('alert');
  });

  test('page loads and renders heading', async () => {
    await expect(componentPage.heading).toHaveText('Alert');
  });

  test('renders all color variants', async ({ page }) => {
    const alerts = page.locator('hvi-alert');
    await expect(alerts.first()).toBeVisible();
    const count = await alerts.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('variants section shows info, success, warning and danger', async () => {
    const section = componentPage.getSection('Varianter');
    await expect(section).toBeVisible();

    await expect(section.locator('hvi-alert').nth(0)).toContainText('info');
    await expect(section.locator('hvi-alert').nth(1)).toContainText('success');
    await expect(section.locator('hvi-alert').nth(2)).toContainText('warning');
    await expect(section.locator('hvi-alert').nth(3)).toContainText('danger');
  });

  test('heading and paragraph section renders rich content', async () => {
    const section = componentPage.getSection('Heading og paragraph');
    await expect(section).toBeVisible();

    const alert = section.locator('hvi-alert').first();
    await expect(alert.locator('h2')).toBeVisible();
    await expect(alert.locator('p')).toBeVisible();
  });

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
