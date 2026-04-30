import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviDialogBlock } from './dialog-block.directive';
import { HviDialog } from './dialog.component';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * JSDOM has native readonly getters for `open` on HTMLDialogElement.
 * This mock properly overrides it so we can test the component's internal checks.
 */
function mockDialogState(nativeDialog: HTMLDialogElement) {
  let isOpen = false;
  Object.defineProperty(nativeDialog, 'open', {
    get: () => isOpen,
    set: (v: boolean) => {
      isOpen = v;
    },
    configurable: true,
  });
  nativeDialog.showModal = vi.fn(() => {
    isOpen = true;
  });
  nativeDialog.show = vi.fn(() => {
    isOpen = true;
  });
  nativeDialog.close = vi.fn(() => {
    isOpen = false;
    nativeDialog.dispatchEvent(new Event('close'));
  });
}

// ---------------------------------------------------------------------------
// Host components
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [HviDialog],
  template: '<dialog hviDialog>Content</dialog>',
})
class BasicDialogHost {}

@Component({
  standalone: true,
  imports: [HviDialog],
  template: '<dialog hviDialog id="my-dialog">Content</dialog>',
})
class DialogWithIdHost {}

@Component({
  standalone: true,
  imports: [HviDialog],
  template: '<dialog hviDialog [placement]="placement">Content</dialog>',
})
class PlacementDialogHost {
  placement: 'center' | 'left' | 'right' | 'top' | 'bottom' = 'left';
}

@Component({
  standalone: true,
  imports: [HviDialog],
  template: '<dialog hviDialog placement="bottom">Content</dialog>',
})
class DrawerDefaultA11yNameHost {}

@Component({
  standalone: true,
  imports: [HviDialog],
  template: '<dialog hviDialog title="Bekreft sletting">Content</dialog>',
})
class TitleDialogHost {}

@Component({
  standalone: true,
  imports: [HviDialog],
  template: '<dialog hviDialog>Content</dialog>',
})
class NoTitleDialogHost {}

@Component({
  standalone: true,
  selector: 'test-non-modal-dialog-host',
  imports: [HviDialog],
  template: '<dialog hviDialog [modal]="false">Content</dialog>',
})
class NonModalDialogHost {}

@Component({
  standalone: true,
  selector: 'test-modal-dialog-host',
  imports: [HviDialog],
  template: '<dialog hviDialog [modal]="true">Content</dialog>',
})
class ModalDialogHost {}

@Component({
  standalone: true,
  selector: 'test-custom-close-button-host',
  imports: [HviDialog],
  template: '<dialog hviDialog [closeButton]="closeButtonLabel">Content</dialog>',
})
class CustomCloseButtonHost {
  closeButtonLabel: string | boolean = 'Close';
}

@Component({
  standalone: true,
  selector: 'test-no-close-button-host',
  imports: [HviDialog],
  template: '<dialog hviDialog [closeButton]="false">Content</dialog>',
})
class NoCloseButtonHost {}

@Component({
  standalone: true,
  imports: [HviDialog],
  template: '<dialog hviDialog [closedby]="closedby">Content</dialog>',
})
class ClosedByHost {
  closedby: 'none' | 'closerequest' | 'any' = 'closerequest';
}

@Component({
  standalone: true,
  imports: [HviDialogBlock],
  template: '<div hviDialogBlock>Block</div>',
})
class DialogBlockHost {}

// ---------------------------------------------------------------------------
// HviDialog — Host bindings
// ---------------------------------------------------------------------------

describe('HviDialog — Host bindings', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [BasicDialogHost, DialogWithIdHost, ClosedByHost] });
  });

  it('should apply ds-dialog class', () => {
    const f = TestBed.createComponent(BasicDialogHost);
    f.detectChanges();
    expect(f.nativeElement.querySelector('dialog').classList.contains('ds-dialog')).toBe(true);
  });

  it('should bind id to the dialog element', () => {
    const f = TestBed.createComponent(DialogWithIdHost);
    f.detectChanges();
    expect(f.nativeElement.querySelector('dialog').id).toBe('my-dialog');
  });

  it('should set closedby attribute from input', () => {
    const f = TestBed.createComponent(ClosedByHost);
    f.componentInstance.closedby = 'any';
    f.detectChanges();
    expect(f.nativeElement.querySelector('dialog').getAttribute('closedby')).toBe('any');
  });
});

// ---------------------------------------------------------------------------
// HviDialog — Placement
// ---------------------------------------------------------------------------

describe('HviDialog — Placement', () => {
  beforeEach(async () => {
    await setupTestBed({
      imports: [PlacementDialogHost, DrawerDefaultA11yNameHost],
    });
  });

  it('should not set data-placement when placement is "center"', () => {
    const f = TestBed.createComponent(PlacementDialogHost);
    f.componentInstance.placement = 'center';
    f.detectChanges();
    expect(f.nativeElement.querySelector('dialog').getAttribute('data-placement')).toBeNull();
  });

  it('should set data-placement attribute for non-center placements', () => {
    // Each iteration uses a fresh fixture to avoid NG0100 from re-using the same fixture
    (['left', 'right', 'top', 'bottom'] as const).forEach((placement) => {
      const f = TestBed.createComponent(PlacementDialogHost);
      f.componentInstance.placement = placement;
      f.detectChanges();
      expect(f.nativeElement.querySelector('dialog').getAttribute('data-placement')).toBe(
        placement,
      );
      f.destroy();
    });
  });
});

// ---------------------------------------------------------------------------
// HviDialog — Title and accessible name
// ---------------------------------------------------------------------------

describe('HviDialog — Title and accessible name', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [TitleDialogHost, NoTitleDialogHost] });
  });

  it('should render an h2 with the title when title is set', () => {
    const f = TestBed.createComponent(TitleDialogHost);
    f.detectChanges();
    const h2 = f.nativeElement.querySelector('dialog h2');
    expect(h2).toBeTruthy();
    expect(h2.textContent.trim()).toBe('Bekreft sletting');
  });

  it('should set aria-label to the title value when title is set', () => {
    const f = TestBed.createComponent(TitleDialogHost);
    f.detectChanges();
    expect(f.nativeElement.querySelector('dialog').getAttribute('aria-label')).toBe(
      'Bekreft sletting',
    );
  });

  it('should not render an h2 when no title is set', () => {
    const f = TestBed.createComponent(NoTitleDialogHost);
    f.detectChanges();
    expect(f.nativeElement.querySelector('dialog h2')).toBeFalsy();
  });

  it('should set aria-label to "Dialogboks" when no title is set', () => {
    const f = TestBed.createComponent(NoTitleDialogHost);
    f.detectChanges();
    expect(f.nativeElement.querySelector('dialog').getAttribute('aria-label')).toBe('Dialogboks');
  });
});

// ---------------------------------------------------------------------------
// HviDialog — Close button
// ---------------------------------------------------------------------------

describe('HviDialog — Close button', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [BasicDialogHost, CustomCloseButtonHost, NoCloseButtonHost] });
  });

  it('should render close button with default label by default', () => {
    const f = TestBed.createComponent(BasicDialogHost);
    f.detectChanges();
    const closeButton = f.nativeElement.querySelector('dialog button');
    expect(closeButton).toBeTruthy();
    expect(closeButton.getAttribute('aria-label')).toBe('Lukk dialogvindu');
  });

  it('should render close button with custom label when provided', () => {
    const f = TestBed.createComponent(CustomCloseButtonHost);
    f.componentInstance.closeButtonLabel = 'Custom Close Label';
    f.detectChanges();
    const closeButton = f.nativeElement.querySelector('dialog button');
    expect(closeButton.getAttribute('aria-label')).toBe('Custom Close Label');
  });

  it('should not render close button when closeButton is false', () => {
    const f = TestBed.createComponent(NoCloseButtonHost);
    f.detectChanges();
    const closeButton = f.nativeElement.querySelector('dialog button');
    expect(closeButton).toBeFalsy();
  });

  it('should have data-command="close" attribute on close button', () => {
    const f = TestBed.createComponent(BasicDialogHost);
    f.detectChanges();
    const closeButton = f.nativeElement.querySelector('dialog button');
    expect(closeButton.getAttribute('data-command')).toBe('close');
  });

  it('should close dialog when close button is clicked', async () => {
    const f = TestBed.createComponent(BasicDialogHost);
    f.detectChanges();

    const nativeDialog = f.nativeElement.querySelector('dialog') as HTMLDialogElement;
    mockDialogState(nativeDialog);

    const directive = f.debugElement
      .query((de) => de.nativeElement.tagName === 'DIALOG')
      .injector.get(HviDialog);

    directive.openModal();
    f.detectChanges();

    const closeButton = f.nativeElement.querySelector('dialog button');
    closeButton.click();
    f.detectChanges();

    expect(nativeDialog.close).toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// HviDialog — Open/Close behavior
// ---------------------------------------------------------------------------

describe('HviDialog — Open/Close behavior', () => {
  let fixture: ComponentFixture<BasicDialogHost>;
  let directive: HviDialog;
  let nativeDialog: HTMLDialogElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [BasicDialogHost] });
    fixture = TestBed.createComponent(BasicDialogHost);
    fixture.detectChanges();
    nativeDialog = fixture.nativeElement.querySelector('dialog');

    mockDialogState(nativeDialog);

    directive = fixture.debugElement
      .query((de) => de.nativeElement.tagName === 'DIALOG')
      .injector.get(HviDialog);
  });

  it('should be closed by default', () => {
    expect(directive.open).toBe(false);
  });

  it('should open when openModal() is called', () => {
    directive.openModal();
    expect(nativeDialog.showModal).toHaveBeenCalled();
    expect(directive.open).toBe(true);
  });

  it('should emit openChange(true) when openModal() is called', () => {
    const spy = vi.spyOn(directive.openChange, 'emit');
    directive.openModal();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should close when close() is called', () => {
    directive.openModal();
    directive.close();
    expect(nativeDialog.close).toHaveBeenCalled();
    expect(directive.open).toBe(false);
  });

  it('should emit openChange(false) when close() is called while open', () => {
    directive.openModal();
    const spy = vi.spyOn(directive.openChange, 'emit');
    directive.close();
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('should not emit when openModal() is called while already open', () => {
    directive.openModal();
    const spy = vi.spyOn(directive.openChange, 'emit');
    spy.mockClear();
    directive.openModal();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not emit when close() is called while already closed', () => {
    const spy = vi.spyOn(directive.openChange, 'emit');
    spy.mockClear();
    directive.close();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should handle handleClose() by emitting openChange(false)', () => {
    directive.openModal();
    const spy = vi.spyOn(directive.openChange, 'emit');
    directive.handleClose();
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('should handle handleCancel() by preventing default and closing', () => {
    directive.openModal();
    const event = new Event('cancel', { cancelable: true });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    directive.handleCancel(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
    // handleCancel calls setOpen(false) → nativeDialog.close(), not directive.close()
    expect(nativeDialog.close).toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// HviDialog — Modal vs Non-modal
// ---------------------------------------------------------------------------

describe('HviDialog — Modal vs Non-modal', () => {
  let modalFixture: ComponentFixture<ModalDialogHost>;
  let nonModalFixture: ComponentFixture<NonModalDialogHost>;
  let modalDialog: HTMLDialogElement;
  let nonModalDialog: HTMLDialogElement;
  let modalDirective: HviDialog;
  let nonModalDirective: HviDialog;

  beforeEach(async () => {
    await setupTestBed({ imports: [ModalDialogHost, NonModalDialogHost] });

    // Setup modal
    modalFixture = TestBed.createComponent(ModalDialogHost);
    modalFixture.detectChanges();
    modalDialog = modalFixture.nativeElement.querySelector('dialog');
    mockDialogState(modalDialog);

    modalDirective = modalFixture.debugElement
      .query((de) => de.nativeElement.tagName === 'DIALOG')
      .injector.get(HviDialog);

    // Setup non-modal
    nonModalFixture = TestBed.createComponent(NonModalDialogHost);
    nonModalFixture.detectChanges();
    nonModalDialog = nonModalFixture.nativeElement.querySelector('dialog');
    mockDialogState(nonModalDialog);

    nonModalDirective = nonModalFixture.debugElement
      .query((de) => de.nativeElement.tagName === 'DIALOG')
      .injector.get(HviDialog);
  });

  it('should default to modal mode', () => {
    expect(modalDirective.modal).toBe(true);
  });

  it('should call showModal() for modal dialogs', () => {
    modalDirective.openModal();
    expect(modalDialog.showModal).toHaveBeenCalled();
  });

  it('should call show() for non-modal dialogs', () => {
    nonModalDirective.openModal();
    expect(nonModalDialog.show).toHaveBeenCalled();
  });

  it('should set data-modal attribute based on modal input', () => {
    expect(modalDialog.getAttribute('data-modal')).toBe('true');
    expect(nonModalDialog.getAttribute('data-modal')).toBe('false');
  });
});

// ---------------------------------------------------------------------------
// HviDialog — open input binding
// ---------------------------------------------------------------------------

describe('HviDialog — open input binding', () => {
  let fixture: ComponentFixture<BasicDialogHost>;
  let directive: HviDialog;
  let nativeDialog: HTMLDialogElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [BasicDialogHost] });
    fixture = TestBed.createComponent(BasicDialogHost);
    fixture.detectChanges();
    nativeDialog = fixture.nativeElement.querySelector('dialog');

    mockDialogState(nativeDialog);

    directive = fixture.debugElement
      .query((de) => de.nativeElement.tagName === 'DIALOG')
      .injector.get(HviDialog);
  });

  it('should open dialog when open input is set to true', () => {
    directive.open = true;
    expect(nativeDialog.showModal).toHaveBeenCalled();
  });

  it('should close dialog when open input is set to false', () => {
    directive.open = true;
    directive.open = false;
    expect(nativeDialog.close).toHaveBeenCalled();
  });

  it('should convert truthy values to boolean true', () => {
    directive.open = 1 as any;
    expect(directive.open).toBe(true);
  });

  it('should convert falsy values to boolean false', () => {
    directive.open = true;
    directive.open = 0 as any;
    expect(directive.open).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// HviDialog — Closedby variations
// ---------------------------------------------------------------------------

describe('HviDialog — Closedby variations', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [ClosedByHost] });
  });

  it('should support closedby="closerequest" (default)', () => {
    const f = TestBed.createComponent(ClosedByHost);
    f.componentInstance.closedby = 'closerequest';
    f.detectChanges();
    expect(f.nativeElement.querySelector('dialog').getAttribute('closedby')).toBe('closerequest');
  });

  it('should support closedby="any"', () => {
    const f = TestBed.createComponent(ClosedByHost);
    f.componentInstance.closedby = 'any';
    f.detectChanges(); // Changed before first detectChanges, no NG0100
    expect(f.nativeElement.querySelector('dialog').getAttribute('closedby')).toBe('any');
  });

  it('should support closedby="none"', () => {
    const f = TestBed.createComponent(ClosedByHost);
    f.componentInstance.closedby = 'none';
    f.detectChanges(); // Changed before first detectChanges, no NG0100
    expect(f.nativeElement.querySelector('dialog').getAttribute('closedby')).toBe('none');
  });
});

// ---------------------------------------------------------------------------
// HviDialog — Backdrop click behavior
// ---------------------------------------------------------------------------

describe('HviDialog — Backdrop click behavior', () => {
  let fixture: ComponentFixture<ClosedByHost>;
  let directive: HviDialog;
  let nativeDialog: HTMLDialogElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [ClosedByHost] });
    fixture = TestBed.createComponent(ClosedByHost);
    // Vi kaller IKKE fixture.detectChanges() her for å unngå NG0100.
    nativeDialog = fixture.nativeElement.querySelector('dialog');
    mockDialogState(nativeDialog);

    directive = fixture.debugElement
      .query((de) => de.nativeElement.tagName === 'DIALOG')
      .injector.get(HviDialog);
  });

  it('should close dialog on backdrop click when closedby is "any"', () => {
    fixture.componentInstance.closedby = 'any';
    fixture.detectChanges();
    directive.openModal();

    // Mock getBoundingClientRect so coordinates are meaningful in jsdom
    vi.spyOn(nativeDialog, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      right: 300,
      top: 100,
      bottom: 300,
      width: 200,
      height: 200,
      x: 100,
      y: 100,
      toJSON: () => ({}),
    } as DOMRect);

    const closeSpy = vi.spyOn(directive, 'close');
    // Dispatch on nativeDialog so event.target === this.element; coords outside the mocked rect
    nativeDialog.dispatchEvent(
      new MouseEvent('click', { bubbles: false, clientX: 50, clientY: 50 }),
    );
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should not close dialog on backdrop click when closedby is "closerequest"', () => {
    fixture.componentInstance.closedby = 'closerequest';
    fixture.detectChanges();
    directive.openModal();

    vi.spyOn(nativeDialog, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      right: 300,
      top: 100,
      bottom: 300,
      width: 200,
      height: 200,
      x: 100,
      y: 100,
      toJSON: () => ({}),
    } as DOMRect);

    const closeSpy = vi.spyOn(directive, 'close');
    nativeDialog.dispatchEvent(
      new MouseEvent('click', { bubbles: false, clientX: 50, clientY: 50 }),
    );
    expect(closeSpy).not.toHaveBeenCalled();
  });

  it('should not close dialog when clicking inside the dialog', () => {
    fixture.componentInstance.closedby = 'any';
    fixture.detectChanges();
    directive.openModal();

    vi.spyOn(nativeDialog, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      right: 300,
      top: 100,
      bottom: 300,
      width: 200,
      height: 200,
      x: 100,
      y: 100,
      toJSON: () => ({}),
    } as DOMRect);

    const closeSpy = vi.spyOn(directive, 'close');
    // Coords inside the mocked rect (100-300)
    nativeDialog.dispatchEvent(
      new MouseEvent('click', { bubbles: false, clientX: 150, clientY: 150 }),
    );
    expect(closeSpy).not.toHaveBeenCalled();
  });

  it('should not respond to backdrop clicks when dialog is closed', () => {
    fixture.componentInstance.closedby = 'any';
    fixture.detectChanges();
    // Dialog is never opened

    vi.spyOn(nativeDialog, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      right: 300,
      top: 100,
      bottom: 300,
      width: 200,
      height: 200,
      x: 100,
      y: 100,
      toJSON: () => ({}),
    } as DOMRect);

    const closeSpy = vi.spyOn(directive, 'close');
    nativeDialog.dispatchEvent(
      new MouseEvent('click', { bubbles: false, clientX: 50, clientY: 50 }),
    );
    expect(closeSpy).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// HviDialogBlock
// ---------------------------------------------------------------------------

describe('HviDialogBlock', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [DialogBlockHost] });
  });

  it('should apply ds-dialog__block class to host element', () => {
    const f = TestBed.createComponent(DialogBlockHost);
    f.detectChanges();
    expect(f.nativeElement.querySelector('div').classList.contains('ds-dialog__block')).toBe(true);
  });
});
