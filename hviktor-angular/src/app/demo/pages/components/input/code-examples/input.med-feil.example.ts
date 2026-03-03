import { Component } from '@angular/core';
import { HviField, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-input-med-feil-example',
  standalone: true,
  imports: [HviField, HviInput, HviLabel],
  template: `
    <hvi-field>
      <label hviLabel for="fnr-error" weight="medium">Fødselsnummer</label>
      <input hviInput type="text" id="fnr-error" aria-invalid="true" />
    </hvi-field>
  `,
})
export class InputMedFeilExampleComponent {}
