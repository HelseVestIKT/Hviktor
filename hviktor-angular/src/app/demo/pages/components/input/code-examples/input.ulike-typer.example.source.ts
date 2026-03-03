// Auto-generated - do not edit manually
export const InputUlikeTyperExampleSource = `import { Component } from '@angular/core';
import { HviField, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-input-ulike-typer-example',
  standalone: true,
  imports: [HviField, HviInput, HviLabel],
  template: \`
    <div class="grid gap-4">
      <hvi-field>
        <label hviLabel for="email-input" weight="medium">E-post</label>
        <input hviInput type="email" id="email-input" placeholder="navn@eksempel.no" />
      </hvi-field>
    
      <hvi-field>
        <label hviLabel for="password-input" weight="medium">Passord</label>
        <input hviInput type="password" id="password-input" placeholder="••••••••" />
      </hvi-field>
    
      <hvi-field>
        <label hviLabel for="number-input" weight="medium">Tall</label>
        <input hviInput type="number" id="number-input" placeholder="0" />
      </hvi-field>
    
      <hvi-field>
        <label hviLabel for="date-input" weight="medium">Dato</label>
        <input hviInput type="date" id="date-input" />
      </hvi-field>
    
      <hvi-field>
        <label hviLabel for="tel-input" weight="medium">Telefon</label>
        <input hviInput type="tel" id="tel-input" placeholder="+47 123 45 678" />
      </hvi-field>
    </div>
  \`,
})
export class InputUlikeTyperExampleComponent {
  
}
`;
