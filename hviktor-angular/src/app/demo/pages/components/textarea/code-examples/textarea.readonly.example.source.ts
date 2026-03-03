// Auto-generated - do not edit manually
export const TextareaReadonlyExampleSource = `import { Component } from '@angular/core';
import { HviField, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-textarea-readonly-example',
  standalone: true,
  imports: [HviField, HviInput, HviLabel],
  template: \`
    <hvi-field>
              <label hviLabel for="readonly-textarea" weight="medium">Vilkår</label>
              <textarea hviInput id="readonly-textarea" rows="3" readOnly>
    Dette er skrivebeskyttet innhold som brukeren kan lese men ikke endre.</textarea
              >
            </hvi-field>
  \`,
})
export class TextareaReadonlyExampleComponent {
  
}
`;
