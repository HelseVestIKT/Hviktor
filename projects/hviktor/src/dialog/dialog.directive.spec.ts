import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviDialogBlock } from './dialog-block.directive';
import { HviDialog } from './dialog.directive';

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
class IdDialogHost {}

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
  template: '<dialog hviDialog [modal]="false">Content</dialog>',
})
class NonModalDialogHost {}

@Component({
  standalone: true,
  imports: [HviDialogBlock],
  template: '<div hviDialogBlock>Block</div>',
})
class DialogBlockHost {}

@Component({
  standalone: true,
  imports: [HviDialog, HviDialogBlock],
  template: `
    <dialog hviDialog>
      <div hviDialogBlock>Header</div>
      <div hviDialogBlock>Body</div>
    </dialog>
  `,
})
class DialogWithBlocksHost {}

// ---------------------------------------------------------------------------
// HviDialog
// ---------------------------------------------------------------------------

describe('HviDialog', () => {
  let fixture: ComponentFixture<BasicDialogHost>;
  let element: HTMLDialogElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [BasicDialogHost] });
    fixture = TestBed.createComponent(BasicDialogHost);
    fixture.detectChanges();
    element = fixture.nativeElement.querySelector('dialog');
  });

  it('should create', () => {
    expect(element).toBeTruthy();
  });

  it('should have ds-dialog host class', () => {
    expect(element.classList.contains('ds-dialog')).toBe(true);
  });

  it('should not set data-placement by default', () => {
    expect(element.getAttribute('data-placement')).toBeNull();
  });

  it('should not set data-placement when placement is undefined', () => {
    expect(element.getAttribute('data-placement')).toBeNull();
  });
});

describe('HviDialog id', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [IdDialogHost] });
  });

  it('should bind the id attribute', () => {
    const f = TestBed.createComponent(IdDialogHost);
    f.detectChanges();
    const el = f.nativeElement.querySelector('dialog');
    expect(el.getAttribute('id')).toBe('my-dialog');
  });
});

describe('HviDialog placement', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [PlacementDialogHost] });
  });

  it('should set data-placement to left', () => {
    const f = TestBed.createComponent(PlacementDialogHost);
    f.componentInstance.placement = 'left';
    f.detectChanges();
    expect(f.nativeElement.querySelector('dialog').getAttribute('data-placement')).toBe('left');
  });

  it('should set data-placement to right', () => {
    const f = TestBed.createComponent(PlacementDialogHost);
    f.componentInstance.placement = 'right';
    f.detectChanges();
    expect(f.nativeElement.querySelector('dialog').getAttribute('data-placement')).toBe('right');
  });

  it('should set data-placement to top', () => {
    const f = TestBed.createComponent(PlacementDialogHost);
    f.componentInstance.placement = 'top';
    f.detectChanges();
    expect(f.nativeElement.querySelector('dialog').getAttribute('data-placement')).toBe('top');
  });

  it('should set data-placement to bottom', () => {
    const f = TestBed.createComponent(PlacementDialogHost);
    f.componentInstance.placement = 'bottom';
    f.detectChanges();
    expect(f.nativeElement.querySelector('dialog').getAttribute('data-placement')).toBe('bottom');
  });

  it('should not set data-placement when placement is center', () => {
    const f = TestBed.createComponent(PlacementDialogHost);
    f.componentInstance.placement = 'center';
    f.detectChanges();
    expect(f.nativeElement.querySelector('dialog').getAttribute('data-placement')).toBeNull();
  });
});

describe('HviDialog open/close', () => {
  let fixture: ComponentFixture<BasicDialogHost>;
  let directive: HviDialog;
  let nativeDialog: HTMLDialogElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [BasicDialogHost] });
    fixture = TestBed.createComponent(BasicDialogHost);
    fixture.detectChanges();
    nativeDialog = fixture.nativeElement.querySelector('dialog');

    // jsdom does not implement showModal/show/close for <dialog>
    nativeDialog.showModal = vi.fn(() => {
      (nativeDialog as any).open = true;
    });
    nativeDialog.show = vi.fn(() => {
      (nativeDialog as any).open = true;
    });
    nativeDialog.close = vi.fn(() => {
      (nativeDialog as any).open = false;
    });

    directive = fixture.debugElement
      .query((de) => de.nativeElement.tagName === 'DIALOG')
      .injector.get(HviDialog);
  });

  it('should be closed by default', () => {
    expect(directive.open).toBe(false);
  });

  it('should emit openChange(true) when openModal() is called', () => {
    const spy = vi.spyOn(directive.openChange, 'emit');
    directive.openModal();
    expect(spy).toHaveBeenCalledWith(true);
    expect(directive.open).toBe(true);
  });

  it('should call showModal() on the native element', () => {
    directive.openModal();
    expect(nativeDialog.showModal).toHaveBeenCalled();
  });

  it('should emit openChange(false) when handleClose() is called', () => {
    const spy = vi.spyOn(directive.openChange, 'emit');
    directive.handleClose();
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('should not emit when openModal() is called while already open', () => {
    directive.openModal();
    const spy = vi.spyOn(directive.openChange, 'emit');
    directive.openModal();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not emit when close() is called while already closed', () => {
    const spy = vi.spyOn(directive.openChange, 'emit');
    directive.close();
    expect(spy).not.toHaveBeenCalled();
  });
});

describe('HviDialog non-modal', () => {
  let fixture: ComponentFixture<NonModalDialogHost>;
  let directive: HviDialog;
  let nativeDialog: HTMLDialogElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [NonModalDialogHost] });
    fixture = TestBed.createComponent(NonModalDialogHost);
    fixture.detectChanges();
    nativeDialog = fixture.nativeElement.querySelector('dialog');
    nativeDialog.show = vi.fn(() => {
      (nativeDialog as any).open = true;
    });
    nativeDialog.close = vi.fn(() => {
      (nativeDialog as any).open = false;
    });
    directive = fixture.debugElement
      .query((de) => de.nativeElement.tagName === 'DIALOG')
      .injector.get(HviDialog);
  });

  it('should call show() (not showModal()) when modal is false', () => {
    directive.openModal();
    expect(nativeDialog.show).toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// HviDialogBlock
// ---------------------------------------------------------------------------

describe('HviDialogBlock', () => {
  let fixture: ComponentFixture<DialogBlockHost>;
  let element: HTMLElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [DialogBlockHost] });
    fixture = TestBed.createComponent(DialogBlockHost);
    fixture.detectChanges();
    element = fixture.nativeElement.querySelector('div');
  });

  it('should create', () => {
    expect(element).toBeTruthy();
  });

  it('should have ds-dialog__block host class', () => {
    expect(element.classList.contains('ds-dialog__block')).toBe(true);
  });

  it('should project content', () => {
    expect(element.textContent?.trim()).toBe('Block');
  });
});

describe('HviDialog with blocks', () => {
  let fixture: ComponentFixture<DialogWithBlocksHost>;

  beforeEach(async () => {
    await setupTestBed({ imports: [DialogWithBlocksHost] });
    fixture = TestBed.createComponent(DialogWithBlocksHost);
    fixture.detectChanges();
  });

  it('should render two block elements', () => {
    const blocks = fixture.nativeElement.querySelectorAll('.ds-dialog__block');
    expect(blocks.length).toBe(2);
  });
});
