import { Directive, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

/**
 * @summary
 * Adds submit handling for Angular reactive forms:
 * - Tracks submitted state
 * - Marks all controls as touched on submit
 * - Optionally focuses an ErrorSummary when invalid
 *
 * @example
 * ```html
 * <[hviForm]></[hviForm]>
 * ```
 *
 * Documentation: https://designsystemet.no/en/components/docs/form/code
 */

@Directive({
  selector: 'form[hviForm]',
  standalone: true,
})
export class HviForm {
  /** Emits when the form has been submitted */
  @Output() hviSubmitted = new EventEmitter<void>();

  /** True after first submit attempt */
  submitted = false;

  /** Optional focus target (e.g. HviErrorSummaryComponent) */
  @Input() focusOnInvalid?: { focus?: () => void } | null;

  // Optional injection: present when the form uses [formGroup] and ReactiveFormsModule is in scope
  private readonly formGroupDir = inject(FormGroupDirective, { optional: true });

  @HostListener('submit', ['$event'])
  onSubmit(event: Event): void {
    this.submitted = true;
    this.hviSubmitted.emit();

    const form = this.formGroupDir?.form;
    if (!form) return;

    form.markAllAsTouched();

    if (form.invalid) {
      event.preventDefault();
      queueMicrotask(() => this.focusOnInvalid?.focus?.());
    }
  }
}
