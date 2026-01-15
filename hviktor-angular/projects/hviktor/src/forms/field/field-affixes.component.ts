import { Component } from "@angular/core";

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
*       <input hviInput type="text" placeholder="Beløp" />
*       <hvi-field-affix>pr. mnd.</hvi-field-affix>
* </hvi-field-affixes>
* ```
* 
*/
@Component({
    selector: "hvi-field-affixes",
    template: `<ng-content />`,
    host: {
        class: "ds-field-affixes",
    },
})
export class HviFieldAffixes {}