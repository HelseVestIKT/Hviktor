import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  HviInput,
  HviLabel,
  HviSuggestion,
  HviSuggestionDatalist,
  HviSuggestionOption,
} from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-suggestion-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    HviInput,
    HviSuggestion,
    HviLabel,
    HviSuggestionDatalist,
    HviSuggestionOption,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <app-demo-page componentId="suggestion">
      <app-demo-section title="Standard Suggestion">
        <div class="flex flex-wrap gap-2">
          <!-- Legg til demo-innhold her -->
          <div class="flex-col">
            <!-- <label hviLabel>Velg en kommune</label>
            <hvi-suggestion>
              <input hviInput type="text" placeholder="Skriv for å søke..." list="my-popover" />
              <del aria-label="Tøm" hidden=""></del>
              <u-datalist
                popover="manual"
                data-nofilter=""
                data-sr-plural="%d forslag"
                data-sr-singular="%d forslag"
              >
                <u-option label="Sogndal" value="Sogndal"> Sogndal </u-option>
                <u-option label="Bergen" value="Bergen"> Bergen </u-option>
              </u-datalist>
            </hvi-suggestion> -->

            <hvi-suggestion [multiple]="true">
              <input hviInput type="text" placeholder="Skriv for å søke..." list="my-popover" />
              <del aria-label="Tøm" hidden=""></del>
              <hvi-suggestion-datalist>
                <hvi-suggestion-option label="Sogndal" value="Sogndal">
                  Sogndal
                </hvi-suggestion-option>
              </hvi-suggestion-datalist>
            </hvi-suggestion>
          </div>
        </div>
      </app-demo-section>

      <app-demo-section title="Flervalg">
        <div class="flex flex-wrap gap-2">
          <!-- Legg til demo-innhold her -->
          <div class="flex-col">
            <label hviLabel>Velg en eller flere kommuner</label>
            <hvi-suggestion [multiple]="true">
              <input hviInput type="text" placeholder="Skriv for å søke..." list="my-popover" />
              <del aria-label="Tøm" hidden=""></del>
              <u-datalist
                popover="manual"
                data-nofilter=""
                data-sr-plural="%d forslag"
                data-sr-singular="%d forslag"
              >
                <u-option label="Sogndal" value="Sogndal"> Sogndal </u-option>
                <u-option label="Bergen" value="Bergen"> Bergen </u-option>
              </u-datalist>
            </hvi-suggestion>
          </div>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class SuggestionDemoComponent {}
