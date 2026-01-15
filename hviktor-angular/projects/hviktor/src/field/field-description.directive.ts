import { Directive } from "@angular/core";

@Directive({
    selector: '[hviFieldDescription]',
    standalone: true,
    host: {
        '[attr.data-field]': 'description',
        id: 'field-description',
    },
})
export class HviFieldDescription {}