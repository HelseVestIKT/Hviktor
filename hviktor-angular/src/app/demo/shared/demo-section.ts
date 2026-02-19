import { Component, input } from '@angular/core';
import { HviHeading, HviParagraph } from '@helsevestikt/hviktor';

/**
 * Wrapper for en demo-seksjon med tittel og innhold.
 * Bruk `class` på innholdet for å tilpasse layout.
 */
@Component({
  selector: 'app-demo-section',
  standalone: true,
  imports: [HviHeading, HviParagraph],
  template: `
    <section class="my-8 rounded-lg border border-neutral-300 p-6">
      <h2 hviHeading size="md">{{ title() }}</h2>
      <p hviParagraph>{{ description() }}</p>
      <div class="mt-4">
        <ng-content />
      </div>
    </section>
  `,
})
export class DemoSectionComponent {
  title = input.required<string>();
  description = input<string>();
}
