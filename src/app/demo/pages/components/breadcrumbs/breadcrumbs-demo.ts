import { Component } from '@angular/core';
import { HviBreadcrumbs, HviLink } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { BreadcrumbsStandardExampleSource } from './code-examples/breadcrumbs.standard.example.source';
@Component({
  selector: 'app-breadcrumbs-demo',
  standalone: true,
  imports: [HviBreadcrumbs, HviLink, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page componentId="breadcrumbs">
      <app-demo-section title="Standard" [code]="standardCode">
        <div class="flex items-center gap-2">
          <hvi-breadcrumbs>
            <a hviLink href="#" aria-label="Tilbake til Nivå 3">Nivå 3</a>
            <ol>
              <li><a hviLink href="#">Nivå 1</a></li>
              <li><a hviLink href="#">Nivå 2</a></li>
              <li><a hviLink href="#">Nivå 3</a></li>
              <li><a hviLink href="#">Nivå 4</a></li>
            </ol>
          </hvi-breadcrumbs>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class BreadcrumbsDemoComponent {
  readonly standardCode = BreadcrumbsStandardExampleSource;
}
