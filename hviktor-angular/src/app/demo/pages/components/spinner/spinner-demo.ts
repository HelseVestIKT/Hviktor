import { Component } from '@angular/core';
import { HviSpinner } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { SpinnerStandardExampleSource } from './code-examples/spinner.standard.example.source';
import { SpinnerStorrelserExampleSource } from './code-examples/spinner.storrelser.example.source';
@Component({
  selector: 'app-spinner-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent, HviSpinner],
  template: `
    <app-demo-page
      title="Spinner"
      description="Spinner brukes for å indikere at innhold eller en handling er i ferd med å laste, og at brukeren må vente før de kan fortsette."
    >
      <app-demo-section title="Standard" [code]="standardCode">
        <div class="flex flex-wrap items-center gap-4">
          <hvi-spinner label="Laster innhold" />
        </div>
      </app-demo-section>

      <app-demo-section
        title="Størrelser"
        [code]="storrelserCode"
        description="Spinner kommer i flere størrelser fra 2xs til xl."
      >
        <div class="flex flex-wrap items-end gap-6">
          <div class="flex flex-col items-center gap-2">
            <hvi-spinner label="Laster" size="2xs" />
            <span>2xs</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <hvi-spinner label="Laster" size="xs" />
            <span>xs</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <hvi-spinner label="Laster" size="sm" />
            <span>sm</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <hvi-spinner label="Laster" size="md" />
            <span>md</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <hvi-spinner label="Laster" size="lg" />
            <span>lg</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <hvi-spinner label="Laster" size="xl" />
            <span>xl</span>
          </div>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class SpinnerDemoComponent {
  readonly standardCode = SpinnerStandardExampleSource;
  readonly storrelserCode = SpinnerStorrelserExampleSource;
}
