import { Directive } from '@angular/core';

@Directive({
  selector: 'fieldset[hviFieldset]',
  standalone: true,
  host: {
    class: 'ds-fieldset',
  },
})
export class HviFieldset {}
