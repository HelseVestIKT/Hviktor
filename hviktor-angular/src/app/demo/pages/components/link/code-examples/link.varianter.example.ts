import { Component } from '@angular/core';
import { HviLink } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-link-varianter-example',
  standalone: true,
  imports: [HviLink],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <a hviLink href="#" color="neutral">Neutral link</a>
      <a hviLink href="#" target="_blank" rel="noopener noreferrer">Ekstern link</a>
    </div>
  `,
})
export class LinkVarianterExampleComponent {}
