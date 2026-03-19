import { Component } from '@angular/core';
import { HviAlert, HviHeading, HviParagraph } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';
import { AlertVarianterExampleSource } from './code-examples/alert.varianter.example.source';

import { AlertHeadingOgParagraphExampleSource } from './code-examples/alert.heading-og-paragraph.example.source';
@Component({
  selector: 'app-alert-demo',
  standalone: true,
  imports: [HviAlert, HviHeading, HviParagraph, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page componentId="alert">
      <app-demo-section title="Varianter" [code]="varianterCode">
        <div class="flex flex-wrap gap-2">
          <hvi-alert>Dette er en info alert</hvi-alert>
          <hvi-alert color="success">Dette er en success alert</hvi-alert>
          <hvi-alert color="warning">Dette er en warning alert</hvi-alert>
          <hvi-alert color="danger">Dette er en danger alert</hvi-alert>
        </div>
      </app-demo-section>
      <app-demo-section title="Heading og paragraph" [code]="headingOgParagraphCode">
        <div class="flex flex-wrap gap-2">
          <hvi-alert>
            <h2 hviHeading>Dette er en heading</h2>
            <p hviParagraph>
              Ved å sette en heading og paragraph inni en hvi-alert får du denne stylingen.
            </p>
          </hvi-alert>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class AlertDemoComponent {
  readonly headingOgParagraphCode = AlertHeadingOgParagraphExampleSource;

  readonly varianterCode = AlertVarianterExampleSource;
}
