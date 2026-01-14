import { Directive, Input } from "@angular/core";

@Directive({
    selector: 'p[hviParagraph]',
    standalone: true,
    host: {
        class: 'ds-paragraph',
        '[attr.data-variant]': 'variant ?? null',
        '[attr.data-size]': 'size ?? null'
    },
})
export class HviParagraph {
    /** Adjusts styling for paragraph length */
    @Input() variant?: 'long' | 'default' | 'short';

    /** The size of the paragraph, from xs to xl */
    @Input() size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}