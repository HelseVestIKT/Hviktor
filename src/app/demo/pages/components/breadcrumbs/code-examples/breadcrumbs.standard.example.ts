import { Component } from '@angular/core';
import { HviBreadcrumbs, HviLink } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-breadcrumbs-standard-example',
  standalone: true,
  imports: [HviBreadcrumbs, HviLink],
  template: `
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
  `,
})
export class BreadcrumbsStandardExampleComponent {}
