// Auto-generated - do not edit manually
export const SuggestionFlervalgExampleSource = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HviSuggestion } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-suggestion-flervalg-example',
  standalone: true,
  imports: [FormsModule, HviSuggestion],
  template: \`
    <hvi-suggestion
      label="Velg kommuner"
      placeholder="Skriv for å søke..."
      [multiple]="true"
      [(ngModel)]="valgteKommuner"
      [suggestions]="kommuner"
    />
    <p>Valgt: {{ valgteKommuner.join(', ') || 'ingen' }}</p>
  \`,
})
export class SuggestionFlervalgExampleComponent {
  readonly kommuner = ['Sogndal', 'Bergen', 'Oslo', 'Stavanger', 'Trondheim'];

  kommune: string | null = 'Bergen';
  valgteKommuner: string[] = ['Bergen'];
}
`;
