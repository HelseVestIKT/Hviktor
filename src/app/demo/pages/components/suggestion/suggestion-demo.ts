import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  HviAlert,
  HviLink,
  HviSuggestion,
  HviSuggestionCompleteEvent,
} from '@helsevestikt/hviktor-angular';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { SuggestionEgenMalExampleSource } from './code-examples/suggestion.egen-mal.example.source';
import { SuggestionFlervalgExampleSource } from './code-examples/suggestion.flervalg.example.source';
import { SuggestionStandardSuggestionExampleSource } from './code-examples/suggestion.standard-suggestion.example.source';

interface Kommando {
  id: number;
  navn: string;
  hurtigtast: string;
}

@Component({
  selector: 'app-suggestion-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent, FormsModule, HviSuggestion, HviAlert, HviLink],
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
        <hvi-suggestion
          label="Velg en kommune"
          placeholder="Skriv for å søke..."
          [(ngModel)]="kommune"
          [suggestions]="kommuner"
        />
        <p>Valgt: {{ kommune ?? 'ingen' }}</p>
      </app-demo-section>

      <app-demo-section title="Flervalg" [code]="flervalgCode">
        <hvi-suggestion
          label="Velg kommuner"
          placeholder="Skriv for å søke..."
          [multiple]="true"
          [(ngModel)]="valgteKommuner"
          [suggestions]="kommuner"
        />
        <p>Valgt: {{ valgteKommuner.join(', ') || 'ingen' }}</p>
      </app-demo-section>

      <app-demo-section title="Egen mal og eget søk" [code]="egenMalCode">
        <hvi-suggestion
          label="Velg kommando"
          description="Søket kjøres mot en egen liste"
          placeholder="Skriv en kommando..."
          optionLabel="navn"
          dataKey="id"
          [filter]="false"
          [completeOnFocus]="true"
          [(ngModel)]="valgtKommando"
          [suggestions]="filtrerteKommandoer"
          (completeMethod)="sokKommandoer($event)"
        >
          <ng-template let-kommando #item>
            <span class="font-medium">{{ kommando.navn }}</span>
            <span class="text-xs">{{ kommando.hurtigtast }}</span>
          </ng-template>
        </hvi-suggestion>
        <p>Valgt: {{ valgtKommando?.navn ?? 'ingen' }}</p>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class SuggestionDemoComponent {
  readonly standardSuggestionCode = SuggestionStandardSuggestionExampleSource;
  readonly flervalgCode = SuggestionFlervalgExampleSource;
  readonly egenMalCode = SuggestionEgenMalExampleSource;

  readonly kommuner = ['Sogndal', 'Bergen', 'Oslo', 'Stavanger', 'Trondheim'];

  kommune: string | null = 'Bergen';
  valgteKommuner: string[] = ['Bergen'];

  readonly kommandoer: Kommando[] = [
    { id: 1, navn: 'Nytt dokument', hurtigtast: '⌘N' },
    { id: 2, navn: 'Åpne', hurtigtast: '⌘O' },
    { id: 3, navn: 'Lagre', hurtigtast: '⌘S' },
    { id: 4, navn: 'Lagre som', hurtigtast: '⇧⌘S' },
    { id: 5, navn: 'Søk', hurtigtast: '⌘F' },
  ];

  filtrerteKommandoer: Kommando[] = [];
  valgtKommando: Kommando | null = null;

  sokKommandoer(event: HviSuggestionCompleteEvent): void {
    const query = event.query.toLowerCase();
    this.filtrerteKommandoer = query
      ? this.kommandoer.filter((k) => k.navn.toLowerCase().includes(query))
      : [...this.kommandoer];
  }
}
