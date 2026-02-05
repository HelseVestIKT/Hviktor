import { Directive, HostBinding, inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import { HviForm } from '../../form';

/**
 * @summary
 * Directive to set `aria-invalid` on form controls based on their validation state.
 *
 * Usage:
 * ```html
 * <input hviControlInvalid formControlName="email" />
 * ```
 */

@Directive({
  selector: '[hviControlInvalid]',
  standalone: true,
})
export class HviControlInvalid {
  private readonly ngControl = inject(NgControl, { self: true, optional: true });
  private readonly hviForm = inject(HviForm, { optional: true });

  @HostBinding('attr.aria-invalid')
  get ariaInvalid(): string | null {
    const control = this.ngControl?.control;
    if (!control) return null;

    const submitted = this.hviForm?.submitted ?? false;
    const show = control.invalid && (control.touched || submitted);

    return show ? 'true' : null;
  }
}
