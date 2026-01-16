import { booleanAttribute, Directive, Input } from "@angular/core";

/**
 * Button allows users to perform actions.
 * 
 * @example
 * ```html
 * <button hviButton color="brand1" variant="primary" size="md">
 *   Click me
 * </button>
 * ```
 * 
 * Documentation: https://designsystemet.no/en/components/docs/button/code/
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
    /** The size of the button */
    @Input() size?: 'sm' | 'md' | 'lg';
    
    /** Used to change the appearance of the button. */
    @Input() variant?: 'primary' | 'secondary' | 'tertiary';
    
    /** The type of button */
    @Input() type?: 'button' | 'submit' | 'reset';
    
    /** The color of the button */
    @Input() color?: 'accent' | 'brand1' | 'brand2' | 'brand3' | 'neutral' | 'danger';
    
    /** If you have only an icon in the button, you can set icon="true" to make it square. 
    * If you have other content, such as text, the button will automatically have space around the icon. 
    */
    @Input({ transform: booleanAttribute }) icon = false;
    
    /** Sets the button in a loading state. 
    * Loading indicators such as spinners must be added manually, e.g., with hvi-spinner 
    */
    @Input({ transform: booleanAttribute }) loading = false; 

    /** Makes the button full width */
    @Input({ transform: booleanAttribute }) fullWidth = false;
}