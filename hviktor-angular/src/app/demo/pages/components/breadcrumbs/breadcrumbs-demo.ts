import { Component } from '@angular/core';
import { HviBreadcrumbs } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-breadcrumbs-demo',
  standalone: true,
  imports: [HviBreadcrumbs, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page
      title="Breadcrumbs"
      description="Navigasjonssti som viser brukerens posisjon i hierarkiet."
    >
      <app-demo-section title="Standard">
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
      </app-demo-section>
    </app-demo-page>
  `,
})
export class BreadcrumbsDemoComponent {}
