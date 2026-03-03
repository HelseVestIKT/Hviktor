// Auto-generated - do not edit manually
export const ToggleGroupKunIkonerExampleSource = `import { Component, signal } from '@angular/core';
import { HviToggleGroup, HviToggleGroupItem } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-toggle-group-kun-ikoner-example',
  standalone: true,
  imports: [HviToggleGroup, HviToggleGroupItem],
  template: \`
    <hvi-toggle-group [(value)]="selectedIconOnly" variant="primary">
      <button hviToggleGroupItem value="left" icon aria-label="Venstrestilt">⬅</button>
      <button hviToggleGroupItem value="center" icon aria-label="Midtstilt">⬆</button>
      <button hviToggleGroupItem value="right" icon aria-label="Høyrestilt">➡</button>
    </hvi-toggle-group>
  \`,
})
export class ToggleGroupKunIkonerExampleComponent {
  selectedIconOnly = signal('left');
}
`;
