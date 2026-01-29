import { Component, Input } from '@angular/core';

@Component({
  selector: 'hvi-badge',
  standalone: true,
  template: '<ng-content />',
  host: {
    class: 'ds-badge',
    '[attr.data-variant]': 'variant ?? null',
    '[attr.data-count]': 'count ?? null',
    '[attr.data-color]': 'color ?? null',
  },
})
export class HviBadge {
  /** The variants of the badge */
  @Input() variant?: 'base' | 'tinted';

  /** count text of the badge*/
  @Input() count?: string;

  /** The color theme of the badge */
  @Input() color?:
    | 'neutral'
    | 'danger'
    | 'warning'
    | 'info'
    | 'success'
    | 'accent'
    | 'brand1'
    | 'brand2'
    | 'brand3';
}
