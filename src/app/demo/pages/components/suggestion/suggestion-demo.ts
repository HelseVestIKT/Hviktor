import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {
  HviAlert,
  HviLink,
  HviSuggestion,
  HviSuggestionCompleteEvent,
} from '@helsevestikt/hviktor-angular';
import { debounceTime, delay, distinctUntilChanged, of, Subject, switchMap } from 'rxjs';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { SuggestionEgenMalExampleSource } from './code-examples/suggestion.egen-mal.example.source';
import { SuggestionFlervalgExampleSource } from './code-examples/suggestion.flervalg.example.source';
import { SuggestionStandardSuggestionExampleSource } from './code-examples/suggestion.standard-suggestion.example.source';

import { SuggestionEgenMalForAlternativeneExampleSource } from './code-examples/suggestion.egen-mal-for-alternativene.example.source';
import { SuggestionSokIBackendExampleSource } from './code-examples/suggestion.sok-i-backend.example.source';

export interface Kommando {
  id: number;
  navn: string;
  hurtigtast: string;
}

export interface Kommune {
  nummer: string;
  navn: string;
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

      <app-demo-section title="Søk i backend" [code]="backendSokCode">
        <hvi-suggestion
          label="Søk etter kommune"
          description="Søket kjøres mot et API. Skriv minst to tegn."
          placeholder="Skriv for å søke..."
          optionLabel="navn"
          dataKey="nummer"
          [filter]="false"
          [loading]="laster()"
          [(ngModel)]="valgtKommuneFraApi"
          [suggestions]="apiTreff()"
          (completeMethod)="sokIApi($event)"
        />
        <p>Valgt: {{ valgtKommuneFraApi?.navn ?? 'ingen' }}</p>
      </app-demo-section>

      <app-demo-section title="Egen mal for alternativene" [code]="egenMalCode">
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
  readonly backendSokCode = SuggestionSokIBackendExampleSource;
  readonly egenMalForAlternativeneCode = SuggestionEgenMalForAlternativeneExampleSource;

  readonly kommuner = ['Sogndal', 'Bergen', 'Oslo', 'Stavanger', 'Trondheim'];

  kommune: string | null = 'Bergen';
  valgteKommuner: string[] = ['Bergen'];

  /**
   * Forhåndsvalgt verdi selv om `apiTreff` er tom — komponenten trenger ikke
   * at verdien finnes i forslagslista for å vise den.
   */
  valgtKommuneFraApi: Kommune | null = { nummer: '4601', navn: 'Bergen' };

  readonly apiTreff = signal<Kommune[]>([]);
  readonly laster = signal(false);

  private readonly query = new Subject<string>();

  readonly kommandoer: Kommando[] = [
    { id: 1, navn: 'Nytt dokument', hurtigtast: '⌘N' },
    { id: 2, navn: 'Åpne', hurtigtast: '⌘O' },
    { id: 3, navn: 'Lagre', hurtigtast: '⌘S' },
    { id: 4, navn: 'Lagre som', hurtigtast: '⇧⌘S' },
    { id: 5, navn: 'Søk', hurtigtast: '⌘F' },
  ];

  filtrerteKommandoer: Kommando[] = [];
  valgtKommando: Kommando | null = null;

  constructor() {
    this.query
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => this.hentKommuner(query)),
        takeUntilDestroyed(),
      )
      .subscribe((kommuner) => {
        this.apiTreff.set(kommuner);
        this.laster.set(false);
      });
  }

  sokIApi(event: HviSuggestionCompleteEvent): void {
    if (event.query.length < 2) {
      this.apiTreff.set([]);
      this.laster.set(false);
      return;
    }

    this.laster.set(true);
    this.query.next(event.query);
  }

  sokKommandoer(event: HviSuggestionCompleteEvent): void {
    const query = event.query.toLowerCase();
    this.filtrerteKommandoer = query
      ? this.kommandoer.filter((k) => k.navn.toLowerCase().includes(query))
      : [...this.kommandoer];
  }

  /** Simulert API-kall. I en ekte app ville dette vært en `HttpClient`-forespørsel. */
  private hentKommuner(query: string) {
    const alle: Kommune[] = [
      { nummer: '4601', navn: 'Bergen' },
      { nummer: '4640', navn: 'Sogndal' },
      { nummer: '0301', navn: 'Oslo' },
      { nummer: '1103', navn: 'Stavanger' },
      { nummer: '5001', navn: 'Trondheim' },
      { nummer: '5501', navn: 'Tromsø' },
      { nummer: '4204', navn: 'Kristiansand' },
      { nummer: '3005', navn: 'Drammen' },
    ];

    const treff = alle.filter((k) => k.navn.toLowerCase().includes(query.toLowerCase()));

    return of(treff).pipe(delay(400));
  }
}
