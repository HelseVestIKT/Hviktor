import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { HviSuggestion, HviSuggestionCompleteEvent } from '@helsevestikt/hviktor-angular';
import { Subject, debounceTime, delay, distinctUntilChanged, of, switchMap } from 'rxjs';
import { Kommune } from '../suggestion-demo';

@Component({
  selector: 'app-suggestion-sok-i-backend-example',
  standalone: true,
  imports: [FormsModule, HviSuggestion],
  template: `
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
  `,
})
export class SuggestionSokIBackendExampleComponent {
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
