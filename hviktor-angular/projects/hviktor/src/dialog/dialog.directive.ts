import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';

/**
 * @summary
 * Dialog allows you to create both modal and non-modal dialogs based on the HTML dialog element.
 * You have to connect the <dialog> element to a trigger yourself, and handle opening and closing the dialog with JavaScript.
 *
 * @example
 * HTML:
 * ```html
 * <dialog hviDialog [id]="exampleDialog" [open]="dialogOpen()" (openChange)="toggleDialog($event)">
 *  <h3 hviHeading size="md">Example dialog</h3>
 *  <p hviParagraph>This is an example of a dialog component.</p>
 *  <button hviButton variant="primary" (click)="closeDialog()">Close dialog</button>
 * </dialog>
 * ```
 *
 * TypeScript:
 * ```ts
 * export class DialogExampleComponent {
 *  readonly dialogOpen = signal(false);
 *  toggleDialog(nextState?: boolean): void {
 *    if (typeof nextState === 'boolean') {
 *      this.dialogOpen.set(nextState);
 *      return;
 *    }
 *    this.dialogOpen.update((current) => !current);
 *   }
 * }
 *
 * Documentation: https://designsystemet.no/en/components/docs/dialog/code/
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

  private readonly element = inject(ElementRef<HTMLDialogElement>).nativeElement;

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
