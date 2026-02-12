import { Directive } from '@angular/core';

/**
 * @summary
 * List directive description.
 *
 * @example
 * ```html
 * <ol hviList>
 *  <li>First item</li>
 *  <li>Second item</li>
 *  <li>Third item</li>
 * </ol>
 *
 * <ul hviList>
 *  <li>First item</li>
 *  <li>Second item</li>
 *  <li>Third item</li>
 * </ul>
 * ```
 *
 * Documentation: https://designsystemet.no/en/components/docs/input/code
 */

@Directive({
  selector: 'ol[hviList], ul[hviList]',
  standalone: true,
  host: {
    class: 'ds-list',
  },
})
export class HviList {}
