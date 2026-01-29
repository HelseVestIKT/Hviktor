import { Component, Input } from '@angular/core';

@Component({
  selector: 'hvi-badge-position',
  standalone: true,
  template: '<ng-content />',
  host: {
    class: 'ds-badge--position',
    '[attr.data-overlap]': 'overlap',
    '[attr.data-placement]': 'placement',
  },
})
export class HviBadgePosition {
  /** Overlap of the badge */
  @Input() overlap: 'rectangle' | 'circle' = 'rectangle';

  /** Placement of the badge */
  @Input() placement: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'top-right';
}
