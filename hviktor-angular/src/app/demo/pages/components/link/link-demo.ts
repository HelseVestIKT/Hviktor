import { Component } from '@angular/core';
import { HviLink } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { LinkVarianterExampleSource } from './code-examples/link.varianter.example.source';
@Component({
  selector: 'app-link-demo',
  standalone: true,
  imports: [HviLink, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page componentId="link">
      <app-demo-section title="Varianter" [code]="varianterCode">
        <div class="flex flex-wrap items-center gap-4">
          <a hviLink href="#" color="neutral">Neutral link</a>
          <a hviLink href="#" target="_blank" rel="noopener noreferrer">Ekstern link</a>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class LinkDemoComponent {
  readonly varianterCode = LinkVarianterExampleSource;
}
