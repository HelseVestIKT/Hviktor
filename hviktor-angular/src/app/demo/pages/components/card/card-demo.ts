import { Component } from '@angular/core';
import {
  HviButton,
  HviCard,
  HviCardBlock,
  HviHeading,
  HviLink,
  HviParagraph,
} from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

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
  ],
  template: `
    <app-demo-page title="Card" description="Kort for gruppering av relatert innhold.">
      <app-demo-section title="Standard">
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

      <app-demo-section title="Farger og varianter">
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

      <app-demo-section title="Med inndeling">
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

      <app-demo-section title="Lenkekort">
        <div class="flex flex-wrap gap-4">
          <hvi-card color="neutral" maxWidth="420px">
            <div hviCardBlock>
              <h2 hviHeading>
                <a
                  hviLink
                  href="https://designsystemet.no"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Myrkheim Museum</a
                >
              </h2>
              <p hviParagraph>
                Myrkheim Museum ligg i dalen mellom dei gamle fjelltoppane og viser utstillingar frå
                tida då dei fyrste reisefølgja kryssa landet.
              </p>
              <p hviParagraph size="sm">Myrkheim Kulturvernråd</p>
            </div>
          </hvi-card>
        </div>
      </app-demo-section>

      <app-demo-section title="Kort som knapp (rå HTML)">
        <div class="flex flex-wrap gap-4">
          <button
            type="button"
            class="ds-card"
            data-variant="default"
            data-color="neutral"
            style="max-width:420px"
          >
            <div class="ds-card__block">
              <h2 class="ds-heading">Innstillinger og personvern</h2>
            </div>
            <div class="ds-card__block">
              <p class="ds-paragraph" data-variant="default">
                Dette åpner en dialog der du kan oppdatere personvernvalg, justere innstillinger og
                tilpasse hvordan tjenesten behandler informasjonen din.
              </p>
            </div>
          </button>
        </div>
      </app-demo-section>

      <app-demo-section title="Horisontal visning">
        <div class="flex flex-wrap gap-4">
          <hvi-card
            color="neutral"
            maxWidth="700px"
            style="display:grid;grid-template-columns:1fr 1fr"
          >
            <div hviCardBlock>
              <h2 hviHeading>Vandrefeber</h2>
            </div>
            <div hviCardBlock>
              <p hviParagraph>
                Symptomer kan være uro i kroppen, skjerpet årvåkenhet og en tendens til å stadig se
                seg over skulderen.
              </p>
            </div>
          </hvi-card>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class CardDemoComponent {}
