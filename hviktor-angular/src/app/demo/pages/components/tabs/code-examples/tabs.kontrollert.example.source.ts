// Auto-generated - do not edit manually
export const TabsKontrollertExampleSource = `import { Component, signal } from '@angular/core';
import { HviTab, HviTabPanel, HviTabs } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-tabs-kontrollert-example',
  standalone: true,
  imports: [HviTab, HviTabPanel, HviTabs],
  template: \`
    <p class="ds-paragraph">Valgt tab: {{ selectedTab() }}</p>
    <hvi-tabs [value]="selectedTab()" (valueChange)="selectedTab.set($event)">
      <hvi-tab value="value1">Tab 1</hvi-tab>
      <hvi-tab value="value2">Tab 2</hvi-tab>
      <hvi-tab value="value3">Tab 3</hvi-tab>
      <hvi-tab-panel value="value1">Innhold for tab 1</hvi-tab-panel>
      <hvi-tab-panel value="value2">Innhold for tab 2</hvi-tab-panel>
      <hvi-tab-panel value="value3">Innhold for tab 3</hvi-tab-panel>
    </hvi-tabs>
  \`,
})
export class TabsKontrollertExampleComponent {
  selectedTab = signal('value1');
}
`;
