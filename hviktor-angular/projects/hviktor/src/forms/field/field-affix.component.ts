import { Component, Input } from "@angular/core";

@Component({
    selector: "hvi-field-affix",
    template: `<ng-content />`,
    host: {
        class: "ds-field-affix",
        '[aria-hidden]': "true",
    },
})
export class HviFieldAffix {
}