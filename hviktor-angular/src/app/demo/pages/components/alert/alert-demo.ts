import { Component } from '@angular/core';
import { HviAlert } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-alert-demo',
  standalone: true,
  imports: [HviAlert, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page
      title="Alert"
      description="Varselmeldinger for å informere brukeren om viktig informasjon."
    >
      <app-demo-section title="Varianter">
        <div class="flex flex-wrap gap-2">
          <hvi-alert>Dette er en info alert</hvi-alert>
          <hvi-alert color="success">Dette er en success alert</hvi-alert>
          <hvi-alert color="warning">Dette er en warning alert</hvi-alert>
          <hvi-alert color="danger">Dette er en danger alert</hvi-alert>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class AlertDemoComponent {}
