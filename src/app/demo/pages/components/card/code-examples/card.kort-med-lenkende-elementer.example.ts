import { Component } from '@angular/core';
import { HviCard } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-card-kort-med-lenkende-elementer-example',
  standalone: true,
  imports: [HviCard],
  template: `
    <div class="flex flex-wrap gap-4">
      <hvi-card color="neutral" maxWidth="420px" clickDelegateFor="target1">
        <div hviCardBlock>
          <h2 hviHeading>
            <a id="target1" hviLink href="https://www.helse-bergen.no/" rel="noopener noreferrer"
              >Helse Bergen (helse-bergen.no)</a
            >
          </h2>
          <p hviParagraph>
            Hvis du skal lenke til en ekstern side, så bør det informeres om til brukeren.
          </p>
          <button hviButton variant="primary" color="accent">Legg til som favoritt</button>
          <p hviParagraph size="sm">Helse Bergen</p>
        </div>
      </hvi-card>
    </div>
  `,
})
export class CardKortMedLenkendeElementerExampleComponent {}
