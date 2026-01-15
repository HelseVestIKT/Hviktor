import { booleanAttribute, Directive, Input } from "@angular/core";

/**
 * Button lèt brukarane utføre handlingar.
 * 
 * Eksempel på bruk:
 * ```html
 * <button hviButton color="brand1" variant="primary" size="md">
 *   Klikk meg
 * </button>
 * ```
 * 
 * Dokumentasjon: https://designsystemet.no/no/components/docs/button/overview
 */
@Directive({
    selector: 'button[hviButton], a[hviButton]',
    standalone: true,
    host: {
        class: 'ds-button',
        '[attr.type]': 'type',
        '[attr.data-size]': 'size',
        '[attr.data-variant]': 'variant',
        '[attr.data-color]': 'color',
        '[attr.data-fullwidth]': 'fullWidth ? "" : null',
        '[attr.data-icon]': 'icon ? "" : null',
        '[attr.aria-busy]': 'loading ? "true" : null',
    },
})
export class HviButton {
    /** Størrelsen på knappen */
    @Input() size?: 'sm' | 'md' | 'lg';
    
    /** Brukast for å endre utsjånad på knappen. */
    @Input() variant?: 'primary' | 'secondary' | 'tertiary';
    
    /** Typen knapp */
    @Input() type?: 'button' | 'submit' | 'reset';
    
    /** Fargen på knappen */
    @Input() color?: 'accent' | 'brand1' | 'brand2' | 'brand3' | 'neutral' | 'danger';
    
    /** Dersom du har kun ikon i knappen kan du sette icon="true" for å få den firkanta. 
    * Har du anna innhald, som tekst, vil knappen automatisk få luft rundt ikonet. 
    */
    @Input({ transform: booleanAttribute }) icon = false;
    
    /** Setter knappen i en lastetilstand. 
    * Lasteindikator som spinner etc. må legges til selv, f.eks. med hvi-spinner 
    */
    @Input({ transform: booleanAttribute }) loading = false; 

    /** Gjør knappen full bredde */
    @Input({ transform: booleanAttribute }) fullWidth = false;
}