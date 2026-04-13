import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Table', () => {
  let componentPage: ComponentPage;

  test.beforeEach(async ({ page }) => {
    componentPage = new ComponentPage(page);
    await componentPage.goto('table');
  });

  test('page loads and renders heading', async () => {
    await expect(componentPage.heading).toHaveText('Table');
  });

  // ========== Enkel tabell ==========

  test('simple table section renders a table with ds-table class', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Enkel tabell"]');
    await expect(section).toBeVisible();

    const table = section.locator('table.ds-table');
    await expect(table).toBeVisible();
  });

  test('simple table has caption, headers and rows', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Enkel tabell"]');
    const table = section.locator('table.ds-table');

    await expect(table.locator('caption')).toContainText('Prosjektstatus');

    const headers = table.locator('thead th');
    await expect(headers).toHaveCount(3);
    await expect(headers.nth(0)).toContainText('Prosjekt');
    await expect(headers.nth(1)).toContainText('Status');
    await expect(headers.nth(2)).toContainText('Frist');

    const rows = table.locator('tbody tr');
    await expect(rows).toHaveCount(3);
  });

  // ========== Zebrastriper og border ==========

  test('zebra and border section has data attributes', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Zebrastriper og border"]');
    const table = section.locator('table.ds-table');
    await expect(table).toBeVisible();
    await expect(table).toHaveAttribute('data-zebra');
    await expect(table).toHaveAttribute('data-border');
    await expect(table).toHaveAttribute('data-hover');
  });

  // ========== Sortering ==========

  test('sorting section renders sortable column headers', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Sortering"]');
    const headers = section.locator('th[aria-sort]');
    await expect(headers).toHaveCount(3);

    for (let i = 0; i < 3; i++) {
      await expect(headers.nth(i)).toHaveAttribute('aria-sort', 'none');
    }
  });

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

    const firstCell = section.locator('tbody tr').first().locator('td').first();
    await expect(firstCell).toContainText('Anna Lie');
  });

  // ========== Globalt søk ==========

  test('global search section has a search input', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Globalt søk"]');
    await expect(section).toBeVisible();
    await expect(section.locator('input[type="search"]')).toBeVisible();
  });

  test('global search filters table rows', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Globalt søk"]');
    const searchInput = section.locator('input[type="search"]');
    const tbody = section.locator('tbody');

    // Wait for table rows to render
    await expect(tbody.locator('tr').first()).toBeVisible();

    await searchInput.fill('Ola');
    await expect(tbody.locator('tr')).toHaveCount(1);
    await expect(tbody.locator('tr').first()).toContainText('Ola Nordmann');
  });

  test('global search shows "Ingen treff" when no results', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Globalt søk"]');
    const searchInput = section.locator('input[type="search"]');

    await searchInput.fill('zzzzzzz');
    await expect(section.locator('tbody')).toContainText('Ingen treff');
  });

  // ========== Kolonnefiltrering ==========

  test('column filtering section renders select dropdowns in thead', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Kolonnefiltrering"]');
    await expect(section).toBeVisible();

    const selects = section.locator('thead select');
    await expect(selects).toHaveCount(3);
  });

  test('column filter narrows table rows', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Kolonnefiltrering"]');
    const avdelingSelect = section.locator('thead select[aria-label="Filtrer på avdeling"]');

    await avdelingSelect.selectOption('IT');

    const rows = section.locator('tbody tr');
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(rows.nth(i).locator('td').nth(1)).toContainText('IT');
    }
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

  test('pagination section limits visible rows', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Paginering"]');
    await expect(section).toBeVisible();
    await expect(section.locator('tbody tr')).toHaveCount(5);
  });

  test('pagination component is rendered', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Paginering"]');
    await expect(section.locator('hvi-pagination')).toBeVisible();
  });

  // ========== Utvidbare rader ==========

  test('expandable rows section has expand buttons', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Utvidbare rader"]');
    await expect(section).toBeVisible();

    const expandButtons = section.locator('tbody button[aria-label="Vis detaljer"]');
    const count = await expandButtons.count();
    expect(count).toBeGreaterThanOrEqual(7);
  });

  test('expand buttons start collapsed', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Utvidbare rader"]');
    const firstButton = section.locator('tbody button[aria-label="Vis detaljer"]').first();
    await expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('clicking expand button shows detail row', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Utvidbare rader"]');
    const firstButton = section.locator('tbody button[aria-label="Vis detaljer"]').first();

    await firstButton.click();
    await expect(firstButton).toHaveAttribute('aria-expanded', 'true');

    const detailRow = section.locator('tbody tr').nth(1);
    await expect(detailRow).toContainText('@');
  });

  test('clicking expand button again collapses the row', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Utvidbare rader"]');
    const firstButton = section.locator('tbody button[aria-label="Vis detaljer"]').first();

    await firstButton.click();
    await expect(firstButton).toHaveAttribute('aria-expanded', 'true');

    await firstButton.click();
    await expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  });

  // ========== Komplett eksempel ==========

  test('complete example section has all features', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Komplett eksempel"]');
    await expect(section).toBeVisible();

    await expect(section.locator('input[type="search"]')).toBeVisible();
    await expect(section.locator('th[aria-sort]')).toHaveCount(3);
    await expect(section.locator('thead select')).toHaveCount(3);

    const expandButtons = section.locator('tbody button[aria-label="Vis detaljer"]');
    const count = await expandButtons.count();
    expect(count).toBeGreaterThan(0);

    await expect(section.locator('hvi-pagination')).toBeVisible();
  });

  // ========== All tables have ds-table ==========

  test('all tables have ds-table class', async ({ page }) => {
    const tables = page.locator('article table.ds-table');
    await expect(tables.first()).toBeVisible();
    const count = await tables.count();
    expect(count).toBeGreaterThanOrEqual(8);
  });

  // ========== Accessibility ==========

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast', 'landmark-unique'], 'article');
  });
});
