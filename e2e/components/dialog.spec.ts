import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Dialog', () => {
  let componentPage: ComponentPage;

  test.beforeEach(async ({ page }) => {
    componentPage = new ComponentPage(page);
    await componentPage.goto('dialog');
  });

  test('page loads and renders heading', async () => {
    await expect(componentPage.heading).toHaveText('Dialog');
  });

  // -------------------------------------------------------------------------
  // Standard section
  // -------------------------------------------------------------------------

  test('standard section is visible', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Standard"]');
    await expect(section).toBeVisible();
  });

  test('standard section renders a trigger button', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Standard"]');
    const button = section.locator('button.ds-button').first();
    await expect(button).toBeVisible();
    await expect(button).toHaveText('Åpne dialog');
  });

  test('standard section dialog opens on button click', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Standard"]');
    const openButton = section.locator('button.ds-button').first();
    const dialog = page.locator('dialog#demoDialog');

    await expect(dialog).not.toHaveAttribute('open');
    await openButton.click();
    await expect(dialog).toHaveAttribute('open');
  });

  test('standard section dialog has ds-dialog class', async ({ page }) => {
    const dialog = page.locator('dialog#demoDialog');
    await expect(dialog).toHaveClass(/ds-dialog/);
  });

  test('standard section dialog contains block elements', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Standard"]');
    const openButton = section.locator('button.ds-button').first();
    await openButton.click();

    const dialog = page.locator('dialog#demoDialog');
    await expect(dialog).toHaveAttribute('open');

    const blocks = dialog.locator('.ds-dialog__block');
    await expect(blocks.first()).toBeVisible();
    const count = await blocks.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('standard section dialog closes on Lukk button click', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Standard"]');
    const openButton = section.locator('button.ds-button').first();
    await openButton.click();

    const dialog = page.locator('dialog#demoDialog');
    await expect(dialog).toHaveAttribute('open');

    // Click the "Lukk" button inside the dialog
    const closeButton = dialog.locator('button.ds-button', { hasText: 'Lukk' });
    await closeButton.click();
    await expect(dialog).not.toHaveAttribute('open');
  });

  // -------------------------------------------------------------------------
  // Skuff (placement) section
  // -------------------------------------------------------------------------

  test('placement section is visible', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Skuff (placement)"]');
    await expect(section).toBeVisible();
  });

  test('placement section renders four placement buttons', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Skuff (placement)"]');
    // Target only the trigger buttons (have aria-haspopup="dialog")
    const triggerButtons = section.locator('button[aria-haspopup="dialog"]');
    await expect(triggerButtons.first()).toBeVisible();
    const count = await triggerButtons.count();
    expect(count).toBe(4);
  });

  test('placement dialog opens with data-placement=right when right button clicked', async ({
    page,
  }) => {
    const section = page.locator('app-demo-section[title="Skuff (placement)"]');
    const rightButton = section.locator('button.ds-button', { hasText: 'right' });
    await rightButton.click();

    const dialog = page.locator('dialog#drawerDialog');
    await expect(dialog).toHaveAttribute('open');
    await expect(dialog).toHaveAttribute('data-placement', 'right');
  });

  test('placement dialog opens with data-placement=left when left button clicked', async ({
    page,
  }) => {
    const section = page.locator('app-demo-section[title="Skuff (placement)"]');
    const leftButton = section.locator('button.ds-button', { hasText: 'left' });
    await leftButton.click();

    const dialog = page.locator('dialog#drawerDialog');
    await expect(dialog).toHaveAttribute('open');
    await expect(dialog).toHaveAttribute('data-placement', 'left');
  });

  test('placement dialog closes on Lukk button click', async ({ page }) => {
    const section = page.locator('app-demo-section[title="Skuff (placement)"]');
    const rightButton = section.locator('button.ds-button', { hasText: 'right' });
    await rightButton.click();

    const dialog = page.locator('dialog#drawerDialog');
    await expect(dialog).toHaveAttribute('open');

    const closeButton = dialog.locator('button.ds-button', { hasText: 'Lukk' });
    await closeButton.click();
    await expect(dialog).not.toHaveAttribute('open');
  });

  // -------------------------------------------------------------------------
  // Accessibility
  // -------------------------------------------------------------------------

  test('accessibility check', async ({ page }) => {
    await checkAccessibility(page, ['color-contrast'], 'article');
  });
});
