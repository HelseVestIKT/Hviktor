import { Component } from '@angular/core';
import { HviLink } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-link-demo',
  standalone: true,
  imports: [HviLink, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page title="Link" description="Lenker for navigasjon og eksterne ressurser.">
      <app-demo-section title="Varianter">
        <div class="flex flex-wrap items-center gap-4">
          <a hviLink href="#" color="neutral">Neutral link</a>
          <a hviLink href="#" target="_blank" rel="noopener noreferrer">Ekstern link</a>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class LinkDemoComponent {}
