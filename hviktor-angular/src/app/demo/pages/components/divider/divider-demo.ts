import { Component } from '@angular/core';
import { HviDivider, HviParagraph } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { DividerStandardExampleSource } from './code-examples/divider.standard.example.source';
@Component({
  selector: 'app-divider-demo',
  standalone: true,
  imports: [HviDivider, HviParagraph, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page componentId="divider">
      <app-demo-section title="Standard" [code]="standardCode">
        <div class="flex flex-col gap-4">
          <p hviParagraph>Innhold over skillelinjen</p>
          <hr hviDivider />
          <p hviParagraph>Innhold under skillelinjen</p>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class DividerDemoComponent {
  readonly standardCode = DividerStandardExampleSource;
}
