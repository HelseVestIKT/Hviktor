import { Component, input } from '@angular/core';
import { HviHeading } from '@helsevestikt/hviktor';

/**
 * Wrapper for en demo-seksjon med tittel og innhold.
 * Bruk `class` på innholdet for å tilpasse layout.
 */
@Component({
  selector: 'app-demo-section',
  standalone: true,
  imports: [HviHeading],
  template: `
    <section class="mb-8">
      <h2 hviHeading size="md">{{ title() }}</h2>
      <div class="mt-4">
        <ng-content />
      </div>
    </section>
  `,
})
export class DemoSectionComponent {
  title = input.required<string>();
}
