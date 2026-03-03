import { Component } from '@angular/core';
import { HviCard, HviHeading, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-card-standard-example',
  standalone: true,
  imports: [HviCard, HviHeading, HviParagraph],
  template: `
    <div class="flex flex-wrap gap-4">
      <hvi-card maxWidth="320px">
        <h2 hviHeading>Lykkeland Barneskole</h2>
        <p hviParagraph>
          Lykkeland Barneskole er ein trygg og inkluderande nærskule der leik, læring og
          nysgjerrigheit går hand i hand.
        </p>
        <p hviParagraph size="sm">Solslett kommune</p>
      </hvi-card>
    </div>
  `,
})
export class CardStandardExampleComponent {}
