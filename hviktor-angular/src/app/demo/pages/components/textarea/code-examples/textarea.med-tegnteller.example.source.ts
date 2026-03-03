// Auto-generated - do not edit manually
export const TextareaMedTegntellerExampleSource = `import { Component } from '@angular/core';
import { HviField, HviFieldCounter, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-textarea-med-tegnteller-example',
  standalone: true,
  imports: [HviField, HviFieldCounter, HviInput, HviLabel],
  template: \`
    <hvi-field>
      <label hviLabel for="counter-textarea" weight="medium">Kort beskrivelse</label>
      <span data-field="description">Maks 200 tegn</span>
      <textarea hviInput id="counter-textarea" rows="4" maxlength="200"></textarea>
      <hvi-field-counter [limit]="200" />
    </hvi-field>
  \`,
})
export class TextareaMedTegntellerExampleComponent {
  
}
`;
