import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HviSuggestion, HviSuggestionCompleteEvent } from '@helsevestikt/hviktor-angular';
import { Kommando } from '../suggestion-demo';

@Component({
  selector: 'app-suggestion-egen-mal-for-alternativene-example',
  standalone: true,
  imports: [FormsModule, HviSuggestion],
  template: `
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
  `,
})
export class SuggestionEgenMalForAlternativeneExampleComponent {
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
