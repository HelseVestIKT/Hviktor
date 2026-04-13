import {
  Component,
  computed,
  contentChildren,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  signal,
} from '@angular/core';
import {
  HviButton,
  HviHeading,
  HviLink,
  HviLogo,
  HviParagraph,
  HviTag,
} from '@helsevestikt/hviktor';
import { DEMO_COMPONENTS, designSystemUrl } from '../demo-components';
import { DemoSectionComponent } from './demo-section';

import '@helsevestikt/hviktor-icons/icon-clipboard-checkmark.webcomponent';
import '@helsevestikt/hviktor-icons/icon-clipboard.webcomponent';

/**
 * Wrapper-komponent for demo-sider.
 * Tar inn `componentId` og slår opp navn og beskrivelse fra DEMO_COMPONENTS.
 */
@Component({
  selector: 'app-demo-page',
  standalone: true,
  imports: [HviButton, HviHeading, HviParagraph, HviLink, HviLogo, HviTag],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="xl:flex xl:gap-8">
      <article class="min-w-0 flex-1">
        <header class="mb-8">
          <div class="flex justify-between">
            <div class="flex items-center gap-3">
              <h1 hviHeading size="xl">{{ name() }}</h1>
              @if (codeTested()) {
                <hvi-tag color="info">Kode testet ✓</hvi-tag>
              }
              @if (a11yTested()) {
                <hvi-tag color="brand2">A11y testet ✓</hvi-tag>
              }
            </div>
            <button hviButton variant="secondary" size="sm" (click)="copyPageAsMarkdown()">
              @if (copied()) {
                <hvi-icon-clipboard-checkmark />
                Kopiert!
              } @else {
                <hvi-icon-clipboard />
                Kopiér Markdown
              }
            </button>
          </div>
          @if (isHvi()) {
            <div class="mb-2 flex items-center gap-2">
              <hvi-logo company="dots" size="sm" aria-hidden="true" />
              <p hviParagraph>Denne komponenten er laget av oss.</p>
            </div>
          }
          @if (dsHref()) {
            <a
              hviLink
              [href]="dsHref()"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-2 inline-flex items-center gap-1.5"
            >
              <img src="assets/ds.svg" alt="" class="size-5" />
              Se {{ name() }} i Designsystemet
            </a>
          }
          <p hviParagraph class="max-w-lg">{{ description() }}</p>
        </header>
        <ng-content />
      </article>

      @if (sections().length) {
        <nav class="hidden xl:block xl:w-48 xl:shrink-0" aria-label="På denne siden">
          <div class="sticky top-24">
            <p hviHeading>På denne siden</p>
            <ul class="list-none space-y-1">
              @for (section of sections(); track section.sectionId()) {
                <li>
                  <a
                    hviLink
                    color="neutral"
                    [href]="'#' + section.sectionId()"
                    class="block py-1 pl-3"
                    (click)="scrollTo($event, section.sectionId())"
                  >
                    {{ section.title() }}
                  </a>
                </li>
              }
            </ul>
          </div>
        </nav>
      }
    </div>
  `,
})
export class DemoPageComponent {
  componentId = input.required<string>();

  sections = contentChildren(DemoSectionComponent);
  copied = signal(false);

  scrollTo(event: Event, id: string) {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  copyPageAsMarkdown() {
    const lines: string[] = [];
    lines.push(`# ${this.name()}`);
    lines.push('');
    if (this.description()) {
      lines.push(this.description());
      lines.push('');
    }
    const dsUrl = this.dsHref();
    if (dsUrl) {
      lines.push(`Designsystemet: ${dsUrl}`);
      lines.push('');
    }

    for (const section of this.sections()) {
      lines.push(`## ${section.title()}`);
      lines.push('');
      const desc = section.description();
      if (desc) {
        lines.push(desc);
        lines.push('');
      }
      const code = section.code();
      if (code) {
        lines.push('```typescript');
        lines.push(code);
        lines.push('```');
        lines.push('');
      }
    }

    const markdown = lines.join('\n');
    const writeText = navigator.clipboard?.writeText;

    if (!writeText) {
      return;
    }

    writeText
      .call(navigator.clipboard, markdown)
      .then(() => {
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
      })
      .catch((error) => {
        console.error('Kunne ikke kopiere markdown til utklippstavlen.', error);
      });
  }

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

  /** Om komponenten har beståtte enhetstester. */
  codeTested = computed(() => this.component()?.codeTested ?? false);

  /** Om komponenten har beståtte A11y-tester. */
  a11yTested = computed(() => this.component()?.a11yTested ?? false);
}
