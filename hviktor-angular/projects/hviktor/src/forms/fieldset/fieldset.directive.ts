import { Directive } from '@angular/core';

/**
 * Fieldset is used to group and label fields that naturally belong together, such as date fields or address fields.
 * The component helps organize information, make forms more manageable, and improve accessibility for screen readers.
 *
 * @example
 * ```html
 *  <fieldset hviFieldset>
 *    <legend hviLabel>Which framework do you like best?</legend>
 *    <p hviParagraph>Your choice will help us improve the service.</p>
 *    <hvi-field>
 *      <input type="radio" id="angular" name="framework" value="angular" />
 *      <label hviLabel for="angular">Angular</label>
 *    </hvi-field>
 *    <hvi-field>
 *      <input type="radio" id="react" name="framework" value="react" />
 *      <label hviLabel for="react">React</label>
 *    </hvi-field>
 *    <hvi-field>
 *      <input type="radio" id="vue" name="framework" value="vue" />
 *      <label hviLabel for="vue">Vue</label>
 *    </hvi-field>
 *  </fieldset>
 * ```
 *
 * Documentation: https://designsystemet.no/en/components/docs/fieldset/overview
 */
@Directive({
  selector: 'fieldset[hviFieldset]',
  standalone: true,
  host: {
    class: 'ds-fieldset',
  },
})
export class HviFieldset {}
