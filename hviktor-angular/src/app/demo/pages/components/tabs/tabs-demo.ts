import { Component, signal } from '@angular/core';
import { HviTab, HviTabPanel, HviTabs } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { TabsGrunnleggendeBrukExampleSource } from './code-examples/tabs.grunnleggende-bruk.example.source';
import { TabsKontrollertExampleSource } from './code-examples/tabs.kontrollert.example.source';
import { TabsMedMerInnholdExampleSource } from './code-examples/tabs.med-mer-innhold.example.source';
@Component({
  selector: 'app-tabs-demo',
  standalone: true,
  imports: [HviTabs, HviTab, HviTabPanel, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page
      title="Tabs"
      description="Tabs lar brukerne navigere mellom relaterte deler av innholdet, der én del vises om gangen."
    >
      <app-demo-section title="Grunnleggende bruk" [code]="grunnleggendeBrukCode">
        <hvi-tabs defaultValue="tab1">
          <hvi-tab value="tab1">Tab 1</hvi-tab>
          <hvi-tab value="tab2">Tab 2</hvi-tab>
          <hvi-tab value="tab3">Tab 3</hvi-tab>
          <hvi-tab-panel value="tab1">Innhold 1</hvi-tab-panel>
          <hvi-tab-panel value="tab2">Innhold 2</hvi-tab-panel>
          <hvi-tab-panel value="tab3">Innhold 3</hvi-tab-panel>
        </hvi-tabs>
      </app-demo-section>

      <app-demo-section title="Kontrollert" [code]="kontrollertCode">
        <p class="ds-paragraph">Valgt tab: {{ selectedTab() }}</p>
        <hvi-tabs [value]="selectedTab()" (valueChange)="selectedTab.set($event)">
          <hvi-tab value="value1">Tab 1</hvi-tab>
          <hvi-tab value="value2">Tab 2</hvi-tab>
          <hvi-tab value="value3">Tab 3</hvi-tab>
          <hvi-tab-panel value="value1">Innhold for tab 1</hvi-tab-panel>
          <hvi-tab-panel value="value2">Innhold for tab 2</hvi-tab-panel>
          <hvi-tab-panel value="value3">Innhold for tab 3</hvi-tab-panel>
        </hvi-tabs>
      </app-demo-section>

      <app-demo-section title="Med mer innhold" [code]="medMerInnholdCode">
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
                I denne seksjonen kan du konfigurere ulike innstillinger. Tilpass oppsettet etter
                dine behov og preferanser.
              </p>
            </div>
          </hvi-tab-panel>
        </hvi-tabs>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class TabsDemoComponent {
  readonly grunnleggendeBrukCode = TabsGrunnleggendeBrukExampleSource;
  readonly kontrollertCode = TabsKontrollertExampleSource;
  readonly medMerInnholdCode = TabsMedMerInnholdExampleSource;

  selectedTab = signal('value1');
}
