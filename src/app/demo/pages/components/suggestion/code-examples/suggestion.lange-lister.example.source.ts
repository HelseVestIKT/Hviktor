export const SuggestionLangeListerExampleSource = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HviSuggestion } from '@helsevestikt/hviktor-angular';
import { Sensor } from '../suggestion-demo';

@Component({
  selector: 'app-suggestion-lange-lister-example',
  standalone: true,
  imports: [FormsModule, HviSuggestion],
  template: \`
    <hvi-suggestion
      label="Velg sensorer"
      description="Lista inneholder 3000 sensorer, men bare 50 rendres av gangen. Skriv for å snevre inn."
      placeholder="Skriv for å søke..."
      optionLabel="navn"
      dataKey="id"
      [multiple]="true"
      [maxVisible]="50"
      [(ngModel)]="valgteSensorer"
      [suggestions]="sensorer"
    />
    <p>Valgt: {{ valgteSensorer.length }} av {{ sensorer.length }}</p>
  \`,
})
export class SuggestionLangeListerExampleComponent {
  /** Stor liste for å vise at bare \`maxVisible\` alternativer havner i DOM. */
  readonly sensorer: Sensor[] = Array.from({ length: 3000 }, (_, i) => ({
    id: i + 1,
    navn: \`Sensor \${String(i + 1).padStart(4, '0')}\`,
  }));

  valgteSensorer: Sensor[] = [];
}`;
