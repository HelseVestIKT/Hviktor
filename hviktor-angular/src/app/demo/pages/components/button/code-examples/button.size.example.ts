import { Component } from '@angular/core';
import { HviButton } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-button-size-example',
  standalone: true,
  imports: [HviButton],
  template: `
    <div class="flex flex-wrap gap-2">
      <button hviButton size="sm">Small</button>
      <button hviButton size="md">Medium (Default)</button>
      <button hviButton size="lg">Large</button>
    </div>
  `,
})
export class ButtonSizeExampleComponent {}
