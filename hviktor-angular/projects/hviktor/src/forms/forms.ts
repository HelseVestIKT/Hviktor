import { ReactiveFormsModule } from '@angular/forms';

import { HviForm } from './form/form.directive';
import { HviControlInvalid } from './validation/control-invalid';
import { HviValidationMessage } from './validation/validation-message';

import { HviFieldAffix } from './field/field-affix.component';
import { HviFieldAffixes } from './field/field-affixes.component';
import { HviFieldDescription } from './field/field-description.directive';
import { HviFieldOptional } from './field/field-optional.directive';
import { HviFieldValidation } from './field/field-validation.directive';
import { HviField } from './field/field.component';

export const HviForms = [
  ReactiveFormsModule,

  HviForm,
  HviControlInvalid,
  HviValidationMessage,

  HviField,
  HviFieldValidation,
  HviFieldDescription,
  HviFieldOptional,
  HviFieldAffix,
  HviFieldAffixes,
] as const;
