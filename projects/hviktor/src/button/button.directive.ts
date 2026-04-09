import { booleanAttribute, Directive, Input } from '@angular/core';

/**
 * @summary
 * Button lets users trigger actions. Applied as a directive on `<button>` or `<a>` elements.
 * Supports three visual variants (primary, secondary, tertiary), six color themes, icon-only
 * mode, full-width layout, and a loading state that sets `aria-busy`.
 *
 * When used on an `<a>` tag the button is rendered as a link with button styling.
 *
 * **Note:** Neither `loading` nor `aria-disabled` automatically prevents click events —
 * guard your handlers manually.
 *
 * @example Basic button
 * ```html
 * <button hviButton variant="primary" color="accent">
 *   Save
 * </button>
 * ```
 *
 * @example Variants
 * ```html
 * <button hviButton variant="primary">Primary</button>
 * <button hviButton variant="secondary">Secondary</button>
 * <button hviButton variant="tertiary">Tertiary</button>
 * ```
 *
 * @example Icon-only button
 * ```html
 * <button hviButton variant="primary" icon aria-label="Edit">
 *   <svg>...</svg>
 * </button>
 * ```
 *
 * @example Button with icon and text
 * ```html
 * <button hviButton variant="primary">
 *   <svg>...</svg>
 *   Edit
 * </button>
 * ```
 *
 * @example Link styled as button
 * ```html
 * <a hviButton variant="primary" href="https://example.com" target="_blank" rel="noreferrer">
 *   Go to example
 * </a>
 * ```
 *
 * @example Loading state
 * ```html
 * <button hviButton variant="primary" loading aria-disabled="true">
 *   <hvi-spinner />
 *   Loading…
 * </button>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/button/code/}
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
