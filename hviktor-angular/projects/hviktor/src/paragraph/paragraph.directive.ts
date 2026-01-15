import { Directive, Input } from "@angular/core";

/**
 * Paragraph brukes til løpende tekst og benyttes typisk i artikler, komponenter, hjelpetekster og lignende.
 * 
 * Eksempel på bruk:
 * ```html
 * <p hviParagraph variant="long" size="md">
 *  Dette er et avsnitt med brødtekst som kan tilpasses i størrelse og variant.
 * </p>
 * ```
 * 
 * Dokumentasjon: https://designsystemet.no/no/components/docs/paragraph/overview
 */
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
    /** Justerer stilen for avsnittets lengde */
    @Input() variant?: 'long' | 'default' | 'short';

    /** Paragraph finnes i flere tekststørrelser for å tilpasses ulike behov */
    @Input() size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}