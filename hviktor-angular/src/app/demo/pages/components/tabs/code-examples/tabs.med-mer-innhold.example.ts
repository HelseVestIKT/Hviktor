import { Component, signal } from '@angular/core';
import { HviTab, HviTabPanel, HviTabs } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-tabs-med-mer-innhold-example',
  standalone: true,
  imports: [HviTab, HviTabPanel, HviTabs],
  template: `
    <hvi-tabs defaultValue="overview">
      <hvi-tab value="overview">Oversikt</hvi-tab>
      <hvi-tab value="details">Detaljer</hvi-tab>
      <hvi-tab value="settings">Innstillinger</hvi-tab>
      <hvi-tab-panel value="overview">
        <div class="ds-paragraph">
          <p>
            Dette er oversiktssiden. Her kan du se generell informasjon om emnet du ser på.
            Oversikten gir deg en rask innføring i de viktigste punktene.
          </p>
        </div>
      </hvi-tab-panel>
      <hvi-tab-panel value="details">
        <div class="ds-paragraph">
          <p>
            Her finner du mer detaljert informasjon. Denne seksjonen inneholder utdypende
            beskrivelser og tekniske detaljer som kan være nyttige for videre arbeid.
          </p>
        </div>
      </hvi-tab-panel>
      <hvi-tab-panel value="settings">
        <div class="ds-paragraph">
          <p>
            I denne seksjonen kan du konfigurere ulike innstillinger. Tilpass oppsettet etter dine
            behov og preferanser.
          </p>
        </div>
      </hvi-tab-panel>
    </hvi-tabs>
  `,
})
export class TabsMedMerInnholdExampleComponent {
  selectedTab = signal('value1');
}
