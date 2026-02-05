import { Directive, HostBinding, inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import { HviForm } from '../form';

/**
 * @summary
 * ControlInvalid directive description.
 *
 * @example
 * ```html
 * <[hviControlInvalid]></[hviControlInvalid]>
 * ```
 *
 * Documentation: https://designsystemet.no/en/components/docs/control-invalid/code
 */

@Directive({
  selector: '[hviControlInvalid]',
  standalone: true,
})
export class HviControlInvalid {
  private readonly ngControl = inject(NgControl, { optional: true });
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
