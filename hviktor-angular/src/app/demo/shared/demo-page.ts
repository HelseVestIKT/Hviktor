import { Component, computed, input } from '@angular/core';
import { HviHeading, HviLink, HviLogo, HviParagraph } from '@helsevestikt/hviktor';
import { DEMO_COMPONENTS, designSystemUrl } from '../demo-components';

/**
 * Wrapper-komponent for demo-sider.
 * Tar inn `componentId` og slår opp navn og beskrivelse fra DEMO_COMPONENTS.
 */
@Component({
  selector: 'app-demo-page',
  standalone: true,
  imports: [HviHeading, HviParagraph, HviLink, HviLogo],
  template: `
    <article>
      <header class="mb-8">
        <div class="flex items-center gap-3">
          <h1 hviHeading size="xl">{{ name() }}</h1>
          @if (isHvi()) {
            <hvi-logo company="dots" size="sm" aria-hidden="true" class="size-6 shrink-0" />
          }
          @if (dsHref()) {
            <a
              hviLink
              [href]="dsHref()"
              target="_blank"
              rel="noopener noreferrer"
              title="Se {{ name() }} i Designsystemet"
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
  componentId = input.required<string>();

  /** Slår opp komponent-konfigurasjon fra DEMO_COMPONENTS basert på componentId. */
  private component = computed(() => DEMO_COMPONENTS.find((c) => c.id === this.componentId()));

  /** Komponentens visningsnavn. */
  name = computed(() => this.component()?.name ?? this.componentId());

  /** Komponentens beskrivelse. */
  description = computed(() => this.component()?.description ?? '');

  /** Computed: om komponenten er en Hviktor-egen komponent. */
  isHvi = computed(() => this.component()?.hvi ?? false);

  /** Computed DS-lenke basert på komponentens id. */
  dsHref = computed(() => {
    const comp = this.component();
    return comp?.ds ? designSystemUrl(comp.id) : null;
  });
}
