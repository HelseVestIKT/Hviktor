import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

/**
 * Dialog allows you to create both modal and non-modal dialogs based on the HTML dialog element.
 *
 * @example
 * ```html
 * <dialog hviDialog>
 * 
 * </dialog>
 * ```
 *
 * https://designsystemet.no/en/components/docs/dialog/code/
 */

@Directive({
  selector: 'dialog[hviDialog]',
  standalone: true,
  host: {
    class: 'ds-dialog',
    id: '{{ id }}',
  },
})
export class HviDialog {
  @Input() id?: string;
  @Input()
  set open(value: boolean) {
    this.setOpen(Boolean(value));
  }

  get open(): boolean {
    return this.element.open;
  }

  @Input() modal = true;

  @Output() readonly openChange = new EventEmitter<boolean>();

  private readonly element: HTMLDialogElement;

  constructor(elementRef: ElementRef<HTMLDialogElement>) {
    this.element = elementRef.nativeElement;
  }

  openModal(): void {
    this.setOpen(true);
  }

  close(): void {
    this.setOpen(false);
  }

  @HostListener('close')
  handleClose(): void {
    this.openChange.emit(false);
  }

  @HostListener('cancel', ['$event'])
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
