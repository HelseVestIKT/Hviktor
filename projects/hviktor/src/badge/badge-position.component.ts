import { Component, Input } from '@angular/core';

/**
 * @summary
 * BadgePosition wraps content and a Badge to position the badge as an overlay.
 * Controls where the badge appears relative to the wrapped element and how it
 * adapts to the shape of the underlying content. Defaults to `'top-right'`
 * placement with `'rectangle'` overlap.
 *
 * @example Badge positioned on an icon
 * ```html
 * <hvi-badge-position placement="top-right">
 *   <hvi-badge color="danger" count="3"></hvi-badge>
 *   <span>Content</span>
 * </hvi-badge-position>
 * ```
 *
 * @example Circle overlap
 * ```html
 * <hvi-badge-position overlap="circle" placement="top-left">
 *   <hvi-badge color="info" count="1"></hvi-badge>
 *   <hvi-avatar ariaLabel="User" initials="UN"></hvi-avatar>
 * </hvi-badge-position>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/badge/code/}
 */
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
  /** Shape of the element the badge overlaps. Adjusts positioning accordingly. */
  @Input() overlap: 'rectangle' | 'circle' = 'rectangle';

  /** Corner where the badge is placed. */
  @Input() placement: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'top-right';
}
