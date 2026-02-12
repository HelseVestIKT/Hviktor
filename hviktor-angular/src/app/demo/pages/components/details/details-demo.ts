import { Component } from '@angular/core';
import { HviCard, HviDetails, HviDetailsContent, HviDetailsSummary } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-details-demo',
  standalone: true,
  imports: [
    HviDetails,
    HviDetailsSummary,
    HviDetailsContent,
    HviCard,
    DemoPageComponent,
    DemoSectionComponent,
  ],
  template: `
    <app-demo-page title="Details" description="Utvidbart innhold som kan vises eller skjules.">
      <app-demo-section title="Varianter">
        <div class="flex flex-col gap-2">
          <hvi-details variant="tinted">
            <hvi-details-summary>
              <p size="md">Detaljer (tinted)</p>
            </hvi-details-summary>
            <hvi-details-content>
              <p>Her er innholdet i detaljene.</p>
            </hvi-details-content>
          </hvi-details>

          <hvi-details>
            <hvi-details-summary>
              <p size="md">Detaljer (default)</p>
            </hvi-details-summary>
            <hvi-details-content>
              <p>Her er innholdet i detaljene.</p>
            </hvi-details-content>
          </hvi-details>
        </div>
      </app-demo-section>

      <app-demo-section title="I kort">
        <hvi-card color="brand2">
          <hvi-details variant="tinted">
            <hvi-details-summary>
              <p size="md">Detaljer</p>
            </hvi-details-summary>
            <hvi-details-content>
              <p>Her er innholdet i detaljene.</p>
            </hvi-details-content>
          </hvi-details>
          <hvi-details [open]="true">
            <hvi-details-summary>
              <p size="md">Detaljer (åpen)</p>
            </hvi-details-summary>
            <hvi-details-content>
              <p>Her er innholdet i detaljene.</p>
            </hvi-details-content>
          </hvi-details>
        </hvi-card>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class DetailsDemoComponent {}
