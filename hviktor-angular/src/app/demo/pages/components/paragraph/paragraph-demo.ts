import { Component } from '@angular/core';
import { HviParagraph } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { ParagraphStorrelserExampleSource } from './code-examples/paragraph.storrelser.example.source';
@Component({
  selector: 'app-paragraph-demo',
  standalone: true,
  imports: [HviParagraph, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page componentId="paragraph">
      <app-demo-section title="Størrelser" [code]="storrelserCode">
        <div class="flex flex-col gap-4">
          <p hviParagraph size="lg">
            Large paragraph - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p hviParagraph size="md">
            Medium paragraph (default) - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p hviParagraph size="sm">
            Small paragraph - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class ParagraphDemoComponent {
  readonly storrelserCode = ParagraphStorrelserExampleSource;
}
