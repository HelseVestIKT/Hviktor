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
    HviButton,
    HviInput,
    HviField,
    HviLabel,
    HviDivider,
  ],
  template: `
    <app-demo-page
      title="Search"
      description="Search lar brukere raskt finne relevant innhold på et nettsted eller i en applikasjon. Komponenten består av et søkefelt, med eller uten en søkeknapp."
    >
      <app-demo-section title="Eksempel">
        <hvi-search>
          <input hviInput type="search" aria-label="Søk" placeholder="" />
          <button hviSearchClear aria-label="Tøm"></button>
          <button hviButton type="submit">Søk</button>
        </hvi-search>
      </app-demo-section>

      <app-demo-section
        title="Varianter"
        description="Du kan endre variant på Button for å tilpasse visningen. Alternativt kan du fjerne knappen for å bruke et søkefelt med ikon."
      >
        <div class="flex flex-col gap-4">
          <!-- Kun med ikon (uten søkeknapp) -->
          <hvi-search>
            <input hviInput type="search" aria-label="Søk" placeholder="" />
            <button hviSearchClear aria-label="Tøm"></button>
          </hvi-search>

          <hr hviDivider />

          <!-- Med primary knapp -->
          <hvi-search>
            <input hviInput type="search" aria-label="Søk" placeholder="" />
            <button hviSearchClear aria-label="Tøm"></button>
            <button hviButton type="submit" variant="primary">Søk</button>
          </hvi-search>

          <hr hviDivider />

          <!-- Med secondary knapp -->
          <hvi-search>
            <input hviInput type="search" aria-label="Søk" placeholder="" />
            <button hviSearchClear aria-label="Tøm"></button>
            <button hviButton type="submit" variant="secondary">Søk</button>
          </hvi-search>
        </div>
      </app-demo-section>

      <app-demo-section
        title="Med Label"
        description="Bruk en label over søkefeltet når det ikke er åpenbart hva brukeren skal søke etter, eller når søkefeltet er en del av et skjema."
      >
        <hvi-field>
          <label hviLabel for="cat-search" weight="medium">Søk etter katter</label>
          <hvi-search>
            <input hviInput type="search" id="cat-search" name="cat-search" placeholder="" />
            <button hviSearchClear aria-label="Tøm"></button>
            <button hviButton type="submit">Søk</button>
          </hvi-search>
        </hvi-field>
      </app-demo-section>

      <app-demo-section title="I skjema" description="Search inne i et form-element.">
        <form (submit)="onSubmit($event)">
          <hvi-search>
            <input hviInput type="search" aria-label="Søk" placeholder="" name="search" />
            <button hviSearchClear aria-label="Tøm"></button>
            <button hviButton type="submit">Søk</button>
          </hvi-search>
        </form>
        @if (submittedValue) {
          <p class="mt-2">Søkte etter: {{ submittedValue }}</p>
        }
      </app-demo-section>
    </app-demo-page>
  `,
})
export class SearchDemoComponent {
  submittedValue = '';

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    this.submittedValue = formData.get('search') as string;
  }
}
