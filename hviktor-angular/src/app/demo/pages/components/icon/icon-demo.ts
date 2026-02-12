import { Component } from '@angular/core';
import { HviButton, HviCard, HviIcon, HviLink, HviParagraph } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-icon-demo',
  standalone: true,
  imports: [
    HviIcon,
    HviCard,
    HviButton,
    HviLink,
    HviParagraph,
    DemoPageComponent,
    DemoSectionComponent,
  ],
  template: `
    <app-demo-page title="Icon" description="Ikoner for visuell kommunikasjon.">
      <app-demo-section title="Tilgjengelige ikoner">
        <div class="flex flex-wrap gap-4">
          <hvi-card>
            <hvi-icon icon="ArrowLeft"></hvi-icon>
            <p hviParagraph>ArrowLeft</p>
          </hvi-card>
          <hvi-card>
            <hvi-icon icon="ArrowUp"></hvi-icon>
            <p hviParagraph>ArrowUp</p>
          </hvi-card>
          <hvi-card>
            <hvi-icon icon="ArrowRight"></hvi-icon>
            <p hviParagraph>ArrowRight</p>
          </hvi-card>
          <hvi-card>
            <hvi-icon icon="ArrowDown"></hvi-icon>
            <p hviParagraph>ArrowDown</p>
          </hvi-card>
          <hvi-card>
            <hvi-icon icon="Person"></hvi-icon>
            <p hviParagraph>Person</p>
          </hvi-card>
          <hvi-card>
            <hvi-icon icon="ExclamationmarkTriangle"></hvi-icon>
            <p hviParagraph>ExclamationmarkTriangle</p>
          </hvi-card>
          <hvi-card>
            <hvi-icon icon="Triangle"></hvi-icon>
            <p hviParagraph>Triangle</p>
          </hvi-card>
        </div>
      </app-demo-section>

      <app-demo-section title="Størrelser">
        <div class="flex flex-wrap gap-4">
          <hvi-card>
            <hvi-icon icon="ArrowLeft" size="sm"></hvi-icon>
            <p hviParagraph>sm</p>
          </hvi-card>
          <hvi-card>
            <hvi-icon icon="ArrowLeft"></hvi-icon>
            <p hviParagraph>md</p>
          </hvi-card>
          <hvi-card>
            <hvi-icon icon="ArrowLeft" size="lg"></hvi-icon>
            <p hviParagraph>lg</p>
          </hvi-card>
          <hvi-card>
            <hvi-icon icon="ArrowLeft" size="xl"></hvi-icon>
            <p hviParagraph>xl</p>
          </hvi-card>
        </div>
      </app-demo-section>

      <app-demo-section title="Brukseksempler">
        <div class="flex flex-wrap items-center gap-4">
          <button hviButton color="brand1">
            <hvi-icon icon="ArrowLeft" ariaHidden></hvi-icon>
            Button with icon
          </button>
          <button hviButton color="brand1" variant="tertiary">
            <hvi-icon icon="ArrowLeft" ariaHidden></hvi-icon>
            Button with icon
          </button>
          <a hviLink href="#">
            <hvi-icon icon="ArrowLeft"></hvi-icon>
            Link med ikon venstre
          </a>
          <a hviLink href="#">
            Link med ikon høyre
            <hvi-icon icon="ArrowRight"></hvi-icon>
          </a>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class IconDemoComponent {}
