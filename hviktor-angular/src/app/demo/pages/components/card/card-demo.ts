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

      <app-demo-section title="Lenkekort" [code]="lenkekortCode">
        <div class="flex flex-wrap gap-4">
          <hvi-card color="neutral" maxWidth="420px">
            <div hviCardBlock>
              <h2 hviHeading>
                <a
                  hviLink
                  href="https://designsystemet.no/no/components/docs/card/overview#lenkekort"
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
    </app-demo-page>
  `,
})
export class CardDemoComponent {
  readonly standardCode = CardStandardExampleSource;
  readonly fargerOgVarianterCode = CardFargerOgVarianterExampleSource;
  readonly medInndelingCode = CardMedInndelingExampleSource;
  readonly lenkekortCode = CardLenkekortExampleSource;
}
