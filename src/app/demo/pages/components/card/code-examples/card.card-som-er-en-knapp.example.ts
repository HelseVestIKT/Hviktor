import { Component } from '@angular/core';
import { HviCardBlock, HviCardButton, HviHeading, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-card-card-som-er-en-knapp-example',
  standalone: true,
  imports: [HviCardBlock, HviCardButton, HviHeading, HviParagraph],
  template: `
    <div class="flex flex-wrap gap-4">
      <button hviCardButton maxWidth="420px">
        <div hviCardBlock>
          <h2 hviHeading>Innstillinger og personvern</h2>
          <p hviParagraph>
            Dette åpner en dialog der du kan oppdatere personvernvalg, justere innstillinger og
            tilpasse hvordan tjenesten behandler informasjonen din. Du kan se gjennom endringene før
            du lagrer.
          </p>
          <p hviParagraph size="sm">Innstillinger og personvern</p>
        </div>
      </button>
    </div>
  `,
})
export class CardCardSomErEnKnappExampleComponent {}
