import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  HviButton,
  HviCard,
  HviCardBlock,
  HviCardButton,
  HviCardLink,
  HviHeading,
  HviLink,
  HviParagraph,
} from '@helsevestikt/hviktor-angular';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { CardCardSomErEnKnappExampleSource } from './code-examples/card.card-som-er-en-knapp.example.source';
import { CardFargerOgVarianterExampleSource } from './code-examples/card.farger-og-varianter.example.source';
import { CardLenkekortExampleSource } from './code-examples/card.lenkekort.example.source';
import { CardMedInndelingExampleSource } from './code-examples/card.med-inndeling.example.source';
import { CardStandardExampleSource } from './code-examples/card.standard.example.source';
@Component({
  selector: 'app-card-demo',
  standalone: true,
  imports: [
    HviCard,
    HviCardBlock,
    HviButton,
    HviHeading,
    HviLink,
    HviParagraph,
    DemoPageComponent,
    DemoSectionComponent,
    HviCardButton,
    HviCardLink,
    RouterLink,
  ],
  template: `
    <app-demo-page componentId="card">
      <app-demo-section title="Standard" [code]="standardCode">
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
      </app-demo-section>

      <app-demo-section title="Farger og varianter" [code]="fargerOgVarianterCode">
        <div class="flex flex-wrap gap-4">
          <hvi-card color="accent" variant="default" maxWidth="220px">
            <div hviCardBlock>
              <p hviParagraph>default: accent</p>
            </div>
          </hvi-card>

          <hvi-card color="brand1" variant="default" maxWidth="220px">
            <div hviCardBlock>
              <p hviParagraph>default: brand1</p>
            </div>
          </hvi-card>

          <hvi-card color="brand2" variant="tinted" maxWidth="220px">
            <div hviCardBlock>
              <p hviParagraph>tinted: brand2</p>
            </div>
          </hvi-card>

          <hvi-card color="neutral" variant="tinted" maxWidth="220px">
            <div hviCardBlock>
              <p hviParagraph>tinted: neutral</p>
            </div>
          </hvi-card>
        </div>
      </app-demo-section>

      <app-demo-section title="Med inndeling" [code]="medInndelingCode">
        <div class="flex flex-wrap gap-4">
          <hvi-card color="accent" variant="tinted" maxWidth="380px">
            <div hviCardBlock>
              <video controls width="100%">
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              </video>
            </div>
            <div hviCardBlock>
              <h3 hviHeading>Om Designsystemet</h3>
              <p hviParagraph>
                Videoen over gir en kort introduksjon til hva Designsystemet er, og hvordan det kan
                brukes i utviklingen av digitale tjenester.
              </p>
              <button hviButton variant="secondary">Vis mer</button>
            </div>
          </hvi-card>
        </div>
      </app-demo-section>

      <app-demo-section
        title="Kort med lenkende elementer"
        [code]="lenkekortCode"
        description="Har du et kort med flere interaktive elementer, som lenker eller knapper, kan du bruke data-clickdelegatefor for å gjøre hele kortet klikkbart, samtidig som det beholder semantikken til de interaktive elementene."
      >
        <div class="flex flex-wrap gap-4">
          <hvi-card color="neutral" maxWidth="420px" clickDelegateFor="target1">
            <div hviCardBlock>
              <h2 hviHeading>
                <a
                  id="target1"
                  hviLink
                  href="https://www.helse-bergen.no/"
                  rel="noopener noreferrer"
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
          <hvi-card color="neutral" maxWidth="420px" clickDelegateFor="target2">
            <div hviCardBlock>
              <h2 hviHeading>
                <a
                  id="target2"
                  hviLink
                  href="https://helsevestikt.github.io/hviktor/komponenter/fieldset"
                  rel="noopener noreferrer"
                  >Fieldset</a
                >
              </h2>
              <p hviParagraph>Dette er et lenkekort som lenker til en intern side.</p>
            </div>
          </hvi-card>
        </div>
      </app-demo-section>

      <app-demo-section
        title="Kort som er en lenke"
        description="Hele kortet kan brukes som en lenke ved å bruke <a> som ytterst element. Dette er nyttig når du ønsker at all tekst og innhold i Card blir lest opp av skjermlesere som én sammenhengende lenke."
      >
        <div class="flex flex-wrap gap-4">
          <a
            hviCardLink
            href="https://www.helse-bergen.no/"
            maxWidth="420px"
            rel="noopener noreferrer"
          >
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
      </app-demo-section>

      <app-demo-section title="Card som er en knapp" [code]="cardSomErEnKnappCode">
        <div class="flex flex-wrap gap-4">
          <button hviCardButton maxWidth="420px">
            <div hviCardBlock>
              <h2 hviHeading>Innstillinger og personvern</h2>
              <p hviParagraph>
                Dette åpner en dialog der du kan oppdatere personvernvalg, justere innstillinger og
                tilpasse hvordan tjenesten behandler informasjonen din. Du kan se gjennom endringene
                før du lagrer.
              </p>
              <p hviParagraph size="sm">Innstillinger og personvern</p>
            </div>
          </button>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class CardDemoComponent {
  readonly cardSomErEnKnappCode = CardCardSomErEnKnappExampleSource;
  readonly standardCode = CardStandardExampleSource;
  readonly fargerOgVarianterCode = CardFargerOgVarianterExampleSource;
  readonly medInndelingCode = CardMedInndelingExampleSource;
  readonly lenkekortCode = CardLenkekortExampleSource;
}
