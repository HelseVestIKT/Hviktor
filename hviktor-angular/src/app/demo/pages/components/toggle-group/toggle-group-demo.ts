import { Component, signal } from '@angular/core';
import { HviParagraph, HviToggleGroup, HviToggleGroupItem } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

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
      <app-demo-section title="Secondary variant" description="ToggleGroup med secondary variant.">
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
  selectedBasic = signal('innboks');
  selectedSecondary = signal('innboks');
  selectedIconOnly = signal('left');
  selectedView = signal('liste');
}
