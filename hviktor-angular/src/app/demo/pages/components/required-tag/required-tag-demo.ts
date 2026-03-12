import { Component } from '@angular/core';
import { HviLabel, HviParagraph, HviRequiredTag } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { RequiredTagEksempelExampleSource } from './code-examples/required-tag.eksempel.example.source';
import { RequiredTagModesExampleSource } from './code-examples/required-tag.modes.example.source';
@Component({
  selector: 'app-required-tag-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent, HviRequiredTag, HviLabel, HviParagraph],
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
      </app-demo-section>

      <app-demo-section
        title="Eksempel"
        [code]="eksempelCode"
        description="RequiredTag brukes sammen med labels i skjema for å indikere om felt er påkrevd eller valgfritt."
      >
        <div class="space-y-4">
          <div>
            <p hviParagraph>
              <code>all-required</code> brukes i starten av et skjema der alle felt er påkrevd.
            </p>
            <hvi-required-tag mode="all-required" />
          </div>

          <p hviParagraph>
            I skjema med en blanding av påkrevde og valgfrie felt skal hvert felt merkes
            individuelt.
          </p>
          <div class="flex gap-1">
            <label hviLabel>Dette feltet er påkrevd</label>
            <hvi-required-tag />
          </div>
          <div class="flex gap-1">
            <label hviLabel>Dette feltet er valgfritt</label>
            <hvi-required-tag mode="optional" />
          </div>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class RequiredTagDemoComponent {
  readonly modesCode = RequiredTagModesExampleSource;
  readonly eksempelCode = RequiredTagEksempelExampleSource;
}
