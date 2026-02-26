import { Component } from '@angular/core';
import { HviBreadcrumbs } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-breadcrumbs-standard-example',
  standalone: true,
  imports: [HviBreadcrumbs],
  template: `
    <div class="flex items-center gap-2">
      <nav
        hviBreadcrumbs
        ariaLabel="Du er her:"
        [backLink]="{
          label: 'Nivå 3',
          href: '#',
          ariaLabel: 'Tilbake til Nivå 3',
        }"
        [items]="[
          { label: 'Nivå 1', href: '#' },
          { label: 'Nivå 2', href: '#' },
          { label: 'Nivå 3', href: '#' },
          { label: 'Nivå 4', href: '#' },
        ]"
      ></nav>
    </div>
  `,
})
export class BreadcrumbsStandardExampleComponent {}
