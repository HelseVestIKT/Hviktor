import { Directive } from '@angular/core';

/**
 * @summary Adds Designsystemet Divider styling to an `hr` element.
 *
 * @example Basic divider between content blocks
 * ```html
 * <hr hviDivider />
 * ```
 *
 * @example Decorative divider hidden from assistive technology (`hviDivider` applies `aria-hidden="true"` automatically)
 * ```html
 * <hr hviDivider />
 * ```
 *
 * @see {@link https://designsystemet.no/komponenter/divider}
 */

@Directive({
  selector: 'hr[hviDivider]',
  standalone: true,
  host: {
    class: 'ds-divider',
    'aria-hidden': 'true',
  },
})
export class HviDivider {}
