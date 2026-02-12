import { Component } from '@angular/core';
import { HviButton } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [HviButton, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page title="Button" description="Knapper for handlinger og interaksjoner.">
      <app-demo-section title="Variant">
        <div class="flex flex-wrap gap-2">
          <button hviButton>Primary (default)</button>
          <button hviButton variant="secondary">Secondary</button>
          <button hviButton variant="tertiary">Tertiary</button>
        </div>
      </app-demo-section>

      <app-demo-section title="Color">
        <div class="flex flex-wrap gap-2">
          <button hviButton color="brand1">Brand1</button>
          <button hviButton color="brand2">Brand2</button>
          <button hviButton color="brand3">Brand3</button>
          <button hviButton color="neutral">Neutral</button>
          <button hviButton color="danger">Danger</button>
        </div>
      </app-demo-section>

      <app-demo-section title="Size">
        <div class="flex flex-wrap gap-2">
          <button hviButton size="sm">Small</button>
          <button hviButton size="md">Medium (Default)</button>
          <button hviButton size="lg">Large</button>
        </div>
      </app-demo-section>

      <app-demo-section title="Varianter">
        <div class="flex flex-wrap gap-2">
          <button hviButton icon>⚙️</button>
          <button hviButton loading>Loading...</button>
          <button hviButton fullWidth>Full Width</button>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class ButtonDemoComponent {}
