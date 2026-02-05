import { Component, Input } from '@angular/core';

/**
 * @summary
 * Tag is a label that can be used to categorize items or communicate progress, status, or process. Tags can provide users with a quicker overview of content.
 *
 * @example
 * ```html
 * <hvi-tag variant="outline" size="sm" color="info">Small info tag</hvi-tag>
 * ```
 *
 * Documentation: https://designsystemet.no/en/components/docs/tag/code
 */

@Component({
  selector: 'hvi-tag',
  standalone: true,
  template: '<ng-content />',
  host: {
    class: 'ds-tag',
    '[attr.data-variant]': 'variant ?? null',
    '[attr.data-size]': 'size ?? null',
    '[attr.data-color]': 'color ?? null',
  },
})
export class HviTag {
  /** The variants of the tag */
  @Input() variant?: 'default' | 'outline';

  /** The sizes of the tag */
  @Input() size?: 'sm' | 'md' | 'lg';

  /** The color theme of the tag */
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
