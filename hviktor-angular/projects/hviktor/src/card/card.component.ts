import { Component, Input } from "@angular/core";

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
    /** Change the background color of the card. */
    @Input() variant?: 'default' | 'tinted';

    /** The color theme of the card */
    @Input() color?: 'accent' | 'brand1' | 'brand2' | 'brand3' | 'neutral';
    
    
    /** The maximum width of the card, for example '320px' or '20rem' */
    @Input() maxWidth?: string;
}