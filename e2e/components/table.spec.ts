import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Table', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('table');
  });

  // ========== Enkel tabell ==========

  test('simple table section renders a table', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Enkel tabell"]');
    await expect(section.locator('table.ds-table')).toBeVisible();
  });

  // ========== Zebrastriper og border ==========

  test('zebra and border section applies data attributes', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Zebrastriper og border"]');
    const table = section.locator('table.ds-table');
    await expect(table).toHaveAttribute('data-zebra');
    await expect(table).toHaveAttribute('data-border');
    await expect(table).toHaveAttribute('data-hover');
  });

  // ========== Sortering ==========

  test('clicking a sortable header cycles through sort directions', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Sortering"]');
    const navnHeader = section.locator('th[aria-sort]').first();
    const button = navnHeader.locator('button');

    await button.click();
    await expect(navnHeader).toHaveAttribute('aria-sort', 'ascending');

    await button.click();
    await expect(navnHeader).toHaveAttribute('aria-sort', 'descending');

    await button.click();
    await expect(navnHeader).toHaveAttribute('aria-sort', 'none');
  });

  test('sorting reorders table rows', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Sortering"]');
    const button = section.locator('th[aria-sort]').first().locator('button');

    await button.click();
    await expect(section.locator('th[aria-sort]').first()).toHaveAttribute(
      'aria-sort',
      'ascending',
    );
    await expect(section.locator('tbody tr').first().locator('td').first()).toContainText(
      'Anna Lie',
    );
  });

  // ========== Globalt søk ==========

  test('global search filters table rows', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Globalt søk"]');
    const searchInput = section.locator('input[type="search"]');

    await expect(section.locator('tbody tr').first()).toBeVisible();
    await searchInput.fill('Ola');
    await expect(section.locator('tbody tr')).toHaveCount(1);
    await expect(section.locator('tbody tr').first()).toContainText('Ola Nordmann');
  });

  test('global search shows "Ingen treff" when no results', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Globalt søk"]');
    await section.locator('input[type="search"]').fill('zzzzzzz');
    await expect(section.locator('tbody')).toContainText('Ingen treff');
  });

  // ========== Kolonnefiltrering ==========

  test('column filter narrows table rows', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Kolonnefiltrering"]');
    await section.locator('thead select[aria-label="Filtrer på avdeling"]').selectOption('IT');
    await expect(section.locator('tbody tr').first().locator('td').nth(1)).toContainText('IT');
  });

  test('nullstill filtre button resets all column filters', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Kolonnefiltrering"]');
    const avdelingSelect = section.locator('thead select[aria-label="Filtrer på avdeling"]');

    await avdelingSelect.selectOption('HR');
    const filteredCount = await section.locator('tbody tr').count();

    await section.locator('button', { hasText: 'Nullstill filtre' }).click({ force: true });
    const resetCount = await section.locator('tbody tr').count();
    expect(resetCount).toBeGreaterThan(filteredCount);
  });

  // ========== Paginering ==========

  test('pagination section limits visible rows to page size', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Paginering"]');
    await expect(section.locator('tbody tr')).toHaveCount(5);
    await expect(section.locator('hvi-pagination')).toBeVisible();
  });

  // ========== Utvidbare rader ==========

  test('expand buttons start collapsed', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Utvidbare rader"]');
    await expect(
      section.locator('tbody button[aria-label="Vis detaljer"]').first(),
    ).toHaveAttribute('aria-expanded', 'false');
  });

  test('clicking expand button shows detail row', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Utvidbare rader"]');
    const firstButton = section.locator('tbody button[aria-label="Vis detaljer"]').first();

    await firstButton.click();
    await expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    await expect(section.locator('tbody tr').nth(1)).toContainText('@');
  });

  test('clicking expand button again collapses the row', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Utvidbare rader"]');
    const firstButton = section.locator('tbody button[aria-label="Vis detaljer"]').first();

    await firstButton.click();
    await expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    await firstButton.click();
    await expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  });

  // ========== Accessibility ==========

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast', 'landmark-unique'], 'article');
  });
});
