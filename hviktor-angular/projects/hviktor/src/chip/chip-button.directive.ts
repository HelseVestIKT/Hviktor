import { booleanAttribute, Directive, Input } from '@angular/core';

@Directive({
  selector: 'button[hviChip]',
  standalone: true,
  host: {
    class: 'ds-chip',
    '[attr.data-removable]': 'removable ? "true" : null',
  },
})
export class HviChipButton {
  /** Whether the chip is removable*/
  @Input({ transform: booleanAttribute }) removable = false;
}
