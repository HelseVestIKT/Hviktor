import { Component, Input } from "@angular/core";

/**
 * Card fremhever informasjon eller oppgaver som hører sammen. 
 * Komponenten finnes i to varianter og kan inneholde tekst, bilde, tekstfelt, knapper og lenker.
 * 
 * Eksempel på bruk:
 * ```html
 * <hvi-card variant="tinted" color="brand1" maxWidth="400px">
 *  <h2>Dette er et kort</h2>
 *  <p>Innholdet i kortet går her.</p>
 * </hvi-card>
 * ```
 * 
 * Dokumentasjon: https://designsystemet.no/no/components/docs/card/overview
 */
@Component({
    selector: 'hvi-card',
    standalone: true,
    template: '<ng-content />',
    host: {
        class: 'ds-card',
        '[attr.data-variant]': 'variant',
        '[attr.data-color]': 'color',
        '[style.max-width]': 'maxWidth',
    }
})

export class HviCard {
    /** Setter bakgrunn på kortet */
    @Input() variant?: 'default' | 'tinted';

    /** Fargetemaet på kortet */
    @Input() color?: 'accent' | 'brand1' | 'brand2' | 'brand3' | 'neutral';
    
    
    /** Maksimal bredde på kortet, for eksempel '320px' eller '20rem' */
    @Input() maxWidth?: string;
}