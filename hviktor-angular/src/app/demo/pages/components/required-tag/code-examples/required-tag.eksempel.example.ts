import { Component } from '@angular/core';
import { HviLabel, HviParagraph, HviRequiredTag } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-required-tag-eksempel-example',
  standalone: true,
  imports: [HviLabel, HviParagraph, HviRequiredTag],
  template: `
    <div class="space-y-4">
      <div>
        <p hviParagraph>
          <code>all-required</code> brukes i starten av et skjema der alle felt er påkrevd.
        </p>
        <hvi-required-tag mode="all-required" />
      </div>

      <p hviParagraph>
        I skjema med en blanding av påkrevde og valgfrie felt skal hvert felt merkes individuelt.
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
  `,
})
export class RequiredTagEksempelExampleComponent {}
