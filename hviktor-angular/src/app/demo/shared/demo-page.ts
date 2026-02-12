import { Component, input } from '@angular/core';
import { HviHeading, HviParagraph } from '@helsevestikt/hviktor';

/**
 * Wrapper-komponent for demo-sider.
 * Viser tittel og beskrivelse, og projiserer innholdet.
 */
@Component({
  selector: 'app-demo-page',
  standalone: true,
  imports: [HviHeading, HviParagraph],
  template: `
    <article>
      <header class="mb-8">
        <h1 hviHeading size="xl">{{ title() }}</h1>
        <p hviParagraph>{{ description() }}</p>
      </header>
      <ng-content />
    </article>
  `,
})
export class DemoPageComponent {
  title = input.required<string>();
  description = input.required<string>();
}
