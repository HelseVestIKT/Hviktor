import { Component } from "@angular/core";

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
 *    <input hviInput type="text" placeholder="Beløp" />
 *    <hvi-field-affix>pr. mnd.</hvi-field-affix>
 * </hvi-field-affixes>
 * ```
 * 
 */
@Component({
    selector: "hvi-field-affix",
    template: `<ng-content />`,
    host: {
        class: "ds-field-affix",
        '[aria-hidden]': "true",
    },
})
export class HviFieldAffix {}