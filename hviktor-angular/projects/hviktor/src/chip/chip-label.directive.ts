import { Directive } from '@angular/core';

@Directive({
  selector: 'label[hviChip]',
  standalone: true,
  host: {
    class: 'ds-chip',
  },
})
export class HviChipLabel {}
