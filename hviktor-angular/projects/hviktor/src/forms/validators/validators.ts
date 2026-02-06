import { ValidatorFn, Validators } from '@angular/forms';
import { HviValidatorBundle } from './validator-bundle';

/**
 * Creates a required validator bundle.
 *
 * @example
 * ```ts
 * hviRequired('Dette feltet er påkrevd')
 * ```
 */
export function hviRequired(message: string): HviValidatorBundle {
  return { validator: Validators.required, key: 'required', message };
}

/**
 * Creates a requiredTrue validator bundle (for checkboxes that must be checked).
 *
 * @example
 * ```ts
 * hviRequiredTrue('Du må godta vilkårene')
 * ```
 */
export function hviRequiredTrue(message: string): HviValidatorBundle {
  return { validator: Validators.requiredTrue, key: 'required', message };
}

/**
 * Creates a minLength validator bundle.
 *
 * @example
 * ```ts
 * hviMinLength(2, 'Må være minst 2 tegn')
 * ```
 */
export function hviMinLength(length: number, message: string): HviValidatorBundle {
  return { validator: Validators.minLength(length), key: 'minlength', message };
}

/**
 * Creates a maxLength validator bundle.
 *
 * @example
 * ```ts
 * hviMaxLength(100, 'Kan ikke være mer enn 100 tegn')
 * ```
 */
export function hviMaxLength(length: number, message: string): HviValidatorBundle {
  return { validator: Validators.maxLength(length), key: 'maxlength', message };
}

/**
 * Creates an email validator bundle.
 *
 * @example
 * ```ts
 * hviEmail('Ugyldig e-postadresse')
 * ```
 */
export function hviEmail(message: string): HviValidatorBundle {
  return { validator: Validators.email, key: 'email', message };
}

/**
 * Creates a pattern validator bundle.
 *
 * @example
 * ```ts
 * hviPattern(/^\d+$/, 'Kan kun inneholde tall')
 * ```
 */
export function hviPattern(pattern: string | RegExp, message: string): HviValidatorBundle {
  return { validator: Validators.pattern(pattern), key: 'pattern', message };
}

/**
 * Creates a min value validator bundle.
 *
 * @example
 * ```ts
 * hviMin(0, 'Må være minst 0')
 * ```
 */
export function hviMin(min: number, message: string): HviValidatorBundle {
  return { validator: Validators.min(min), key: 'min', message };
}

/**
 * Creates a max value validator bundle.
 *
 * @example
 * ```ts
 * hviMax(100, 'Kan ikke være mer enn 100')
 * ```
 */
export function hviMax(max: number, message: string): HviValidatorBundle {
  return { validator: Validators.max(max), key: 'max', message };
}

/**
 * Creates a custom validator bundle with a specified error key.
 * Use this for custom validators or validators not covered by the built-in functions.
 *
 * @example
 * ```ts
 * // Custom validator that checks if value matches a specific format
 * const norwegianPhoneValidator: ValidatorFn = (control) => {
 *   const valid = /^(\+47)?\d{8}$/.test(control.value);
 *   return valid ? null : { norwegianPhone: true };
 * };
 *
 * hviCustom('norwegianPhone', norwegianPhoneValidator, 'Ugyldig norsk telefonnummer')
 * ```
 */
export function hviCustom(
  key: string,
  validator: ValidatorFn,
  message: string,
): HviValidatorBundle {
  return { validator, key, message };
}

/**
 * Creates a nullValidator bundle (always valid, useful for conditional validation).
 * Note: This validator always passes, so the message will never be shown.
 */
export function hviNullValidator(): HviValidatorBundle {
  return { validator: Validators.nullValidator, key: 'null', message: '' };
}
