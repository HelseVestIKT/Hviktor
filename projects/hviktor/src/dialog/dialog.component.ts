import { Component, ElementRef, EventEmitter, Input, Output, inject } from '@angular/core';
import { HviButton } from '../button';
import { HviHeading } from '../heading';

/**
 * @summary
 * Wraps the native HTML `<dialog>` element with Angular bindings for opening, closing, placement,
 * and light dismiss. Supports both modal and non-modal display modes with automatic close button injection.
 *
 * @description
 * The dialog can be displayed in two modes:
 * - **Modal**: Overlays the entire page with a backdrop and prevents interaction with the rest of the page
 * - **Non-modal**: Displays above content but allows interaction with the rest of the page
 *
 * Use `title` to set a visible heading and accessible name at the same time.
 * When no `title` is set, the dialog falls back to `aria-label="Dialogboks"`.
 *
 * Use `placement` to display the dialog as a drawer from any side (left, right, top, bottom) instead of centered.
 * Use `closedby="any"` to allow closing by clicking outside the dialog.
 *
 * @example Modal dialog with title
 * ```html
 * <button hviButton (click)="openDialog()">Open Dialog</button>
 * <dialog hviDialog title="Confirm Action" [open]="dialogOpen()" (openChange)="dialogOpen.set($event)">
 *   <div hviDialogBlock>
 *     <p hviParagraph>Are you sure?</p>
 *   </div>
 *   <div hviDialogBlock>
 *     <button hviButton (click)="dialogOpen.set(false)">Cancel</button>
 *     <button hviButton variant="primary" (click)="confirmAction()">Confirm</button>
 *   </div>
 * </dialog>
 * ```
 *
 * @example Non-modal dialog with title
 * ```html
 * <button hviButton (click)="openDialog()">Open Dialog</button>
 * <dialog hviDialog title="Feedback" [modal]="false" [open]="dialogOpen()" (openChange)="dialogOpen.set($event)">
 *   <textarea hviInput></textarea>
 *   <button hviButton (click)="dialogOpen.set(false)">Send</button>
 * </dialog>
 * ```
 *
 * @example Drawer placement
 * ```html
 * <button hviButton (click)="drawerOpen.set(true)">Open Drawer</button>
 * <dialog hviDialog placement="bottom" [open]="drawerOpen()" (openChange)="drawerOpen.set($event)">
 *   <div hviDialogBlock>
 *     <p>Select an option from this information panel.</p>
 *   </div>
 * </dialog>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/docs/dialog/overview}
 */
@Component({
  selector: 'dialog[hviDialog]',
  standalone: true,
  host: {
    class: 'ds-dialog',
    '[attr.id]': 'id',
    '[attr.aria-label]': 'title || "Dialogboks"',
    '[attr.data-placement]': 'placement === "center" ? null : placement',
    '[attr.data-modal]': 'modal',
    '[attr.closedby]': 'closedby',
    '(close)': 'handleClose()',
    '(cancel)': 'handleCancel($event)',
    '(click)': 'onBackdropClick($event)',
  },
  template: `
    @if (closeButton !== false) {
      <button
        hviButton
        color="neutral"
        variant="tertiary"
        icon
        data-command="close"
        type="button"
        [attr.aria-label]="closeButtonAriaLabel"
        (click)="close()"
      ></button>
    }
    @if (title) {
      <h2 hviHeading>{{ title }}</h2>
    }
    <ng-content></ng-content>
  `,
  imports: [HviButton, HviHeading],
})
export class HviDialog {
  /**
   * Optional `id` attribute for the dialog element.
   * Use this when triggering the dialog from external controls or for accessibility.
   *
   * @type {string | undefined}
   */
  @Input() id?: string;

  /**
   * Visible title rendered as an `<h2>` inside the dialog, and used as the accessible name
   * (`aria-label`) for the dialog element. When omitted, `aria-label="Dialogboks"` is used
   * as a fallback and no heading is rendered.
   *
   * @type {string | undefined}
   */
  @Input() title?: string;

  /**
   * Whether the dialog is open (`true`) or closed (`false`).
   * Automatically calls `showModal()` or `show()` based on the `modal` input.
   * Emits `openChange` when toggled programmatically via this setter.
   *
   * @type {boolean}
   */
  @Input()
  set open(value: boolean) {
    this.setOpen(Boolean(value));
  }

  get open(): boolean {
    return this.element.open;
  }

  /**
   * Whether the dialog opens as a modal dialog (`true`) or non-modal (`false`).
   * - **Modal**: Blocks interaction with the rest of the page; shows a semi-transparent backdrop.
   * - **Non-modal**: Allows interaction with page content below; no backdrop.
   *
   * @type {boolean}
   * @default true
   */
  @Input() modal = true;

  /**
   * Position where the dialog appears on screen.
   * - `'center'` (default): Traditional centered dialog
   * - `'left'` / `'right'` / `'top'` / `'bottom'`: Displays as a drawer from that side
   *
   * @type {'center' | 'left' | 'right' | 'top' | 'bottom'}
   * @default 'center'
   */
  @Input() placement: 'center' | 'left' | 'right' | 'top' | 'bottom' = 'center';

  /**
   * Light dismiss behavior — controls how the dialog can be closed.
   * - `'closerequest'` (default): Only the cancel button or close button closes the dialog
   * - `'any'`: Dialog also closes when clicking outside (on the backdrop)
   * - `'none'`: Dialog can only be closed programmatically
   *
   * @type {'none' | 'closerequest' | 'any'}
   * @default 'closerequest'
   */
  @Input() closedby: 'none' | 'closerequest' | 'any' = 'closerequest';

  /**
   * Screen reader label for the automatic close button, or `false` to hide the button.
   * - If a string: used as `aria-label` for the close button
   * - If `false`: close button is not rendered
   *
   * @type {string | boolean}
   * @default 'Lukk dialogvindu'
   */
  @Input() closeButton: string | boolean = 'Lukk dialogvindu';

  /**
   * Emits `true` when the dialog opens and `false` when it closes.
   * Fires when the dialog state changes via the `open` input, `openModal()`, or `close()` methods.
   *
   * @type {EventEmitter<boolean>}
   */
  @Output() readonly openChange = new EventEmitter<boolean>();

  private readonly element = inject(ElementRef<HTMLDialogElement>).nativeElement;

  get closeButtonAriaLabel(): string {
    return typeof this.closeButton === 'string' ? this.closeButton : 'Lukk dialogvindu';
  }

  /**
   * Opens the dialog in modal or non-modal mode based on the `modal` input.
   * Calls `showModal()` if modal, otherwise calls `show()`.
   * Emits `openChange(true)` only if the dialog was not already open.
   */
  openModal(): void {
    this.setOpen(true);
  }

  /**
   * Closes the dialog by calling the native `close()` method.
   * Emits `openChange(false)` only if the dialog was not already closed.
   */
  close(): void {
    this.setOpen(false);
  }

  /**
   * @internal Handles the native 'close' event emitted by the dialog element.
   * Emits `openChange(false)` to sync with external state.
   */
  handleClose(): void {
    this.openChange.emit(false);
  }

  /**
   * @internal Handles the native 'cancel' event (e.g., Escape key press).
   * Prevents default behavior and closes the dialog programmatically.
   */
  handleCancel(event: Event): void {
    event.preventDefault();
    this.setOpen(false);
  }

  onBackdropClick(event: MouseEvent): void {
    if (this.closedby === 'any' && this.element.open) {
      if (event.target === this.element) {
        const rect = this.element.getBoundingClientRect();
        const isInDialog =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom;

        if (!isInDialog) {
          this.close();
        }
      }
    }
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
