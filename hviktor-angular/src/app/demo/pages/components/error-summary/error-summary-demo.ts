import { Component } from '@angular/core';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-error-summary-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page
      title="ErrorSummary"
      description="ErrorSummary er en oppsummering av feil. Den gir brukeren oversikt over feil eller mangler som må rettes på en side eller trinn, for å komme videre."
    >
      <app-demo-section title="Eksempel">
        <div class="flex flex-wrap gap-2">
          <!-- Legg til demo-innhold her -->
          <p>Demo for ErrorSummary</p>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class ErrorSummaryDemoComponent {}
