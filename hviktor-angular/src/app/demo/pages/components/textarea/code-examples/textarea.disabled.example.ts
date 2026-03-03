import { Component } from '@angular/core';
import { HviField, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-textarea-disabled-example',
  standalone: true,
  imports: [HviField, HviInput, HviLabel],
  template: `
    <hvi-field>
      <label hviLabel for="disabled-textarea" weight="medium">Kommentar</label>
      <textarea hviInput id="disabled-textarea" rows="3" disabled>
    Dette feltet er deaktivert</textarea
      >
    </hvi-field>
  `,
})
export class TextareaDisabledExampleComponent {}
