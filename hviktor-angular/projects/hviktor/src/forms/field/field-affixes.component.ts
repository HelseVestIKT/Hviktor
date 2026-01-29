import { Component } from '@angular/core';

/**
 * Container for decorative affixes displayed alongside a text input.
 *
 * @remarks
 * Wraps leading and trailing adornments provided by `hvi-field-affix` components.
 *
 * @example
 * ```html
 *   <hvi-field-affixes>
 *       <hvi-field-affix>NOK</hvi-field-affix>
 *       <input hviInput type="text" placeholder="Amount" />
 *       <hvi-field-affix>per month</hvi-field-affix>
 * </hvi-field-affixes>
 * ```
 *
 * Documentation: https://designsystemet.no/en/components/docs/field/code#prefixsuffix
 */
@Component({
  selector: 'hvi-field-affixes',
  template: `<ng-content />`,
  host: {
    class: 'ds-field-affixes',
  },
})
export class HviFieldAffixes {}
