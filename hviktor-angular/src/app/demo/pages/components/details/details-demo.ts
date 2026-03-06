import { Component } from '@angular/core';
import { HviCard, HviDetails, HviDetailsContent, HviDetailsSummary } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { DetailsIKortExampleSource } from './code-examples/details.i-kort.example.source';
import { DetailsVarianterExampleSource } from './code-examples/details.varianter.example.source';
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
    <app-demo-page componentId="details">
      <app-demo-section title="Varianter" [code]="varianterCode">
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

      <app-demo-section title="I kort" [code]="iKortCode">
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
export class DetailsDemoComponent {
  readonly varianterCode = DetailsVarianterExampleSource;
  readonly iKortCode = DetailsIKortExampleSource;
}
