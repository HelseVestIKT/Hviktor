import { Component } from '@angular/core';
import { HviTag } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-tag-varianter-example',
  standalone: true,
  imports: [HviTag],
  template: `
    <div class="flex flex-wrap gap-2">
      <hvi-tag variant="default">Default</hvi-tag>
      <hvi-tag variant="outline">Outline</hvi-tag>
    </div>
  `,
})
export class TagVarianterExampleComponent {}
