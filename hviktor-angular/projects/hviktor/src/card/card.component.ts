import { Component, Input } from "@angular/core";

/**
 * Card highlight information or tasks that are related.
 * The component comes in two variants and can contain text, images, text fields, buttons, and links.
 * 
 * @example
 * ```html
 * <hvi-card variant="tinted" color="brand1" maxWidth="400px">
 *  <h2>This is a card</h2>
 *  <p>The content of the card goes here.</p>
 * </hvi-card>
 * ```
 * 
 * Documentation: https://designsystemet.no/en/components/docs/card/overview
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
    /** Sets the background of the card */
    @Input() variant?: 'default' | 'tinted';

    /** The color theme of the card */
    @Input() color?: 'accent' | 'brand1' | 'brand2' | 'brand3' | 'neutral';
    
    
    /** Maximum width of the card, for example '320px' or '20rem' */
    @Input() maxWidth?: string;
}