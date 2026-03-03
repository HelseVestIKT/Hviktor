// Auto-generated - do not edit manually
export const ToggleGroupGrunnleggendeExampleSource = `import { Component, signal } from '@angular/core';
import { HviParagraph, HviToggleGroup, HviToggleGroupItem } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-toggle-group-grunnleggende-example',
  standalone: true,
  imports: [HviParagraph, HviToggleGroup, HviToggleGroupItem],
  template: \`
    <hvi-toggle-group [(value)]="selectedBasic" variant="primary">
      <button hviToggleGroupItem value="innboks">Innboks</button>
      <button hviToggleGroupItem value="utkast">Utkast</button>
      <button hviToggleGroupItem value="arkiv">Arkiv</button>
      <button hviToggleGroupItem value="sendt">Sendt</button>
    </hvi-toggle-group>
    <p hviParagraph class="mt-2">Valgt: {{ selectedBasic() }}</p>
  \`,
})
export class ToggleGroupGrunnleggendeExampleComponent {
  selectedBasic = signal('innboks');
}
`;
