import { Component, signal } from '@angular/core';
import { HviParagraph, HviToggleGroup, HviToggleGroupItem } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { ToggleGroupGrunnleggendeExampleSource } from './code-examples/toggle-group.grunnleggende.example.source';
import { ToggleGroupKunIkonerExampleSource } from './code-examples/toggle-group.kun-ikoner.example.source';
import { ToggleGroupSecondaryVariantExampleSource } from './code-examples/toggle-group.secondary-variant.example.source';
import { ToggleGroupVisningsvalgExampleSource } from './code-examples/toggle-group.visningsvalg.example.source';
@Component({
  selector: 'app-toggle-group-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    HviToggleGroup,
    HviToggleGroupItem,
    HviParagraph,
  ],
  template: `
    <app-demo-page
      title="ToggleGroup"
      description="ToggleGroup samler relaterte alternativ. Komponenten består av ei gruppe knappar som heng saman, der berre éin knapp er mogleg å velje om gongen."
    >
      <!-- Grunnleggende -->
      <app-demo-section
        title="Grunnleggende"
        [code]="grunnleggendeCode"
        description="En enkel toggle group med tekst-knapper."
      >
        <hvi-toggle-group [(value)]="selectedBasic" variant="primary">
          <button hviToggleGroupItem value="innboks">Innboks</button>
          <button hviToggleGroupItem value="utkast">Utkast</button>
          <button hviToggleGroupItem value="arkiv">Arkiv</button>
          <button hviToggleGroupItem value="sendt">Sendt</button>
        </hvi-toggle-group>
        <p hviParagraph class="mt-2">Valgt: {{ selectedBasic() }}</p>
      </app-demo-section>

      <!-- Secondary variant -->
      <app-demo-section
        title="Secondary variant"
        [code]="secondaryVariantCode"
        description="ToggleGroup med secondary variant."
      >
        <hvi-toggle-group [(value)]="selectedSecondary" variant="secondary">
          <button hviToggleGroupItem value="innboks">Innboks</button>
          <button hviToggleGroupItem value="utkast">Utkast</button>
          <button hviToggleGroupItem value="arkiv">Arkiv</button>
          <button hviToggleGroupItem value="sendt">Sendt</button>
        </hvi-toggle-group>
      </app-demo-section>

      <!-- Kun ikoner (med tekst som placeholder) -->
      <app-demo-section
        title="Kun ikoner"
        [code]="kunIkonerCode"
        description="ToggleGroup med kun ikoner. Bruk icon-attributtet for å style knappene som kun-ikon."
      >
        <hvi-toggle-group [(value)]="selectedIconOnly" variant="primary">
          <button hviToggleGroupItem value="left" icon aria-label="Venstrestilt">⬅</button>
          <button hviToggleGroupItem value="center" icon aria-label="Midtstilt">⬆</button>
          <button hviToggleGroupItem value="right" icon aria-label="Høyrestilt">➡</button>
        </hvi-toggle-group>
      </app-demo-section>

      <!-- Visningsvalg -->
      <app-demo-section
        title="Visningsvalg"
        [code]="visningsvalgCode"
        description="Eksempel på bruk for å veksle mellom visninger."
      >
        <hvi-toggle-group [(value)]="selectedView" variant="primary">
          <button hviToggleGroupItem value="liste">Liste</button>
          <button hviToggleGroupItem value="rutenett">Rutenett</button>
          <button hviToggleGroupItem value="kompakt">Kompakt</button>
        </hvi-toggle-group>
        <p hviParagraph class="mt-2">Viser innhold som: {{ selectedView() }}</p>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class ToggleGroupDemoComponent {
  readonly grunnleggendeCode = ToggleGroupGrunnleggendeExampleSource;
  readonly secondaryVariantCode = ToggleGroupSecondaryVariantExampleSource;
  readonly kunIkonerCode = ToggleGroupKunIkonerExampleSource;
  readonly visningsvalgCode = ToggleGroupVisningsvalgExampleSource;

  selectedBasic = signal('innboks');
  selectedSecondary = signal('innboks');
  selectedIconOnly = signal('left');
  selectedView = signal('liste');
}
