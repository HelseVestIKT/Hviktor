import { Component } from '@angular/core';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-radio-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page title="Radio" description="Radio komponent">
      <app-demo-section title="Eksempel">
        <div class="flex flex-wrap gap-2">
          <!-- Legg til demo-innhold her -->
          <p>Demo for Radio</p>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class RadioDemoComponent {}
