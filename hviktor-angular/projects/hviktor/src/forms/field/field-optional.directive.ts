import { Directive } from '@angular/core';

@Directive({
  selector: '[hviFieldOptional]',
  standalone: true,
  host: {
    'data-field': 'optional',
  },
})
export class HviFieldOptional {}
