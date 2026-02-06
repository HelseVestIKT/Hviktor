import { ValidatorFn } from '@angular/forms';
import type { HviValidationMessages } from '../validation';

/**
 * A bundle that pairs a validator function with its error key and message.
 * This enables defining validation rules and messages in one place.
 */
export interface HviValidatorBundle {
  /** The Angular validator function */
  validator: ValidatorFn;
  /** The error key (e.g., 'required', 'minlength') */
  key: string;
  /** The user-facing error message */
  message: string;
}

/**
 * Result of processing validator bundles - ready to use with FormControl and hviValidationMessage.
 */
export interface HviValidatorConfig {
  /** Array of validator functions to pass to FormControl */
  validators: ValidatorFn[];
  /** Messages object to pass to hviValidationMessage */
  messages: HviValidationMessages;
}

/**
 * Extracts validators and messages from an array of validator bundles.
 *
 * @example
 * ```ts
 * const config = hviValidators([
 *   hviRequired('Fornavn er påkrevd'),
 *   hviMinLength(2, 'Fornavn må være minst 2 tegn'),
 * ]);
 *
 * form = new FormGroup({
 *   firstName: new FormControl('', config.validators),
 * });
 *
 * // In template: [messages]="config.messages"
 * ```
 */
export function hviValidators(bundles: HviValidatorBundle[]): HviValidatorConfig {
  return {
    validators: bundles.map((b) => b.validator),
    messages: bundles.reduce(
      (acc, b) => ({ ...acc, [b.key]: b.message }),
      {} as HviValidationMessages,
    ),
  };
}

/**
 * Extracts only the validator functions from bundles.
 * Useful when you need just the validators for a FormControl.
 */
export function hviExtractValidators(bundles: HviValidatorBundle[]): ValidatorFn[] {
  return bundles.map((b) => b.validator);
}

/**
 * Extracts only the messages from bundles.
 * Useful when you need just the messages object.
 */
export function hviExtractMessages(bundles: HviValidatorBundle[]): HviValidationMessages {
  return bundles.reduce((acc, b) => ({ ...acc, [b.key]: b.message }), {} as HviValidationMessages);
}
