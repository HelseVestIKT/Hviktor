import { Component } from '@angular/core';
import { HviTag } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-tag-storrelser-example',
  standalone: true,
  imports: [HviTag],
  template: `
    <div class="flex flex-wrap gap-2">
      <hvi-tag size="sm">Small</hvi-tag>
      <hvi-tag size="md">Medium (default)</hvi-tag>
      <hvi-tag size="lg">Large</hvi-tag>
    </div>
  `,
})
export class TagStorrelserExampleComponent {}
