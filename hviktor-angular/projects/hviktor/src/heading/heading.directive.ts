import { Directive, Input } from '@angular/core';

/**
 * Heading is used to structure content and create hierarchy on a page.
 *
 * @example
 * ```html
 * <h1 hviHeading size="xl">This is a heading</h1>
 * ```
 *
 * Documentation: https://designsystemet.no/en/components/docs/heading/overview
 */
@Directive({
  selector:
    'h1[hviHeading], h2[hviHeading], h3[hviHeading], h4[hviHeading], h5[hviHeading], h6[hviHeading]',
  standalone: true,
  host: {
    class: 'ds-heading',
    '[attr.data-size]': 'size',
  },
})
export class HviHeading {
  /** The size of the heading */
  @Input() size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}
