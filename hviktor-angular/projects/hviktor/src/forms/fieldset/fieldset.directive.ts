import { Directive } from '@angular/core';

/**
 * Fieldset brukes til å gruppere og navngi felt som naturlig hører sammen, for eksempel datofelt eller adressefelt. 
 * Komponenten hjelper med å organisere informasjon, gjøre skjemaer mer oversiktlige og forbedre tilgjengeligheten for skjermlesere.
 *
 * Eksempel på bruk:
 * ```html
 *  <fieldset hviFieldset>
 *    <legend hviLabel>Hvilket rammeverk liker du best?</legend>
 *    <p hviParagraph>Ditt valg vil hjelpe oss med å forbedre tjenesten.</p>
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
 * Dokumentasjon: https://designsystemet.no/no/components/docs/fieldset/overview
 */
@Directive({
  selector: 'fieldset[hviFieldset]',
  standalone: true,
  host: {
    class: 'ds-fieldset',
  },
})
export class HviFieldset {}
