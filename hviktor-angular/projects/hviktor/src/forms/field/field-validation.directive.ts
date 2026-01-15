import { Directive } from '@angular/core';

@Directive({
  selector: '[hviFieldValidation]',
  standalone: true,
  host: {
    class: 'ds-validation-message',
    'data-field': 'validation',
  },
})
export class HviFieldValidation {}
