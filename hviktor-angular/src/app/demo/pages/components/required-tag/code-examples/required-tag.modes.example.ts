import { Component } from '@angular/core';
import { HviRequiredTag } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-required-tag-modes-example',
  standalone: true,
  imports: [HviRequiredTag],
  template: `
    <div class="flex flex-wrap gap-2">
      <hvi-required-tag mode="required" />
      <hvi-required-tag mode="optional" />
      <hvi-required-tag mode="all-required" />
    </div>
  `,
})
export class RequiredTagModesExampleComponent {}
