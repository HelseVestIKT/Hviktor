import { Component } from '@angular/core';

/**
 * Decorative affix container displayed alongside a text input.
 *
 * @remarks
 * Used together with the `hvi-field-affixes` component to wrap leading and trailing adornments.
 *
 * @example
 * ```html
 *  <hvi-field-affixes>
 *    <hvi-field-affix>NOK</hvi-field-affix>
 *    <input hviInput type="text" placeholder="Amount" />
 *    <hvi-field-affix>per month</hvi-field-affix>
 * </hvi-field-affixes>
 * ```
 *
 * Documentation: https://designsystemet.no/en/components/docs/field/code#prefixsuffix
 */
@Component({
  selector: 'hvi-field-affix',
  template: `<ng-content />`,
  host: {
    class: 'ds-field-affix',
    '[aria-hidden]': 'true',
  },
})
export class HviFieldAffix {}
