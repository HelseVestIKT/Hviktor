import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import {
  HviButton,
  HviInput,
  HviLabel,
  HviMultiSelect,
  HviPagination,
  HviSearch,
  HviSearchClear,
  HviSortableColumn,
  HviTable,
} from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import '@helsevestikt/hviktor-icons/icon-chevron-down.webcomponent';
import '@helsevestikt/hviktor-icons/icon-chevron-right.webcomponent';
import '@helsevestikt/hviktor-icons/icon-envelope-closed.webcomponent';
import '@helsevestikt/hviktor-icons/icon-phone.webcomponent';

import { TableEnkelTabellExampleSource } from './code-examples/table.enkel-tabell.example.source';
import { TableGlobaltSokExampleSource } from './code-examples/table.globalt-sok.example.source';
import { TableKolonnefiltreringExampleSource } from './code-examples/table.kolonnefiltrering.example.source';
import { TableKomplettEksempelExampleSource } from './code-examples/table.komplett-eksempel.example.source';
import { TablePagineringExampleSource } from './code-examples/table.paginering.example.source';
import { TableSorteringExampleSource } from './code-examples/table.sortering.example.source';
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
              <th>Prosjekt</th>
              <th>Status</th>
              <th>Frist</th>
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
          <thead>
            <tr>
              <th>Måned</th>
              <th>2024</th>
              <th>2025</th>
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
          <thead>
            <tr>
              <th hviSortableColumn="navn">
                <button type="button">Navn</button>
              </th>
              <th hviSortableColumn="epost">
                <button type="button">Epost</button>
              </th>
              <th hviSortableColumn="avdeling">
                <button type="button">Avdeling</button>
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

      <!-- Globalt søk -->
      <app-demo-section
        title="Globalt søk"
        [code]="globaltSokCode"
        description="Legg til et søkefelt som filtrerer på tvers av alle angitte kolonner. Definer hvilke felter som skal inkluderes med globalFilterFields."
      >
        <div class="mb-4">
          <label hviLabel>Søk i tabell</label>
          <hvi-search>
            <input
              hviInput
              type="search"
              placeholder="Søk etter navn, epost eller avdeling..."
              (input)="searchTable.filterGlobal($any($event.target).value)"
            />
            <button hviSearchClear type="reset" aria-label="Tøm"></button>
          </hvi-search>
        </div>
        <table
          hviTable
          [value]="data"
          [globalFilterFields]="['navn', 'epost', 'avdeling']"
          zebra
          #searchTable="hviTable"
        >
          <thead>
            <tr>
              <th>Navn</th>
              <th>Epost</th>
              <th>Avdeling</th>
              <th>Stilling</th>
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
        <p class="ds-paragraph mt-2">
          Viser {{ searchTable.totalFilteredRecords() }} av {{ searchTable.totalRecords() }} rader
        </p>
      </app-demo-section>

      <!-- Kolonnefiltrering -->
      <app-demo-section
        title="Kolonnefiltrering"
        [code]="kolonnefiltreringCode"
        description="Filtrer på enkeltkolonner med setColumnFilter(). Bruk multi-select i tablehead for flervalgsfiltrering. Hver th bør ha en fast bredde for å unngå at multiselecten vokser horisontalt."
      >
        <table
          hviTable
          [value]="data"
          [columns]="['navn', 'epost', 'avdeling', 'stilling']"
          zebra
          #colFilterTable="hviTable"
        >
          <thead>
            <tr>
              <th>Navn</th>
              <th>Avdeling</th>
              <th>Stilling</th>
            </tr>
            <tr>
              <th width="30%">
                <span class="sr-only">Filtrer på navn</span>
                <hvi-multi-select
                  [options]="navnOptions"
                  placeholder="Alle"
                  searchPlaceholder="Søk navn..."
                  aria-label="Filtrer på navn"
                  (selectionChange)="colFilterTable.setColumnFilter('navn', $event)"
                />
              </th>
              <th width="30%">
                <span class="sr-only">Filtrer på avdeling</span>
                <hvi-multi-select
                  [options]="avdelingOptions"
                  placeholder="Alle"
                  searchPlaceholder="Søk avdeling..."
                  aria-label="Filtrer på avdeling"
                  (selectionChange)="colFilterTable.setColumnFilter('avdeling', $event)"
                />
              </th>
              <th width="30%">
                <span class="sr-only">Filtrer på stilling</span>
                <hvi-multi-select
                  [options]="stillingOptions"
                  placeholder="Alle"
                  searchPlaceholder="Søk stilling..."
                  aria-label="Filtrer på stilling"
                  (selectionChange)="colFilterTable.setColumnFilter('stilling', $event)"
                />
              </th>
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
        description="Aktiver paginering med paginator-attributtet og sett antall rader med rows. Bruk HviPagination for navigasjon."
      >
        <table hviTable [value]="data" paginator [rows]="5" zebra hover #pageTable="hviTable">
          <thead>
            <tr>
              <th hviSortableColumn="navn">
                <button type="button">Navn</button>
              </th>
              <th>Epost</th>
              <th>Avdeling</th>
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
        <hvi-pagination
          [totalItems]="pageTable.totalFilteredRecords()"
          [pageSize]="5"
          [currentPage]="pageTable.currentPage()"
          (currentPageChange)="pageTable.goToPage($event)"
        />
      </app-demo-section>

      <!-- Row expansion -->
      <app-demo-section
        title="Utvidbare rader"
        [code]="utvidbareRaderCode"
        description="Vis ekstra informasjon under en rad med toggleExpanded() og isExpanded(). Nyttig for detaljer som ikke trenger en egen kolonne."
      >
        <table hviTable [value]="data" hover #expandTable="hviTable">
          <thead>
            <tr>
              <th style="width: 3rem"><span class="sr-only">Utvid</span></th>
              <th>Navn</th>
              <th>Avdeling</th>
              <th>Stilling</th>
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
                    aria-label="Vis detaljer"
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
                <tr>
                  <td colspan="4">
                    <div class="flex gap-8 py-2 pl-12">
                      <dl class="flex items-center gap-2">
                        <dt>
                          <hvi-icon-envelope-closed />
                        </dt>
                        <dd>{{ person.epost }}</dd>
                      </dl>
                      <dl class="flex items-center gap-2">
                        <dt><hvi-icon-phone /></dt>
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
        <div class="mb-4">
          <label hviLabel>Søk</label>
          <hvi-search>
            <input
              hviInput
              type="search"
              placeholder="Søk i alle kolonner..."
              (input)="fullTable.filterGlobal($any($event.target).value)"
            />
            <button hviSearchClear type="reset" aria-label="Tøm"></button>
          </hvi-search>
        </div>
        <table
          hviTable
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
          <thead>
            <tr>
              <th style="width: 3rem"><span class="sr-only">Utvid</span></th>
              <th hviSortableColumn="navn">
                <button type="button">Navn</button>
              </th>
              <th hviSortableColumn="avdeling">
                <button type="button">Avdeling</button>
              </th>
              <th hviSortableColumn="stilling">
                <button type="button">Stilling</button>
              </th>
            </tr>
            <tr>
              <th><span class="sr-only">Filter</span></th>
              <th width="30%">
                <span class="sr-only">Filtrer på navn</span>
                <hvi-multi-select
                  [options]="navnOptions"
                  placeholder="Alle"
                  searchPlaceholder="Søk navn..."
                  aria-label="Filtrer på navn"
                  (selectionChange)="fullTable.setColumnFilter('navn', $event)"
                />
              </th>
              <th width="30%">
                <span class="sr-only">Filtrer på avdeling</span>
                <hvi-multi-select
                  [options]="avdelingOptions"
                  placeholder="Alle"
                  searchPlaceholder="Søk avdeling..."
                  aria-label="Filtrer på avdeling"
                  (selectionChange)="fullTable.setColumnFilter('avdeling', $event)"
                />
              </th>
              <th width="30%">
                <span class="sr-only">Filtrer på stilling</span>
                <hvi-multi-select
                  [options]="stillingOptions"
                  placeholder="Alle"
                  searchPlaceholder="Søk stilling..."
                  aria-label="Filtrer på stilling"
                  (selectionChange)="fullTable.setColumnFilter('stilling', $event)"
                />
              </th>
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
                    aria-label="Vis detaljer"
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
                <tr>
                  <td colspan="4">
                    <div class="flex gap-8 py-2 pl-12">
                      <dl class="flex items-center gap-2">
                        <dt>
                          <hvi-icon-envelope-closed />
                        </dt>
                        <dd>{{ person.epost }}</dd>
                      </dl>
                      <dl class="flex items-center gap-2">
                        <dt><hvi-icon-phone /></dt>
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
        <div class="mt-4 flex items-center justify-between">
          <p class="ds-paragraph">
            Viser {{ fullTable.totalFilteredRecords() }} av {{ fullTable.totalRecords() }} rader
          </p>
          <hvi-pagination
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
  readonly globaltSokCode = TableGlobaltSokExampleSource;
  readonly kolonnefiltreringCode = TableKolonnefiltreringExampleSource;
  readonly pagineringCode = TablePagineringExampleSource;
  readonly utvidbareRaderCode = TableUtvidbareRaderExampleSource;
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
}
