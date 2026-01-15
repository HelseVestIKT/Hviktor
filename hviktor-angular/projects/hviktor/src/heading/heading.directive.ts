import { Directive, Input } from "@angular/core";

/**
 * Heading brukes til å strukturere innhold og skape hierarki på siden.
 * 
 * Eksempel på bruk:
 * ```html
 * <h1 hviHeading size="xl">Dette er en overskrift</h1>
 * ```
 * 
 * Dokumentasjon: https://designsystemet.no/no/components/docs/heading/overview
 */
@Directive({
    selector: 'h1[hviHeading], h2[hviHeading], h3[hviHeading], h4[hviHeading], h5[hviHeading], h6[hviHeading]',
    standalone: true,
    host: {
        class: 'ds-heading',
        '[attr.data-size]': 'size',
    },
})
export class HviHeading {
    /** Størrelsen på overskriften */
    @Input() size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}