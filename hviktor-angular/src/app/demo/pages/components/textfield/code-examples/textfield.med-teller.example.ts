import { Component } from '@angular/core';
import { HviTextfield } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-textfield-med-teller-example',
  standalone: true,
  imports: [HviTextfield],
  template: `
    <hvi-textfield
      label="Hvor mange kroner koster det per måned?"
      [counterLimit]="10"
    ></hvi-textfield>
  `,
})
export class TextfieldMedTellerExampleComponent {}
