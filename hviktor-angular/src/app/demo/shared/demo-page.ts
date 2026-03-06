import { Component, computed, input } from '@angular/core';
import { HviHeading, HviLink, HviLogo, HviParagraph } from '@helsevestikt/hviktor';
import { DEMO_COMPONENTS, designSystemUrl } from '../demo-components';

/**
 * Wrapper-komponent for demo-sider.
 * Viser tittel og beskrivelse, og projiserer innholdet.
 */
@Component({
  selector: 'app-demo-page',
  standalone: true,
  imports: [HviHeading, HviParagraph, HviLink, HviLogo],
  template: `
    <article>
      <header class="mb-8">
        <div class="flex items-center gap-3">
          <h1 hviHeading size="xl">{{ title() }}</h1>
          @if (isHvi()) {
            <hvi-logo company="dots" size="sm" aria-hidden="true" class="size-6 shrink-0" />
          }
          @if (dsHref()) {
            <a
              hviLink
              [href]="dsHref()"
              target="_blank"
              rel="noopener noreferrer"
              title="Se {{ title() }} i Designsystemet"
              class="inline-flex shrink-0"
            >
              <img src="assets/ds.svg" alt="Åpne i Designsystemet" class="size-6" />
            </a>
          }
        </div>
        <p hviParagraph>{{ description() }}</p>
      </header>
      <ng-content />
    </article>
  `,
})
export class DemoPageComponent {
  title = input.required<string>();
  description = input.required<string>();

  /** Computed: om komponenten er en Hviktor-egen komponent. */
  isHvi = computed(() => {
    const match = DEMO_COMPONENTS.find((c) => c.name === this.title());
    return match?.hvi ?? false;
  });

  /** Computed DS-lenke basert på komponentens tittel. */
  dsHref = computed(() => {
    const match = DEMO_COMPONENTS.find((c) => c.name === this.title());
    return match?.ds ? designSystemUrl(match.id) : null;
  });
}
