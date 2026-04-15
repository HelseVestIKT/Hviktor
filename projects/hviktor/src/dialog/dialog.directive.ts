import { Directive, ElementRef, EventEmitter, inject, Input, Output } from '@angular/core';

/**
 * @summary
 * Dialog wraps the native HTML `<dialog>` element with Angular bindings for opening, closing,
 * and placement. Supports both modal and non-modal modes.
 *
 * @example Modal dialog
 * ```html
 * <button type="button" aria-haspopup="dialog" (click)="dialogOpen.set(true)">
 *   Open dialog
 * </button>
 * <dialog hviDialog id="myDialog" [open]="dialogOpen()" (openChange)="dialogOpen.set($event)">
 *   <h2>Dialog title</h2>
 *   <p>Dialog content</p>
 *   <button type="button" (click)="dialogOpen.set(false)">Close</button>
 * </dialog>
 * ```
 *
 * @example Drawer dialog (placement)
 * ```html
 * <dialog hviDialog placement="right" [open]="open()" (openChange)="open.set($event)">
 *   Drawer content
 * </dialog>
 * ```
 *
 * @example Non-modal dialog
 * ```html
 * <dialog hviDialog [modal]="false" [open]="open()" (openChange)="open.set($event)">
 *   Non-modal content
 * </dialog>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/docs/dialog/code}
 */
@Directive({
  selector: 'dialog[hviDialog]',
  standalone: true,
  host: {
    class: 'ds-dialog',
    '[attr.id]': 'id',
    '[attr.data-placement]': 'placement === "center" ? null : placement',
    '(close)': 'handleClose()',
    '(cancel)': 'handleCancel($event)',
  },
})
export class HviDialog {
  /** Optional id for the dialog element, used to connect external triggers via `commandfor`. */
  @Input() id?: string;

  @Input()
  set open(value: boolean) {
    this.setOpen(Boolean(value));
  }

  get open(): boolean {
    return this.element.open;
  }

  /** Whether the dialog opens as a modal (default: `true`). Modal dialogs block interaction with the rest of the page. */
  @Input() modal = true;

  /** Placement of the dialog. `center` (default) shows a traditional dialog; the other values render the dialog as a drawer from that edge. */
  @Input() placement?: 'center' | 'left' | 'right' | 'top' | 'bottom';

  /** Emits `true` when the dialog opens and `false` when it closes. */
  @Output() readonly openChange = new EventEmitter<boolean>();

  private readonly element = inject(ElementRef<HTMLDialogElement>).nativeElement;

  openModal(): void {
    this.setOpen(true);
  }

  close(): void {
    this.setOpen(false);
  }

  handleClose(): void {
    this.openChange.emit(false);
  }

  handleCancel(event: Event): void {
    event.preventDefault();
    this.setOpen(false);
  }

  private setOpen(shouldOpen: boolean): void {
    if (shouldOpen) {
      if (this.element.open) {
        return;
      }

      if (this.modal) {
        this.element.showModal();
      } else {
        this.element.show();
      }

      this.openChange.emit(true);
      return;
    }

    if (!this.element.open) {
      return;
    }

    this.element.close();
  }
}
