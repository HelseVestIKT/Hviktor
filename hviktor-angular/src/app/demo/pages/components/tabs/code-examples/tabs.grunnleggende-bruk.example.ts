import { Component, signal } from '@angular/core';
import { HviTab, HviTabPanel, HviTabs } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-tabs-grunnleggende-bruk-example',
  standalone: true,
  imports: [HviTab, HviTabPanel, HviTabs],
  template: `
    <hvi-tabs defaultValue="tab1">
      <hvi-tab value="tab1">Tab 1</hvi-tab>
      <hvi-tab value="tab2">Tab 2</hvi-tab>
      <hvi-tab value="tab3">Tab 3</hvi-tab>
      <hvi-tab-panel value="tab1">Innhold 1</hvi-tab-panel>
      <hvi-tab-panel value="tab2">Innhold 2</hvi-tab-panel>
      <hvi-tab-panel value="tab3">Innhold 3</hvi-tab-panel>
    </hvi-tabs>
  `,
})
export class TabsGrunnleggendeBrukExampleComponent {
  selectedTab = signal('value1');
}
