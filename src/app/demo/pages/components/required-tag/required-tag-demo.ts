import { Component } from '@angular/core';
import { HviLink, HviParagraph, HviRequiredTag } from '@helsevestikt/hviktor-angular';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { RequiredTagModesExampleSource } from './code-examples/required-tag.modes.example.source';
@Component({
  selector: 'app-required-tag-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent, HviRequiredTag, HviParagraph, HviLink],
  template: `
    <app-demo-page componentId="required-tag">
      <app-demo-section
        title="Modes"
        [code]="modesCode"
        description="RequiredTag har tre modes som styrer tekst og farge."
      >
        <div class="flex flex-wrap gap-2">
          <hvi-required-tag mode="required" />
          <hvi-required-tag mode="optional" />
          <hvi-required-tag mode="all-required" />
        </div>

        <div class="my-4">
          <p hviParagraph>
            Se siden om <a href="/hviktor/komponenter/form" hviLink>Form</a> for flere eksempler.
          </p>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class RequiredTagDemoComponent {
  readonly modesCode = RequiredTagModesExampleSource;
}
