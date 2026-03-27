import { Component } from '@angular/core';
import {
  HviInput,
  HviLabel,
  HviSuggestion,
  HviSuggestionDatalist,
  HviSuggestionOption,
} from '@helsevestikt/hviktor';

@Component({
  selector: 'app-suggestion-flervalg-example',
  standalone: true,
  imports: [HviInput, HviLabel, HviSuggestion, HviSuggestionDatalist, HviSuggestionOption],
  template: `
    <div class="flex flex-wrap gap-2">
      <div class="flex-col">
        <label hviLabel>Velg kommuner</label>
        <hvi-suggestion [multiple]="true">
          <input hviInput type="text" placeholder="Skriv for å søke..." list="my-popover" />
          <del aria-label="Tøm" hidden=""></del>
          <hvi-suggestion-datalist>
            <hvi-suggestion-option label="Sogndal" value="Sogndal"> Sogndal </hvi-suggestion-option>
            <hvi-suggestion-option label="Bergen" value="Bergen"> Bergen </hvi-suggestion-option>
            <hvi-suggestion-option label="Oslo" value="Oslo"> Oslo </hvi-suggestion-option>
          </hvi-suggestion-datalist>
        </hvi-suggestion>
      </div>
    </div>
  `,
})
export class SuggestionFlervalgExampleComponent {}
