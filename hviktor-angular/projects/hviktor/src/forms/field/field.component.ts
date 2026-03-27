import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import '@digdir/designsystemet-web';

/**
 * @summary
 * Field kobler automatisk sammen label, beskrivelse, validering og input via ds-field web component.
 *
 * @example
 * ```html
 * <hvi-field>
 *  <label hviLabel>Name</label>
 *  <span hviFieldDescription>Fill in your full name.</span>
 *  <input type="text" />
 *  <span hviFieldValidation>This field is required.</span>
 * </hvi-field>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/field/overview}
 */
@Component({
  selector: 'hvi-field',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  styles: [':host { display: contents; }'],
  template:
    '<ds-field class="ds-field" [attr.data-position]="position ?? null"><ng-content /></ds-field>',
})
export class HviField {
  /** Position of toggle inputs (radio, checkbox, switch) in field */
  @Input() position?: 'start' | 'end';
}
