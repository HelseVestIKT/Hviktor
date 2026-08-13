import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HviSuggestion } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-suggestion-standard-suggestion-example',
  standalone: true,
  imports: [FormsModule, HviSuggestion],
  template: `
    <hvi-suggestion
      label="Velg en kommune"
      placeholder="Skriv for å søke..."
      [(ngModel)]="kommune"
      [suggestions]="kommuner"
    />
    <p>Valgt: {{ kommune ?? 'ingen' }}</p>
  `,
})
export class SuggestionStandardSuggestionExampleComponent {
  readonly kommuner = ['Sogndal', 'Bergen', 'Oslo', 'Stavanger', 'Trondheim'];

  kommune: string | null = 'Bergen';
  valgteKommuner: string[] = ['Bergen'];
}
