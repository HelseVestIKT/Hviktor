import { Component } from '@angular/core';
import {
  HviButton,
  HviDivider,
  HviField,
  HviInput,
  HviLabel,
  HviSearch,
  HviSearchClear,
} from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-search-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    HviSearch,
    HviSearchClear,
    HviInput,
    HviButton,
    HviField,
    HviLabel,
    HviDivider,
  ],
  template: `
    <app-demo-page
      title="Search"
      description="Search lar brukere raskt finne relevant innhold på et nettsted eller i en applikasjon. Komponenten består av et søkefelt, med eller uten en søkeknapp."
    >
      <!-- Grunnleggende -->
      <app-demo-section title="Grunnleggende" description="Et søkefelt med tøm-knapp og søkeknapp.">
        <hvi-search>
          <input hviInput type="search" placeholder="" aria-label="Søk" />
          <button hviSearchClear type="reset" aria-label="Tøm"></button>
          <button hviButton variant="primary" type="submit">Søk</button>
        </hvi-search>
      </app-demo-section>

      <!-- Varianter -->
      <app-demo-section
        title="Varianter"
        description="Du kan endre variant på Button for å tilpasse visningen. Alternativt kan du fjerne knappen for å bruke et søkefelt med ikon."
      >
        <div class="grid gap-4">
          <!-- Kun med ikon -->
          <hvi-search>
            <input hviInput type="search" placeholder="" aria-label="Søk" />
            <button hviSearchClear type="reset" aria-label="Tøm"></button>
          </hvi-search>

          <hr hviDivider aria-hidden="true" />

          <!-- Med primær knapp -->
          <hvi-search>
            <input hviInput type="search" placeholder="" aria-label="Søk" />
            <button hviSearchClear type="reset" aria-label="Tøm"></button>
            <button hviButton variant="primary" type="submit">Søk</button>
          </hvi-search>

          <hr hviDivider aria-hidden="true" />

          <!-- Med sekundær knapp -->
          <hvi-search>
            <input hviInput type="search" placeholder="" aria-label="Søk" />
            <button hviSearchClear type="reset" aria-label="Tøm"></button>
            <button hviButton variant="secondary" type="submit">Søk</button>
          </hvi-search>
        </div>
      </app-demo-section>

      <!-- Med Label -->
      <app-demo-section
        title="Med Label"
        description="Bruk en label over søkefeltet når det ikke er åpenbart hva brukeren skal søke etter."
      >
        <hvi-field>
          <label hviLabel weight="medium">Søk etter katter</label>
          <hvi-search>
            <input hviInput type="search" placeholder="" name="cat-search" />
            <button hviSearchClear type="reset" aria-label="Tøm"></button>
            <button hviButton variant="primary" type="submit">Søk</button>
          </hvi-search>
        </hvi-field>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class SearchDemoComponent {}
