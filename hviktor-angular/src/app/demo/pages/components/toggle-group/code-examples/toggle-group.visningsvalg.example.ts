import { Component, signal } from '@angular/core';
import { HviParagraph, HviToggleGroup, HviToggleGroupItem } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-toggle-group-visningsvalg-example',
  standalone: true,
  imports: [HviParagraph, HviToggleGroup, HviToggleGroupItem],
  template: `
    <hvi-toggle-group [(value)]="selectedView" variant="primary">
      <button hviToggleGroupItem value="liste">Liste</button>
      <button hviToggleGroupItem value="rutenett">Rutenett</button>
      <button hviToggleGroupItem value="kompakt">Kompakt</button>
    </hvi-toggle-group>
    <p hviParagraph class="mt-2">Viser innhold som: {{ selectedView() }}</p>
  `,
})
export class ToggleGroupVisningsvalgExampleComponent {
  selectedView = signal('liste');
}
