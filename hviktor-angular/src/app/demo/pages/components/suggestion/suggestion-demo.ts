import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  HviAlert,
  HviInput,
  HviLabel,
  HviLink,
  HviSuggestion,
  HviSuggestionDatalist,
  HviSuggestionOption,
} from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { SuggestionFlervalgExampleSource } from './code-examples/suggestion.flervalg.example.source';
import { SuggestionStandardSuggestionExampleSource } from './code-examples/suggestion.standard-suggestion.example.source';
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
    HviAlert,
    HviLink,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <app-demo-page componentId="suggestion">
      <hvi-alert
        >Suggestion er fortsatt under utvikling både her og i
        <a
          hviLink
          href="https://designsystemet.no/no/components/docs/suggestion/overview"
          target="_blank"
          rel="noopener noreferrer"
          >Designsystemet</a
        >
        og kan derfor ikke anses som ferdig</hvi-alert
      >
      <app-demo-section title="Standard Suggestion" [code]="standardSuggestionCode">
        <div class="flex flex-wrap gap-2">
          <div class="flex-col">
            <label hviLabel>Velg en kommune</label>
            <hvi-suggestion>
              <input hviInput type="text" placeholder="Skriv for å søke..." list="my-popover" />
              <del aria-label="Tøm" hidden=""></del>
              <hvi-suggestion-datalist>
                <hvi-suggestion-option label="Sogndal" value="Sogndal">
                  Sogndal
                </hvi-suggestion-option>
                <hvi-suggestion-option label="Bergen" value="Bergen">
                  Bergen
                </hvi-suggestion-option>
                <hvi-suggestion-option label="Oslo" value="Oslo"> Oslo </hvi-suggestion-option>
              </hvi-suggestion-datalist>
            </hvi-suggestion>
          </div>
        </div>
      </app-demo-section>

      <app-demo-section title="Flervalg" [code]="flervalgCode">
        <div class="flex flex-wrap gap-2">
          <div class="flex-col">
            <label hviLabel>Velg kommuner</label>
            <hvi-suggestion [multiple]="true">
              <input hviInput type="text" placeholder="Skriv for å søke..." list="my-popover" />
              <del aria-label="Tøm" hidden=""></del>
              <hvi-suggestion-datalist>
                <hvi-suggestion-option label="Sogndal" value="Sogndal">
                  Sogndal
                </hvi-suggestion-option>
                <hvi-suggestion-option label="Bergen" value="Bergen">
                  Bergen
                </hvi-suggestion-option>
                <hvi-suggestion-option label="Oslo" value="Oslo"> Oslo </hvi-suggestion-option>
              </hvi-suggestion-datalist>
            </hvi-suggestion>
          </div>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class SuggestionDemoComponent {
  readonly standardSuggestionCode = SuggestionStandardSuggestionExampleSource;
  readonly flervalgCode = SuggestionFlervalgExampleSource;
}
