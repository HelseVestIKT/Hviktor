// Auto-generated - do not edit manually
export const SearchVarianterExampleSource = `import { Component } from '@angular/core';
import { HviButton, HviDivider, HviInput, HviSearch, HviSearchClear } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-search-varianter-example',
  standalone: true,
  imports: [HviButton, HviDivider, HviInput, HviSearch, HviSearchClear],
  template: \`
    <div class="grid gap-4">
      <!-- Kun med ikon -->
      <hvi-search>
        <input hviInput type="search" placeholder="" aria-label="Søk" />
        <button hviSearchClear aria-label="Tøm"></button>
      </hvi-search>
    
      <hr hviDivider aria-hidden="true" />
    
      <!-- Med primær knapp -->
      <hvi-search>
        <input hviInput type="search" placeholder="" aria-label="Søk" />
        <button hviSearchClear aria-label="Tøm"></button>
        <button hviButton variant="primary" type="submit">Søk</button>
      </hvi-search>
    
      <hr hviDivider aria-hidden="true" />
    
      <!-- Med sekundær knapp -->
      <hvi-search>
        <input hviInput type="search" placeholder="" aria-label="Søk" />
        <button hviSearchClear aria-label="Tøm"></button>
        <button hviButton variant="secondary" type="submit">Søk</button>
      </hvi-search>
    </div>
  \`,
})
export class SearchVarianterExampleComponent {
  
}
`;
