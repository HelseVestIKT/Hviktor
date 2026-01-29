import { Directive } from '@angular/core';

@Directive({
  selector: '[hviFieldDescription]',
  standalone: true,
  host: {
    'data-field': 'description',
  },
})
export class HviFieldDescription {}
