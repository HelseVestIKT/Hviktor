import { Component, Input } from '@angular/core';

/**
 * @summary
 * Badge displays a small label or count indicator, typically used for statuses or notifications.
 * Supports color variants and an optional count display (e.g. `"9+"`).
 * Use together with `HviBadgePosition` to overlay a badge on another element.
 *
 * @example Basic badge
 * ```html
 * <hvi-badge color="danger" count="3"></hvi-badge>
 * ```
 *
 * @example Tinted variant
 * ```html
 * <hvi-badge variant="tinted" color="success">Active</hvi-badge>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/badge/code/}
 */
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
  /** The visual style of the badge. */
  @Input() variant?: 'base' | 'tinted';

  /** A count or label displayed inside the badge (e.g. `"9+"`). */
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
