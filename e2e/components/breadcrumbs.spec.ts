import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Breadcrumbs', () => {
  let componentPage: ComponentPage;

  test.beforeEach(async ({ page }) => {
    componentPage = new ComponentPage(page);
    await componentPage.goto('breadcrumbs');
  });

  test('page loads and renders heading', async () => {
    await expect(componentPage.heading).toHaveText('Breadcrumbs');
  });

  test('standard section is visible', async () => {
    const section = componentPage.getSection('Standard');
    await expect(section).toBeVisible();
  });

  test('renders ds-breadcrumbs web component', async ({ page }) => {
    const breadcrumbs = page.locator('ds-breadcrumbs');
    await expect(breadcrumbs.first()).toBeVisible();
  });

  test('renders back link', async ({ page }) => {
    const backLink = page.locator('ds-breadcrumbs > a').first();
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveText('Nivå 3');
    await expect(backLink).toHaveAttribute('aria-label', 'Tilbake til Nivå 3');
  });

  test('renders breadcrumb list with items', async ({ page }) => {
    const items = page.locator('ds-breadcrumbs ol > li');
    await expect(items).toHaveCount(4);
    await expect(items.first()).toContainText('Nivå 1');
    await expect(items.last()).toContainText('Nivå 4');
  });

  test('breadcrumbs has correct aria-label', async ({ page }) => {
    const breadcrumbs = page.locator('ds-breadcrumbs').first();
    await expect(breadcrumbs).toHaveAttribute('aria-label', 'Du er her:');
  });

  test('accessibility check', async ({ page }) => {
    await expect(componentPage.heading).toBeVisible();
    await checkAccessibility(page, [], 'article');
  });
});
