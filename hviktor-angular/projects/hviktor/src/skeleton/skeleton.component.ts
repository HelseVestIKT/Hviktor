import { Component, Input } from '@angular/core';

/**
 * @summary
 * Skeleton component description.
 *
 * @example
 * ```html
 * <hvi-skeleton variant="rectangle" width="100px" height="20px"></hvi-skeleton>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/skeleton/code}
 */

@Component({
  selector: 'hvi-skeleton',
  standalone: true,
  template: '<ng-content />',
  host: {
    class: 'ds-skeleton',
    '[attr.aria-hidden]': 'true',
    '[attr.data-variant]': 'variant',
    '[style.width]': 'width',
    '[style.height]': 'height',
  },
})
export class HviSkeleton {
  @Input() variant: 'rectangle' | 'circle' | 'text' = 'rectangle';
  @Input() width?: string;
  @Input() height?: string;
}
