import { Component, input } from '@angular/core';

/**
 * Counter that displays remaining/exceeded character count for a field.
 *
 * Must be used inside a `hvi-field` component alongside a textarea or input.
 * The ds-field web component automatically tracks the input/textarea,
 * so you only need to provide the `limit` property.
 *
 * @example
 * ```html
 * <hvi-field>
 *   <label hviLabel for="description" weight="medium">Beskrivelse</label>
 *   <textarea hviInput id="description" rows="3"></textarea>
 *   <hvi-field-counter [limit]="100" />
 * </hvi-field>
 * ```
 *
 * Documentation: https://designsystemet.no/en/components/docs/field/code
 */
@Component({
  selector: 'hvi-field-counter',
  standalone: true,
  styles: [':host { display: contents; }'],
  template: `<p
    class="ds-validation-message"
    data-field="counter"
    [attr.data-limit]="limit()"
    [attr.data-over]="over() ?? null"
    [attr.data-under]="under() ?? null"
  ></p>`,
})
export class HviFieldCounter {
  /** Maximum allowed characters */
  limit = input.required<number>();

  /** Label template when limit is exceeded. Use %d for the count. */
  over = input<string>();

  /** Label template for remaining characters. Use %d for the count. */
  under = input<string>();
}
