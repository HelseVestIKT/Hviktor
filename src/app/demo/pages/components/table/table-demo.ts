import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import {
  HviButton,
  HviHeading,
  HviInput,
  HviLabel,
  HviMultiSelect,
  HviPagination,
  HviSearch,
  HviSearchClear,
  HviSortableColumn,
  HviTable,
  type SortingFn,
} from '@helsevestikt/hviktor-angular';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import '@helsevestikt/hviktor-icons/icon-chevron-down.webcomponent';
import '@helsevestikt/hviktor-icons/icon-chevron-right.webcomponent';

import { TableCustomSorteringsfunksjonExampleSource } from './code-examples/table.custom-sorteringsfunksjon.example.source';
import { TableEnkelTabellExampleSource } from './code-examples/table.enkel-tabell.example.source';
import { TableGlobaltSokExampleSource } from './code-examples/table.globalt-sok.example.source';
import { TableKolonnefiltreringExampleSource } from './code-examples/table.kolonnefiltrering.example.source';
import { TableKomplettEksempelExampleSource } from './code-examples/table.komplett-eksempel.example.source';
import { TablePagineringExampleSource } from './code-examples/table.paginering.example.source';
import { TableSorteringExampleSource } from './code-examples/table.sortering.example.source';
import { TableUtvidbareRaderEnkeltmodusExampleSource } from './code-examples/table.utvidbare-rader-enkeltmodus.example.source';
import { TableUtvidbareRaderExampleSource } from './code-examples/table.utvidbare-rader.example.source';
import { TableZebrastriperOgBorderExampleSource } from './code-examples/table.zebrastriper-og-border.example.source';

@Component({
  selector: 'app-table-demo',
  standalone: true,
  imports: [
    HviTable,
    HviSortableColumn,
    HviPagination,
    HviButton,
    HviHeading,
    HviSearch,
    HviSearchClear,
    HviInput,
    HviLabel,
    HviMultiSelect,
    DemoPageComponent,
    DemoSectionComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <app-demo-page componentId="table">
      <!-- Enkel tabell -->
      <app-demo-section
        title="Enkel tabell"
        [code]="enkelTabellCode"
        description="En grunnleggende tabell med Designsystemets styling. Bruk data-attributter for zebrastriper, border og hover-effekt."
      >
        <table hviTable>
          <caption>
            Prosjektstatus
          </caption>
          <thead>
            <tr>
              <th scope="col">Prosjekt</th>
              <th scope="col">Status</th>
              <th scope="col">Frist</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Designsystem</td>
              <td>Aktiv</td>
              <td>2026-06-01</td>
            </tr>
            <tr>
              <td>Migrering</td>
              <td>Planlagt</td>
              <td>2026-09-15</td>
            </tr>
            <tr>
              <td>Dokumentasjon</td>
              <td>Aktiv</td>
              <td>2026-05-01</td>
            </tr>
          </tbody>
        </table>
      </app-demo-section>

      <!-- Zebrastriper og border -->
      <app-demo-section
        title="Zebrastriper og border"
        [code]="zebrastriperOgBorderCode"
        description="Bruk zebra og border for å gjøre tabellen enklere å lese. Hover gir visuell tilbakemelding når brukeren holder over en rad."
      >
        <table hviTable zebra border hover>
          <caption>
            Sidevisninger per måned
          </caption>
          <thead>
            <tr>
              <th scope="col">Måned</th>
              <th scope="col">2024</th>
              <th scope="col">2025</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Januar</th>
              <td>1 230</td>
              <td>1 450</td>
            </tr>
            <tr>
              <th scope="row">Februar</th>
              <td>980</td>
              <td>1 120</td>
            </tr>
            <tr>
              <th scope="row">Mars</th>
              <td>1 150</td>
              <td>1 300</td>
            </tr>
          </tbody>
        </table>
      </app-demo-section>

      <!-- Sortering -->
      <app-demo-section
        title="Sortering"
        [code]="sorteringCode"
        description="Legg til sortering på kolonner med hviSortableColumn-direktivet. Klikk på en kolonneoverskrift for å sykle gjennom: ingen → stigende → synkende → ingen."
      >
        <table hviTable [value]="data" #sortTable="hviTable">
          <caption>
            Ansattoversikt
          </caption>
          <thead>
            <tr>
              <th hviSortableColumn="navn" scope="col">
                <button type="button" [attr.aria-label]="getSortLabel(sortTable, 'navn', 'Navn')">
                  Navn
                </button>
              </th>
              <th hviSortableColumn="epost" scope="col">
                <button
                  type="button"
                  [attr.aria-label]="getSortLabel(sortTable, 'epost', 'E-post')"
                >
                  E-post
                </button>
              </th>
              <th hviSortableColumn="avdeling" scope="col">
                <button
                  type="button"
                  [attr.aria-label]="getSortLabel(sortTable, 'avdeling', 'Avdeling')"
                >
                  Avdeling
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            @for (person of sortTable.filteredValue(); track person.id) {
              <tr>
                <td>{{ person.navn }}</td>
                <td>{{ person.epost }}</td>
                <td>{{ person.avdeling }}</td>
              </tr>
            }
          </tbody>
        </table>
      </app-demo-section>

      <!-- Custom sorteringsfunksjon -->
      <app-demo-section
        title="Custom sorteringsfunksjon"
        [code]="customSorteringCode"
        description="Bruk [sortFn] på hviSortableColumn for å gi en kolonne en egendefinert komparator. TanStack reverserer automatisk ved synkende sortering."
      >
        <table hviTable [value]="priorityData" #customSortTable="hviTable">
          <caption>
            Sensoroversikt med prioritetssortering
          </caption>
          <thead>
            <tr>
              <th hviSortableColumn="namn" scope="col">
                <button
                  type="button"
                  [attr.aria-label]="getSortLabel(customSortTable, 'namn', 'Namn')"
                >
                  Namn
                </button>
              </th>
              <th hviSortableColumn="status" [sortFn]="prioritetSort" scope="col">
                <button
                  type="button"
                  [attr.aria-label]="getSortLabel(customSortTable, 'status', 'Status')"
                >
                  Status
                </button>
              </th>
              <th hviSortableColumn="lokasjon" scope="col">
                <button
                  type="button"
                  [attr.aria-label]="getSortLabel(customSortTable, 'lokasjon', 'Lokasjon')"
                >
                  Lokasjon
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            @for (sensor of customSortTable.filteredValue(); track sensor.id) {
              <tr>
                <td>{{ sensor.namn }}</td>
                <td>{{ sensor.status }}</td>
                <td>{{ sensor.lokasjon }}</td>
              </tr>
            }
          </tbody>
        </table>
      </app-demo-section>

      <!-- Globalt søk -->
      <app-demo-section
        title="Globalt søk"
        [code]="globaltSokCode"
        description="Legg til et søkefelt som filtrerer på tvers av alle angitte kolonner. Definer hvilke felter som skal inkluderes med globalFilterFields."
      >
        <h3 hviHeading size="xs" id="ansattoversikt-heading">Ansattoversikt</h3>
        <form
          role="search"
          aria-labelledby="ansattoversikt-heading"
          (submit)="$event.preventDefault()"
          aria-controls="sok-tabell"
        >
          <label hviLabel for="tabell-sok">Søk i tabell</label>
          <p class="ds-paragraph mb-2" id="tabell-sok-beskrivelse">
            Søk etter navn, e-post eller avdeling
          </p>
          <hvi-search>
            <input
              hviInput
              id="tabell-sok"
              type="search"
              aria-describedby="tabell-sok-beskrivelse"
              (input)="searchTable.filterGlobal($any($event.target).value)"
            />
            <button hviSearchClear type="reset" aria-label="Tøm søk"></button>
          </hvi-search>
        </form>
        <p class="ds-paragraph mt-1 mb-3" role="status" aria-live="polite" aria-atomic="true">
          Viser {{ searchTable.totalFilteredRecords() }} av {{ searchTable.totalRecords() }} rader
        </p>
        <table
          hviTable
          id="sok-tabell"
          [value]="data"
          [globalFilterFields]="['navn', 'epost', 'avdeling']"
          zebra
          #searchTable="hviTable"
        >
          <caption>
            Ansatte
          </caption>
          <thead>
            <tr>
              <th scope="col">Navn</th>
              <th scope="col">E-post</th>
              <th scope="col">Avdeling</th>
              <th scope="col">Stilling</th>
            </tr>
          </thead>
          <tbody>
            @for (person of searchTable.filteredValue(); track person.id) {
              <tr>
                <td>{{ person.navn }}</td>
                <td>{{ person.epost }}</td>
                <td>{{ person.avdeling }}</td>
                <td>{{ person.stilling }}</td>
              </tr>
            } @empty {
              <tr>
                <td colspan="4">Ingen treff</td>
              </tr>
            }
          </tbody>
        </table>
      </app-demo-section>

      <!-- Kolonnefiltrering -->
      <app-demo-section
        title="Kolonnefiltrering"
        [code]="kolonnefiltreringCode"
        description="Filtrer på enkeltkolonner med setColumnFilter(). Bruk multi-select i tablehead for flervalgsfiltrering. Hver th bør ha en fast bredde for å unngå at multiselecten vokser horisontalt."
      >
        <p class="ds-paragraph mb-2" role="status" aria-live="polite" aria-atomic="true">
          Viser {{ colFilterTable.totalFilteredRecords() }} av
          {{ colFilterTable.totalRecords() }} rader
        </p>
        <table
          hviTable
          id="filter-tabell"
          [value]="data"
          [columns]="['navn', 'epost', 'avdeling', 'stilling']"
          zebra
          #colFilterTable="hviTable"
        >
          <caption>
            Ansattoversikt
          </caption>
          <thead>
            <tr>
              <th scope="col">Navn</th>
              <th scope="col">Avdeling</th>
              <th scope="col">Stilling</th>
            </tr>
            <tr>
              <td width="30%">
                <hvi-multi-select
                  [options]="navnOptions"
                  placeholder="Alle"
                  searchPlaceholder="Søk navn..."
                  aria-label="Filtrer på navn"
                  aria-controls="filter-tabell"
                  (selectionChange)="colFilterTable.setColumnFilter('navn', $event)"
                />
              </td>
              <td width="30%">
                <hvi-multi-select
                  [options]="avdelingOptions"
                  placeholder="Alle"
                  searchPlaceholder="Søk avdeling..."
                  aria-label="Filtrer på avdeling"
                  aria-controls="filter-tabell"
                  (selectionChange)="colFilterTable.setColumnFilter('avdeling', $event)"
                />
              </td>
              <td width="30%">
                <hvi-multi-select
                  [options]="stillingOptions"
                  placeholder="Alle"
                  searchPlaceholder="Søk stilling..."
                  aria-label="Filtrer på stilling"
                  aria-controls="filter-tabell"
                  (selectionChange)="colFilterTable.setColumnFilter('stilling', $event)"
                />
              </td>
            </tr>
          </thead>
          <tbody>
            @for (person of colFilterTable.filteredValue(); track person.id) {
              <tr>
                <td>{{ person.navn }}</td>
                <td>{{ person.avdeling }}</td>
                <td>{{ person.stilling }}</td>
              </tr>
            } @empty {
              <tr>
                <td colspan="3">Ingen treff</td>
              </tr>
            }
          </tbody>
        </table>
        <button
          hviButton
          variant="tertiary"
          class="mt-2"
          (click)="colFilterTable.clearAllColumnFilters()"
        >
          Nullstill filtre
        </button>
      </app-demo-section>

      <!-- Paginering -->
      <app-demo-section
        title="Paginering"
        [code]="pagineringCode"
        description="Aktiver paginering med paginator-attributtet og sett antall rader med rows. Bruk HviPagination for navigasjon.
        Som standard er [autoResetPageIndex] satt til true. Dette gjør at tabellen automatisk går tilbake til første side ved f. eks. filtrering av tabellen. Dersom du har en tabell som oppdaterer sine verdier svært hyppig kan du sette [autoResetPageIndex] til false på tabellen. Dette forhindrer at tabellen hopper tilbake til første side ved hver oppdatering, som kan være forstyrrende for brukeren."
      >
        <table
          hviTable
          id="paginert-tabell"
          [value]="data"
          paginator
          [rows]="5"
          zebra
          hover
          #pageTable="hviTable"
        >
          <caption>
            Ansattoversikt
          </caption>
          <thead>
            <tr>
              <th hviSortableColumn="navn" scope="col">
                <button type="button" [attr.aria-label]="getSortLabel(pageTable, 'navn', 'Navn')">
                  Navn
                </button>
              </th>
              <th scope="col">E-post</th>
              <th scope="col">Avdeling</th>
            </tr>
          </thead>
          <tbody>
            @for (person of pageTable.paginatedValue(); track person.id) {
              <tr>
                <td>{{ person.navn }}</td>
                <td>{{ person.epost }}</td>
                <td>{{ person.avdeling }}</td>
              </tr>
            }
          </tbody>
        </table>
        <div class="mt-4">
          <hvi-pagination
            aria-label="Sidenavigering for tabell"
            aria-controls="paginert-tabell"
            [totalItems]="pageTable.totalFilteredRecords()"
            [pageSize]="5"
            [currentPage]="pageTable.currentPage()"
            (currentPageChange)="pageTable.goToPage($event)"
          />
        </div>
      </app-demo-section>

      <!-- Row expansion -->
      <app-demo-section
        title="Utvidbare rader"
        [code]="utvidbareRaderCode"
        description="Vis ekstra informasjon under en rad med toggleExpanded() og isExpanded(). Nyttig for detaljer som ikke trenger en egen kolonne."
      >
        <table hviTable [value]="data" hover #expandTable="hviTable">
          <caption>
            Ansattoversikt med kontaktinformasjon
          </caption>
          <thead>
            <tr>
              <th scope="col" style="width: 3rem"><span class="sr-only">Utvid</span></th>
              <th scope="col">Navn</th>
              <th scope="col">Avdeling</th>
              <th scope="col">Stilling</th>
            </tr>
          </thead>
          <tbody>
            @for (person of expandTable.filteredValue(); track person.id) {
              <tr>
                <td>
                  <button
                    hviButton
                    variant="tertiary"
                    (click)="expandTable.toggleExpanded(person)"
                    [attr.aria-expanded]="expandTable.isExpanded(person)"
                    [attr.aria-controls]="'detalj-' + person.id"
                    [ariaLabel]="
                      expandTable.isExpanded(person)
                        ? 'Skjul detaljer om ' + person.navn
                        : 'Vis detaljer om ' + person.navn
                    "
                  >
                    @if (expandTable.isExpanded(person)) {
                      <hvi-icon-chevron-down />
                    } @else {
                      <hvi-icon-chevron-right />
                    }
                  </button>
                </td>
                <td>{{ person.navn }}</td>
                <td>{{ person.avdeling }}</td>
                <td>{{ person.stilling }}</td>
              </tr>
              @if (expandTable.isExpanded(person)) {
                <tr [id]="'detalj-' + person.id">
                  <td colspan="4">
                    <div class="flex gap-8 py-2 pl-12">
                      <dl>
                        <dt>E-post</dt>
                        <dd>{{ person.epost }}</dd>
                      </dl>
                      <dl>
                        <dt>Telefon</dt>
                        <dd>{{ person.telefon }}</dd>
                      </dl>
                    </div>
                  </td>
                </tr>
              }
            }
          </tbody>
        </table>
      </app-demo-section>

      <!-- Row expansion single mode -->
      <app-demo-section
        title="Utvidbare rader (enkeltmodus)"
        [code]="utvidbareRaderSingleCode"
        description="Med expandMode='single' kan bare én rad være åpen om gangen. Å åpne en ny rad lukker den forrige automatisk."
      >
        <table hviTable [value]="data" hover expandMode="single" #singleExpandTable="hviTable">
          <caption>
            Ansattoversikt – kun én rad åpen om gangen
          </caption>
          <thead>
            <tr>
              <th scope="col" style="width: 3rem"><span class="sr-only">Utvid</span></th>
              <th scope="col">Navn</th>
              <th scope="col">Avdeling</th>
              <th scope="col">Stilling</th>
            </tr>
          </thead>
          <tbody>
            @for (person of singleExpandTable.filteredValue(); track person.id) {
              <tr>
                <td>
                  <button
                    hviButton
                    variant="tertiary"
                    (click)="singleExpandTable.toggleExpanded(person)"
                    [attr.aria-expanded]="singleExpandTable.isExpanded(person)"
                    [attr.aria-controls]="'single-detalj-' + person.id"
                    [ariaLabel]="
                      singleExpandTable.isExpanded(person)
                        ? 'Skjul detaljer om ' + person.navn
                        : 'Vis detaljer om ' + person.navn
                    "
                  >
                    @if (singleExpandTable.isExpanded(person)) {
                      <hvi-icon-chevron-down />
                    } @else {
                      <hvi-icon-chevron-right />
                    }
                  </button>
                </td>
                <td>{{ person.navn }}</td>
                <td>{{ person.avdeling }}</td>
                <td>{{ person.stilling }}</td>
              </tr>
              @if (singleExpandTable.isExpanded(person)) {
                <tr [id]="'single-detalj-' + person.id">
                  <td colspan="4">
                    <div class="flex gap-8 py-2 pl-12">
                      <dl>
                        <dt>E-post</dt>
                        <dd>{{ person.epost }}</dd>
                      </dl>
                      <dl>
                        <dt>Telefon</dt>
                        <dd>{{ person.telefon }}</dd>
                      </dl>
                    </div>
                  </td>
                </tr>
              }
            }
          </tbody>
        </table>
      </app-demo-section>

      <!-- Komplett eksempel -->
      <app-demo-section
        title="Komplett eksempel"
        [code]="komplettEksempelCode"
        description="Tabell med søk, sortering, kolonnefiltrering, paginering og utvidbare rader kombinert."
      >
        <form
          class="mb-1"
          role="search"
          aria-label="Søk i komplett tabell"
          (submit)="$event.preventDefault()"
          aria-controls="komplett-tabell"
        >
          <label hviLabel for="komplett-sok">Søk</label>
          <p class="ds-paragraph" id="komplett-sok-beskrivelse">
            Søk etter navn, e-post, avdeling eller stilling
          </p>
          <hvi-search>
            <input
              hviInput
              id="komplett-sok"
              type="search"
              aria-describedby="komplett-sok-beskrivelse"
              (input)="fullTable.filterGlobal($any($event.target).value)"
            />
            <button hviSearchClear type="reset" aria-label="Tøm søk"></button>
          </hvi-search>
        </form>
        <p class="ds-paragraph mt-1 mb-3" role="status" aria-live="polite" aria-atomic="true">
          Viser {{ fullTable.totalFilteredRecords() }} av {{ fullTable.totalRecords() }} rader
        </p>
        <table
          hviTable
          id="komplett-tabell"
          [value]="data"
          [columns]="['navn', 'epost', 'avdeling', 'stilling']"
          [globalFilterFields]="['navn', 'epost', 'avdeling', 'stilling']"
          paginator
          [rows]="rowsPerPage()"
          zebra
          hover
          border
          stickyHeader
          #fullTable="hviTable"
        >
          <caption>
            Ansattoversikt
          </caption>
          <thead>
            <tr>
              <th scope="col" style="width: 3rem"><span class="sr-only">Utvid</span></th>
              <th hviSortableColumn="navn" scope="col">
                <button type="button" [attr.aria-label]="getSortLabel(fullTable, 'navn', 'Navn')">
                  Navn
                </button>
              </th>
              <th hviSortableColumn="avdeling" scope="col">
                <button
                  type="button"
                  [attr.aria-label]="getSortLabel(fullTable, 'avdeling', 'Avdeling')"
                >
                  Avdeling
                </button>
              </th>
              <th hviSortableColumn="stilling" scope="col">
                <button
                  type="button"
                  [attr.aria-label]="getSortLabel(fullTable, 'stilling', 'Stilling')"
                >
                  Stilling
                </button>
              </th>
            </tr>
            <tr>
              <td><span class="sr-only">Filter</span></td>
              <td width="30%">
                <hvi-multi-select
                  [options]="navnOptions"
                  placeholder="Alle"
                  searchPlaceholder="Søk navn..."
                  aria-label="Filtrer på navn"
                  aria-controls="komplett-tabell"
                  (selectionChange)="fullTable.setColumnFilter('navn', $event)"
                />
              </td>
              <td width="30%">
                <hvi-multi-select
                  [options]="avdelingOptions"
                  placeholder="Alle"
                  searchPlaceholder="Søk avdeling..."
                  aria-label="Filtrer på avdeling"
                  aria-controls="komplett-tabell"
                  (selectionChange)="fullTable.setColumnFilter('avdeling', $event)"
                />
              </td>
              <td width="30%">
                <hvi-multi-select
                  [options]="stillingOptions"
                  placeholder="Alle"
                  searchPlaceholder="Søk stilling..."
                  aria-label="Filtrer på stilling"
                  aria-controls="komplett-tabell"
                  (selectionChange)="fullTable.setColumnFilter('stilling', $event)"
                />
              </td>
            </tr>
          </thead>
          <tbody>
            @for (person of fullTable.paginatedValue(); track person.id) {
              <tr>
                <td>
                  <button
                    hviButton
                    variant="tertiary"
                    (click)="fullTable.toggleExpanded(person)"
                    [attr.aria-expanded]="fullTable.isExpanded(person)"
                    [attr.aria-controls]="'komplett-detalj-' + person.id"
                    [ariaLabel]="
                      fullTable.isExpanded(person)
                        ? 'Skjul detaljer om ' + person.navn
                        : 'Vis detaljer om ' + person.navn
                    "
                  >
                    @if (fullTable.isExpanded(person)) {
                      <hvi-icon-chevron-down />
                    } @else {
                      <hvi-icon-chevron-right />
                    }
                  </button>
                </td>
                <td>{{ person.navn }}</td>
                <td>{{ person.avdeling }}</td>
                <td>{{ person.stilling }}</td>
              </tr>
              @if (fullTable.isExpanded(person)) {
                <tr [id]="'komplett-detalj-' + person.id">
                  <td colspan="4">
                    <div class="flex gap-8 py-2 pl-12">
                      <dl>
                        <dt>E-post</dt>
                        <dd>{{ person.epost }}</dd>
                      </dl>
                      <dl>
                        <dt>Telefon</dt>
                        <dd>{{ person.telefon }}</dd>
                      </dl>
                    </div>
                  </td>
                </tr>
              }
            } @empty {
              <tr>
                <td colspan="4">Ingen treff</td>
              </tr>
            }
          </tbody>
        </table>
        <div class="mt-4 flex items-center justify-end">
          <hvi-pagination
            aria-label="Sidenavigering for tabell"
            aria-controls="komplett-tabell"
            [totalItems]="fullTable.totalFilteredRecords()"
            [pageSize]="rowsPerPage()"
            [currentPage]="fullTable.currentPage()"
            (currentPageChange)="fullTable.goToPage($event)"
          />
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class TableDemoComponent {
  readonly enkelTabellCode = TableEnkelTabellExampleSource;
  readonly zebrastriperOgBorderCode = TableZebrastriperOgBorderExampleSource;
  readonly sorteringCode = TableSorteringExampleSource;
  readonly customSorteringCode = TableCustomSorteringsfunksjonExampleSource;
  readonly globaltSokCode = TableGlobaltSokExampleSource;
  readonly kolonnefiltreringCode = TableKolonnefiltreringExampleSource;
  readonly pagineringCode = TablePagineringExampleSource;
  readonly utvidbareRaderCode = TableUtvidbareRaderExampleSource;
  readonly utvidbareRaderSingleCode = TableUtvidbareRaderEnkeltmodusExampleSource;
  readonly komplettEksempelCode = TableKomplettEksempelExampleSource;

  data = [
    {
      id: 1,
      navn: 'Ola Nordmann',
      epost: 'ola@helse-vest.no',
      avdeling: 'IT',
      telefon: '991 12 345',
      stilling: 'Utvikler',
    },
    {
      id: 2,
      navn: 'Kari Hansen',
      epost: 'kari@helse-vest.no',
      avdeling: 'HR',
      telefon: '992 23 456',
      stilling: 'Rådgiver',
    },
    {
      id: 3,
      navn: 'Per Olsen',
      epost: 'per@helse-vest.no',
      avdeling: 'IT',
      telefon: '993 34 567',
      stilling: 'Teamleder',
    },
    {
      id: 4,
      navn: 'Lise Johansen',
      epost: 'lise@helse-vest.no',
      avdeling: 'Økonomi',
      telefon: '994 45 678',
      stilling: 'Controller',
    },
    {
      id: 5,
      navn: 'Erik Berg',
      epost: 'erik@helse-vest.no',
      avdeling: 'IT',
      telefon: '995 56 789',
      stilling: 'Arkitekt',
    },
    {
      id: 6,
      navn: 'Anna Lie',
      epost: 'anna@helse-vest.no',
      avdeling: 'HR',
      telefon: '996 67 890',
      stilling: 'Leder',
    },
    {
      id: 7,
      navn: 'Jonas Vik',
      epost: 'jonas@helse-vest.no',
      avdeling: 'Økonomi',
      telefon: '997 78 901',
      stilling: 'Analytiker',
    },
    {
      id: 8,
      navn: 'Maria Dahl',
      epost: 'maria@helse-vest.no',
      avdeling: 'IT',
      telefon: '998 89 012',
      stilling: 'Tester',
    },
    {
      id: 9,
      navn: 'Thomas Strand',
      epost: 'thomas@helse-vest.no',
      avdeling: 'Ledelse',
      telefon: '999 90 123',
      stilling: 'Direktør',
    },
    {
      id: 10,
      navn: 'Ingrid Moe',
      epost: 'ingrid@helse-vest.no',
      avdeling: 'IT',
      telefon: '990 01 234',
      stilling: 'Designer',
    },
    {
      id: 11,
      navn: 'Bjørn Haugen',
      epost: 'bjorn@helse-vest.no',
      avdeling: 'Økonomi',
      telefon: '991 11 111',
      stilling: 'Revisor',
    },
    {
      id: 12,
      navn: 'Silje Aas',
      epost: 'silje@helse-vest.no',
      avdeling: 'HR',
      telefon: '992 22 222',
      stilling: 'Rekrutterer',
    },
  ];
  avdelinger = ['IT', 'HR', 'Økonomi', 'Ledelse'];
  stillinger = [
    'Utvikler',
    'Rådgiver',
    'Teamleder',
    'Controller',
    'Arkitekt',
    'Leder',
    'Analytiker',
    'Tester',
    'Direktør',
    'Designer',
    'Revisor',
    'Rekrutterer',
  ];

  navnOptions = this.data.map((p) => ({ label: p.navn, value: p.navn }));
  avdelingOptions = this.avdelinger.map((a) => ({ label: a, value: a }));
  stillingOptions = this.stillinger.map((s) => ({ label: s, value: s }));

  rowsPerPage = signal(5);

  /** Eksempeldata for custom sortering – sensorer med ulik prioritet */
  priorityData = [
    { id: 1, namn: 'Sensor A', status: 'Aktivt varsel', lokasjon: 'Bergen' },
    { id: 2, namn: 'Sensor B', status: 'Normal', lokasjon: 'Stavanger' },
    { id: 3, namn: 'Sensor C', status: 'Varsling aktivert', lokasjon: 'Oslo' },
    { id: 4, namn: 'Sensor D', status: 'Aktivt varsel', lokasjon: 'Trondheim' },
    { id: 5, namn: 'Sensor E', status: 'Normal', lokasjon: 'Haugesund' },
    { id: 6, namn: 'Sensor F', status: 'Varsling aktivert', lokasjon: 'Førde' },
  ];

  /**
   * Custom komparator: Aktivt varsel (0) → Varsling aktivert (1) → Normal (2).
   * TanStack reverserer automatisk ved synkende sortering.
   */
  prioritetSort: SortingFn<unknown> = (radA, radB, columnId) => {
    const rang = (val: unknown): number => {
      if (val === 'Aktivt varsel') return 0;
      if (val === 'Varsling aktivert') return 1;
      return 2;
    };
    return rang(radA.getValue(columnId)) - rang(radB.getValue(columnId));
  };

  getSortLabel(table: HviTable<any>, field: string, heading: string): string {
    const dir = table.getSortDirection(field);
    if (dir === 'ascending') return `Sorter etter ${heading} (synkende)`;
    if (dir === 'descending') return `Fjern sortering for ${heading}`;
    return `Sorter etter ${heading} (stigende)`;
  }
}
