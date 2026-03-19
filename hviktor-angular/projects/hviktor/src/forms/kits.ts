import { ReactiveFormsModule } from '@angular/forms';

import { HviForm } from './form';
import { HviControlInvalid, HviValidationMessage } from './validation';

import {
  HviField,
  HviFieldAffix,
  HviFieldAffixes,
  HviFieldCounter,
  HviFieldDescription,
  HviFieldOptional,
  HviFieldValidation,
} from './field';

import { HviRequiredTag } from '../required-tag';
import { HviErrorSummary } from './error-summary';
import { HviFieldset } from './fieldset';
import { HviInput } from './input';

// 1) Bare field-byggesteiner
export const HviFieldKit = [
  HviField,
  HviFieldValidation,
  HviFieldDescription,
  HviFieldOptional,
  HviFieldAffix,
  HviFieldAffixes,
  HviFieldCounter,
  HviRequiredTag,
] as const;

// 2) Reactive forms + invalid/validation glue + submit behavior
export const HviValidationKit = [
  ReactiveFormsModule,
  HviForm,
  HviControlInvalid,
  HviValidationMessage,
] as const;

// 3) “Alt du trenger for DS forms”
export const HviForms = [
  ...HviValidationKit,
  ...HviFieldKit,
  HviInput,
  HviFieldset,
  HviErrorSummary,
] as const;
