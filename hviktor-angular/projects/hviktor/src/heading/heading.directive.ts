import { Directive, Input } from "@angular/core";

@Directive({
    selector: 'h1[hviHeading], h2[hviHeading], h3[hviHeading], h4[hviHeading], h5[hviHeading], h6[hviHeading]',
    standalone: true,
    host: {
        class: 'ds-heading',
        '[attr.data-size]': 'size',
    },
})
export class HviHeading {
    /** The size of the heading, from 2xs to 2xl */
    @Input() size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}