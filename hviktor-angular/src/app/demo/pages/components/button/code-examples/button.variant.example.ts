import { Component } from '@angular/core';
import { HviButton } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-button-variant-example',
  standalone: true,
  imports: [HviButton],
  template: `
    <div class="flex flex-wrap gap-2">
      <button hviButton>Primary (default)</button>
      <button hviButton variant="secondary">Secondary</button>
      <button hviButton variant="tertiary">Tertiary</button>
    </div>
  `,
})
export class ButtonVariantExampleComponent {}
