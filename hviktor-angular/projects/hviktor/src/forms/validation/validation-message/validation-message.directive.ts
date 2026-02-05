import { Directive, Input, inject } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';
import { HviForm } from '../../form';

export type HviValidationMessages = Partial<Record<string, string>>;

const DEFAULT_ERROR_PRIORITY = [
  'required',
  'minlength',
  'maxlength',
  'email',
  'pattern',
  'min',
  'max',
] as const;

@Directive({
  selector: '[hviValidationMessage]',
  standalone: true,
  host: {
    // Sett tekstinnhold direkte på elementet (typisk <p hviFieldValidation ...>)
    '[textContent]': 'message',
    // Skjul elementet når det ikke er noen feilmelding
    '[hidden]': '!message',
  },
})
export class HviValidationMessage {
  /**
   * Control name in the nearest parent FormGroup (matches formControlName).
   * Example: hviValidationMessage="firstName"
   */
  @Input('hviValidationMessage') controlName!: string;

  /**
   * Map errorKey -> message, e.g. { required: 'Påkrevd', minlength: 'Minst 2 tegn' }
   */
  @Input() messages: HviValidationMessages = {};

  /**
   * Optional error priority order. Defaults to a sensible order.
   */
  @Input() errorPriority: readonly string[] = DEFAULT_ERROR_PRIORITY;

  private readonly container = inject(ControlContainer, { optional: true });
  private readonly hviForm = inject(HviForm, { optional: true });

  private get control(): AbstractControl | null {
    const group = this.container?.control;
    if (!group || !this.controlName) return null;
    return group.get(this.controlName);
  }

  get message(): string {
    const ctrl = this.control;
    if (!ctrl) return '';

    const submitted = this.hviForm?.submitted ?? false;
    const show = ctrl.invalid && (ctrl.touched || submitted);
    if (!show) return '';

    const errors = ctrl.errors ?? {};

    // 1) Prioritized keys first
    for (const key of this.errorPriority) {
      if (errors[key] && this.messages[key]) return this.messages[key]!;
    }

    // 2) Any remaining mapped key
    for (const key of Object.keys(errors)) {
      if (this.messages[key]) return this.messages[key]!;
    }

    return 'Ugyldig verdi';
  }
}
