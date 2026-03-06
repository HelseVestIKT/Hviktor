import { Component } from '@angular/core';
import { HviButton } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { ButtonColorExampleSource } from './code-examples/button.color.example.source';
import { ButtonSizeExampleSource } from './code-examples/button.size.example.source';
import { ButtonVariantExampleSource } from './code-examples/button.variant.example.source';
import { ButtonVarianterExampleSource } from './code-examples/button.varianter.example.source';
@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [HviButton, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page componentId="button">
      <app-demo-section title="Variant" [code]="variantCode">
        <div class="flex flex-wrap gap-2">
          <button hviButton>Primary (default)</button>
          <button hviButton variant="secondary">Secondary</button>
          <button hviButton variant="tertiary">Tertiary</button>
        </div>
      </app-demo-section>

      <app-demo-section title="Color" [code]="colorCode">
        <div class="flex flex-wrap gap-2">
          <button hviButton color="brand1">Brand1</button>
          <button hviButton color="brand2">Brand2</button>
          <button hviButton color="brand3">Brand3</button>
          <button hviButton color="neutral">Neutral</button>
          <button hviButton color="danger">Danger</button>
        </div>
      </app-demo-section>

      <app-demo-section title="Size" [code]="sizeCode">
        <div class="flex flex-wrap gap-2">
          <button hviButton size="sm">Small</button>
          <button hviButton size="md">Medium (Default)</button>
          <button hviButton size="lg">Large</button>
        </div>
      </app-demo-section>

      <app-demo-section title="Varianter" [code]="varianterCode">
        <div class="flex flex-wrap gap-2">
          <button hviButton icon>⚙️</button>
          <button hviButton loading>Loading...</button>
          <button hviButton fullWidth>Full Width</button>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class ButtonDemoComponent {
  readonly variantCode = ButtonVariantExampleSource;
  readonly colorCode = ButtonColorExampleSource;
  readonly sizeCode = ButtonSizeExampleSource;
  readonly varianterCode = ButtonVarianterExampleSource;
}
