import { Directive, Input } from "@angular/core";

@Directive({
    selector: 'label[hviLabel]',
    standalone: true,
    host: {
        class: 'ds-label',
        '[attr.weight]': 'weight ?? null',
    },
})
export class HviLabel {
    /** The font weight of the label */
    @Input() weight?: 'regular' | 'medium' | 'semibold';
}