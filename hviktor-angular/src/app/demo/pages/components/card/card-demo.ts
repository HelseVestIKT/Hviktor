import { Component } from '@angular/core';
import { HviButton, HviCard, HviCardBlock, HviHeading, HviParagraph } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-card-demo',
  standalone: true,
  imports: [
    HviCard,
    HviCardBlock,
    HviButton,
    HviHeading,
    HviParagraph,
    DemoPageComponent,
    DemoSectionComponent,
  ],
  template: `
    <app-demo-page title="Card" description="Kort for gruppering av relatert innhold.">
      <app-demo-section title="Standard">
        <div class="flex flex-wrap gap-4">
          <hvi-card maxWidth="320px">
            <h2 hviHeading>Lykkeland Barnehage</h2>
            <p hviParagraph>
              Lykkeland Barneskole er ein trygg og inkluderande nærskule der leik, læring og
              nysgjerrigheit går hand i hand.
            </p>
            <p hviParagraph size="sm">Solslett kommune</p>
          </hvi-card>
        </div>
      </app-demo-section>

      <app-demo-section title="Med farge og blokker">
        <div class="flex flex-wrap gap-4">
          <hvi-card color="accent" variant="tinted" maxWidth="320px">
            <div hviCardBlock>
              <video controls width="100%">
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              </video>
            </div>
            <div hviCardBlock>
              <h3 hviHeading>Se en film</h3>
              <p hviParagraph>En veldig, veldig, veldig gøy film!</p>
              <button hviButton variant="secondary">Handling</button>
            </div>
          </hvi-card>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class CardDemoComponent {}
