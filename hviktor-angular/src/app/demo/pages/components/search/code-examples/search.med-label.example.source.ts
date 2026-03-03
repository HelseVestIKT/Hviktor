// Auto-generated - do not edit manually
export const SearchMedLabelExampleSource = `import { Component } from '@angular/core';
import { HviButton, HviField, HviInput, HviLabel, HviSearch, HviSearchClear } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-search-med-label-example',
  standalone: true,
  imports: [HviButton, HviField, HviInput, HviLabel, HviSearch, HviSearchClear],
  template: \`
    <hvi-field>
      <label hviLabel weight="medium">Søk etter katter</label>
      <hvi-search>
        <input hviInput type="search" placeholder="" name="cat-search" />
        <button hviSearchClear aria-label="Tøm"></button>
        <button hviButton variant="primary" type="submit">Søk</button>
      </hvi-search>
    </hvi-field>
  \`,
})
export class SearchMedLabelExampleComponent {
  
}
`;
