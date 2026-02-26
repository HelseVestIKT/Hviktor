import { Component } from '@angular/core';
import { HviButton } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-button-varianter-example',
  standalone: true,
  imports: [HviButton],
  template: `
    <div class="flex flex-wrap gap-2">
      <button hviButton icon>⚙️</button>
      <button hviButton loading>Loading...</button>
      <button hviButton fullWidth>Full Width</button>
    </div>
  `,
})
export class ButtonVarianterExampleComponent {}
