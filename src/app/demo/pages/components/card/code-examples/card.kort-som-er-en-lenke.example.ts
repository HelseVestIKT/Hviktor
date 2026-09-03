import { Component } from '@angular/core';

@Component({
  selector: 'app-card-kort-som-er-en-lenke-example',
  standalone: true,
  template: `
    som ytterst element. Dette er nyttig når du ønsker at all tekst og innhold i Card blir lest opp
    av skjermlesere som én sammenhengende lenke." >
    <div class="flex flex-wrap gap-4">
      <a hviCardLink href="https://www.helse-bergen.no/" maxWidth="420px" rel="noopener noreferrer">
        <div hviCardBlock>
          <h2 hviHeading>Helse Bergen</h2>
          <p hviParagraph>Hele kortet er klikkbart og navigerer brukeren til en ny URL.</p>
          <p hviParagraph size="sm">helse-bergen.no</p>
        </div>
      </a>
      <a hviCardLink routerLink="/komponenter/button" maxWidth="420px">
        <div hviCardBlock>
          <h2 hviHeading>Button-komponenten</h2>
          <p hviParagraph>Internt lenkekort som navigerer til en annen side i appen.</p>
        </div>
      </a>
    </div>
  `,
})
export class CardKortSomErEnLenkeExampleComponent {}
