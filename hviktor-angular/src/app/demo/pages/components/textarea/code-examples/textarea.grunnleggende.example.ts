import { Component } from '@angular/core';
import { HviField, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-textarea-grunnleggende-example',
  standalone: true,
  imports: [HviField, HviInput, HviLabel],
  template: `
    <hvi-field>
      <label hviLabel for="basic-textarea" weight="medium">Beskrivelse</label>
      <textarea hviInput id="basic-textarea" rows="4"></textarea>
    </hvi-field>
  `,
})
export class TextareaGrunnleggendeExampleComponent {}
