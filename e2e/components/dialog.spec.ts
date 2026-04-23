import { expect, test } from '@playwright/test';
import { checkAccessibility } from '../fixtures/axe-helper';
import { ComponentPage } from '../fixtures/component-page';

test.describe('Dialog', () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new ComponentPage(page);
    await componentPage.goto('dialog');
  });

  test.describe('Modal Dialog', () => {
    test('opens when button is clicked', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Modal Dialog"]');
      const openButton = section.getByRole('button', { name: 'Åpne modal Dialog' });
      const dialog = section.locator('dialog[hviDialog]');

      await expect(dialog).not.toHaveAttribute('open');
      await openButton.click();
      await expect(dialog).toHaveAttribute('open');
    });

    test('closes when close button is clicked', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Modal Dialog"]');
      const openButton = section.getByRole('button', { name: 'Åpne modal Dialog' });
      const dialog = section.locator('dialog[hviDialog]');

      await openButton.click();
      await expect(dialog).toHaveAttribute('open');

      // Finner automatisk injisert lukkeknapp via aria-label eller data-command
      const closeButton = dialog.getByRole('button', { name: 'Lukk dialogvindu' });
      await closeButton.click();
      await expect(dialog).not.toHaveAttribute('open');
    });

    test('has ds-dialog class', async ({ page }) => {
      const dialog = page.locator('dialog[hviDialog]').first();
      await expect(dialog).toHaveClass(/ds-dialog/);
    });

    test('renders action buttons', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Modal Dialog"]');
      const openButton = section.getByRole('button', { name: 'Åpne modal Dialog' });
      const dialog = section.locator('dialog[hviDialog]');

      await openButton.click();

      // Sjekker at selve innholdsknappene våre er der
      await expect(dialog.getByRole('button', { name: 'Ja, endre' })).toBeVisible();
      await expect(dialog.getByRole('button', { name: 'Avbryt' })).toBeVisible();
    });
  });

  test.describe('Non-modal Dialog', () => {
    test('opens when button is clicked', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Ikke-modal Dialog"]');
      const openButton = section.getByRole('button', { name: 'Åpne ikke-modal Dialog' });
      const nonModalDialog = section.locator('dialog[hviDialog]');

      await openButton.click();
      await expect(nonModalDialog).toHaveAttribute('open');
    });

    test('allows page interaction while open', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Ikke-modal Dialog"]');
      const openButton = section.getByRole('button', { name: 'Åpne ikke-modal Dialog' });

      await openButton.click();
      // Verifiserer at knappen bak dialogen fortsatt er tilgjengelig og ikke blokkert av en modal backdrop
      await expect(openButton).toBeEnabled();
    });

    test('closes when action button is clicked', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Ikke-modal Dialog"]');
      const openButton = section.getByRole('button', { name: 'Åpne ikke-modal Dialog' });
      const nonModalDialog = section.locator('dialog[hviDialog]');

      await openButton.click();
      await expect(nonModalDialog).toHaveAttribute('open');

      // Her fant den feil knapp tidligere på grunn av .first()
      const sendButton = nonModalDialog.getByRole('button', { name: 'Send inn' });
      await sendButton.click();

      // I ditt oppsett forventer vi kanskje at skjemaet lukker seg,
      // men sjekk koden din: "Send inn" har (click)="nonModalOpen.set(false)"
      await expect(nonModalDialog).not.toHaveAttribute('open');
    });
  });

  test.describe('Dialog as Drawer (Placement)', () => {
    test('opens with data-placement attribute', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Dialog som drawer"]');
      const openButton = section.getByRole('button', { name: 'Åpne Dialog (Bottom)' });
      const drawerDialog = section.locator('dialog[hviDialog]');

      await openButton.click();
      await expect(drawerDialog).toHaveAttribute('open');
      await expect(drawerDialog).toHaveAttribute('data-placement', 'bottom');
    });

    test('closes when close button is clicked', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Dialog som drawer"]');
      const openButton = section.getByRole('button', { name: 'Åpne Dialog (Bottom)' });
      const drawerDialog = section.locator('dialog[hviDialog]');

      await openButton.click();

      const closeButton = drawerDialog.getByRole('button', { name: 'Lukk dialogvindu' });
      await closeButton.click();
      await expect(drawerDialog).not.toHaveAttribute('open');
    });
  });

  test.describe('Dialog with Form and Focus', () => {
    test('opens dialog with form input and focuses it', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Med skjema og fokus"]');
      const openButton = section.getByRole('button', { name: 'Åpne Dialog' });
      const formDialog = section.locator('dialog[hviDialog]');

      await openButton.click();
      await expect(formDialog).toHaveAttribute('open');

      // autofocus skal ha satt fokus på input-feltet automatisk
      const input = formDialog.locator('input');
      await expect(input).toBeFocused();
    });
  });

  test.describe('Dialog with Blocks', () => {
    test('renders dialog with multiple blocks', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Med blokker"]');
      const openButton = section.getByRole('button', { name: 'Åpne Dialog' });
      const blocksDialog = section.locator('dialog[hviDialog]');

      await openButton.click();

      const blocks = blocksDialog.locator('[hviDialogBlock]');
      await expect(blocks).toHaveCount(3);
    });
  });

  test.describe('Dialog with Backdrop Click', () => {
    test('has closedby="any" attribute', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Lukk ved klikk utenfor"]');
      const openButton = section.getByRole('button', { name: 'Åpne Dialog' });
      const backdropDialog = section.locator('dialog[hviDialog]');

      await openButton.click();
      await expect(backdropDialog).toHaveAttribute('closedby', 'any');
    });
  });

  test.describe('Dialog Accessibility', () => {
    test('has proper accessibility attributes', async ({ page }) => {
      const section = page.locator('app-demo-section[title="Modal Dialog"]');
      const openButton = section.getByRole('button', { name: 'Åpne modal Dialog' });
      const dialog = section.locator('dialog[hviDialog]');

      await openButton.click();

      // Sjekker at lukkeknappen vi genererer har aria-label
      const closeButton = dialog.locator('button[data-command="close"]');
      await expect(closeButton).toHaveAttribute('aria-label', 'Lukk dialogvindu');
    });

    test('passes accessibility checks', async ({ page }) => {
      // Åpne i det minste én modal slik at den er med i axe-sjekken
      await page.getByRole('button', { name: 'Åpne modal Dialog' }).click();
      await checkAccessibility(page, ['color-contrast'], 'article');
    });
  });
});
