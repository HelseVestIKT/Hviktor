import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import {
  HviDetails,
  HviDetailsContent,
  HviDetailsSummary,
  HviHeading,
  HviParagraph,
} from '@helsevestikt/hviktor';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';

// Register TypeScript language
hljs.registerLanguage('typescript', typescript);

/**
 * Wrapper for en demo-seksjon med tittel og innhold.
 * Bruk `class` på innholdet for å tilpasse layout.
 */
@Component({
  selector: 'app-demo-section',
  standalone: true,
  imports: [HviHeading, HviParagraph, HviDetails, HviDetailsSummary, HviDetailsContent],
  template: `
    <section class="my-8 rounded-lg border border-neutral-300 p-6">
      <h2 hviHeading size="md">{{ title() }}</h2>
      <p hviParagraph>{{ description() }}</p>
      <div class="mt-4">
        <ng-content />
      </div>
      @if (code()) {
        <div class="mt-4 max-w-3xl">
          <hvi-details (onToggle)="onDetailsToggle($event)">
            <hvi-details-summary>
              <p hviParagraph>Vis kode</p>
            </hvi-details-summary>
            <hvi-details-content>
              <pre>
                <code #codeBlock class="language-typescript rounded">{{ code() }}</code>
              </pre>
            </hvi-details-content>
          </hvi-details>
        </div>
      }
    </section>
  `,
})
export class DemoSectionComponent implements AfterViewInit {
  title = input.required<string>();
  description = input<string>();
  code = input<string>();

  codeBlock = viewChild<ElementRef<HTMLElement>>('codeBlock');
  private highlighted = false;

  ngAfterViewInit() {
    this.highlightCode();
  }

  onDetailsToggle(event: Event) {
    // Highlight when details is opened
    if ((event.target as HTMLDetailsElement)?.open) {
      this.highlightCode();
    }
  }

  private highlightCode() {
    if (this.highlighted) return;

    const el = this.codeBlock()?.nativeElement;
    if (el && this.code()) {
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
        hljs.highlightElement(el);
        this.highlighted = true;
      }, 0);
    }
  }
}
