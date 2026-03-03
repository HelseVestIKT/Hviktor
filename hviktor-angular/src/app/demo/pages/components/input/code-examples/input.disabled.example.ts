import { Component } from '@angular/core';
import { HviField, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-input-disabled-example',
  standalone: true,
  imports: [HviField, HviInput, HviLabel],
  template: `
    <hvi-field>
      <label hviLabel for="fnr-disabled" weight="medium">Fødselsnummer</label>
      <input hviInput type="text" id="fnr-disabled" value="12345678901" disabled />
    </hvi-field>
  `,
})
export class InputDisabledExampleComponent {}
