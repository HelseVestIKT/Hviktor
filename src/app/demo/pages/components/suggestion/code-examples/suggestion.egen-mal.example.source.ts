// Auto-generated - do not edit manually
export const SuggestionEgenMalExampleSource = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HviSuggestion, HviSuggestionCompleteEvent } from '@helsevestikt/hviktor-angular';
import { Kommando } from '../suggestion-demo';

@Component({
  selector: 'app-suggestion-egen-mal-example',
  standalone: true,
  imports: [FormsModule, HviSuggestion],
  template: \`
    <hvi-suggestion
      label="Velg kommando"
      placeholder="Skriv en kommando..."
      optionLabel="navn"
      dataKey="id"
      [filter]="false"
      [completeOnFocus]="true"
      [(ngModel)]="valgtKommando"
      [suggestions]="filtrerteKommandoer"
      (completeMethod)="sok($event)"
    >
      <ng-template let-kommando #item>
        <span class="font-medium">{{ kommando.navn }}</span>
        <span class="text-xs">{{ kommando.hurtigtast }}</span>
      </ng-template>
    </hvi-suggestion>
  \`,
})
export class SuggestionEgenMalExampleComponent {
  readonly kommandoer: Kommando[] = [
    { id: 1, navn: 'Kommando 1', hurtigtast: 'Ctrl+1' },
    { id: 2, navn: 'Kommando 2', hurtigtast: 'Ctrl+2' },
    { id: 3, navn: 'Kommando 3', hurtigtast: 'Ctrl+3' },
  ];

  filtrerteKommandoer: Kommando[] = [];
  valgtKommando: Kommando | null = null;

  sok(event: HviSuggestionCompleteEvent): void {
    const query = event.query.toLowerCase();
    this.filtrerteKommandoer = query
      ? this.kommandoer.filter((k) => k.navn.toLowerCase().includes(query))
      : [...this.kommandoer];
  }
}
`;
