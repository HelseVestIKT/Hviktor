import { Component } from '@angular/core';
import { HviField, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-textarea-med-hjelpetekst-example',
  standalone: true,
  imports: [HviField, HviInput, HviLabel],
  template: `
    <hvi-field>
      <label hviLabel for="description-textarea" weight="medium">Tilbakemelding</label>
      <span data-field="description">Fortell oss hva du synes om tjenesten</span>
      <textarea hviInput id="description-textarea" rows="4"></textarea>
    </hvi-field>
  `,
})
export class TextareaMedHjelpetekstExampleComponent {}
