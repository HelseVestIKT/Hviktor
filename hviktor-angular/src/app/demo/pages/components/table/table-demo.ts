import { Component } from '@angular/core';
import {
  HviButton,
  HviInput,
  HviPagination,
  HviSortableColumn,
  HviTable,
} from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { TableBasisExampleSource } from './code-examples/table.basis.example.source';
import { TableHoverExampleSource } from './code-examples/table.hover.example.source';
import { TableKombinertExampleSource } from './code-examples/table.kombinert.example.source';
import { TableMedBorderExampleSource } from './code-examples/table.med-border.example.source';
import { TablePagineringExampleSource } from './code-examples/table.paginering.example.source';
import { TableSokOgSorteringExampleSource } from './code-examples/table.sok-og-sortering.example.source';
import { TableTallITabellExampleSource } from './code-examples/table.tall-i-tabell.example.source';
import { TableZebrastriperExampleSource } from './code-examples/table.zebrastriper.example.source';

interface Person {
  navn: string;
  epost: string;
  telefon: string;
}

@Component({
  selector: 'app-table-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    HviTable,
    HviSortableColumn,
    HviInput,
    HviButton,
    HviPagination,
  ],
  template: `
    <app-demo-page
      title="Table"
      description="Table brukes for å vise strukturert informasjon på en ryddig og oversiktlig måte. Tabeller kan gjøre det enklere for brukerne å skanne og sammenligne informasjon."
    >
      <!-- Basis eksempel -->
      <app-demo-section
        title="Basis"
        [code]="basisCode"
        description="Enkel tabell med header, body og footer."
      >
        <table hviTable>
          <caption>
            Pasientoversikt
          </caption>
          <thead>
            <tr>
              <th>Navn</th>
              <th>Fødselsdato</th>
              <th>Avdeling</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ola Nordmann</td>
              <td>15.03.1985</td>
              <td>Medisinsk avdeling</td>
              <td>Innlagt</td>
            </tr>
            <tr>
              <td>Kari Hansen</td>
              <td>22.07.1972</td>
              <td>Kirurgisk avdeling</td>
              <td>Utskrevet</td>
            </tr>
            <tr>
              <td>Per Johansen</td>
              <td>08.11.1990</td>
              <td>Akuttmottak</td>
              <td>Under behandling</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="3">Totalt antall pasienter</th>
              <th>3</th>
            </tr>
          </tfoot>
        </table>
      </app-demo-section>

      <!-- Zebrastriper -->
      <app-demo-section
        title="Zebrastriper"
        [code]="zebrastriperCode"
        description="Bruk zebra for annenhver rad med alternativ bakgrunnsfarge."
      >
        <table hviTable zebra>
          <caption>
            Antall søknader per måned
          </caption>
          <thead>
            <tr>
              <th>Måned</th>
              <th>2023</th>
              <th>2024</th>
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

      <!-- Med border -->
      <app-demo-section
        title="Med border"
        [code]="medBorderCode"
        description="Bruk border for å legge til en synlig kant rundt tabellen."
      >
        <table hviTable border>
          <thead>
            <tr>
              <th>Header 1</th>
              <th>Header 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cell 1</td>
              <td>Cell 2</td>
            </tr>
            <tr>
              <td>Cell 3</td>
              <td>Cell 4</td>
            </tr>
          </tbody>
        </table>
      </app-demo-section>

      <!-- Hover -->
      <app-demo-section
        title="Hover"
        [code]="hoverCode"
        description="Bruk hover for å gi rader en hover-effekt."
      >
        <table hviTable hover>
          <thead>
            <tr>
              <th>Navn</th>
              <th>Avdeling</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ola Nordmann</td>
              <td>Medisinsk avdeling</td>
              <td>Innlagt</td>
            </tr>
            <tr>
              <td>Kari Hansen</td>
              <td>Kirurgisk avdeling</td>
              <td>Utskrevet</td>
            </tr>
            <tr>
              <td>Per Johansen</td>
              <td>Akuttmottak</td>
              <td>Under behandling</td>
            </tr>
          </tbody>
        </table>
      </app-demo-section>

      <!-- Søk og sortering -->
      <app-demo-section
        title="Søk og sortering"
        [code]="sokOgSorteringCode"
        description="Kombiner søk og sortering for full funksjonalitet. Bruk filterGlobal() for å søke på tvers av kolonner."
      >
        <div class="mb-4 flex items-center gap-4">
          <input
            hviInput
            type="search"
            placeholder="Søk i navn, epost eller telefon..."
            #searchInput
            (input)="searchTable.filterGlobal(searchInput.value)"
            class="max-w-xs flex-1"
          />
          <button hviButton (click)="searchTable.clear(); searchInput.value = ''">Nullstill</button>
        </div>
        <table
          hviTable
          hover
          [value]="persons"
          [globalFilterFields]="['navn', 'epost', 'telefon']"
          #searchTable="hviTable"
        >
          <thead>
            <tr>
              <th hviSortableColumn="navn">
                <button>Navn</button>
              </th>
              <th>Epost</th>
              <th hviSortableColumn="telefon">
                <button>Telefon</button>
              </th>
            </tr>
          </thead>
          <tbody>
            @for (person of searchTable.filteredValue(); track person.epost) {
              <tr>
                <td>{{ person.navn }}</td>
                <td>{{ person.epost }}</td>
                <td>{{ person.telefon }}</td>
              </tr>
            } @empty {
              <tr>
                <td colspan="3" class="text-center">Ingen treff</td>
              </tr>
            }
          </tbody>
        </table>
        <p class="mt-2 text-sm text-neutral-500">
          Viser {{ searchTable.totalFilteredRecords() }} av {{ searchTable.totalRecords() }} rader
        </p>
      </app-demo-section>

      <!-- Paginering -->
      <app-demo-section
        title="Paginering"
        [code]="pagineringCode"
        description="Bruk paginator og rows for å dele opp data i sider. Tabellen håndterer pagineringen automatisk."
      >
        <table
          hviTable
          hover
          zebra
          [value]="manyPersons"
          paginator
          [rows]="10"
          #paginatedTable="hviTable"
        >
          <thead>
            <tr>
              <th>Navn</th>
              <th>Epost</th>
              <th>Telefon</th>
            </tr>
          </thead>
          <tbody>
            @for (person of paginatedTable.paginatedValue(); track person.epost) {
              <tr>
                <td>{{ person.navn }}</td>
                <td>{{ person.epost }}</td>
                <td>{{ person.telefon }}</td>
              </tr>
            }
          </tbody>
        </table>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-sm text-neutral-500">
            Viser {{ (paginatedTable.currentPage() - 1) * 5 + 1 }}-{{
              paginatedTable.currentPage() * 5 > paginatedTable.totalRecords()
                ? paginatedTable.totalRecords()
                : paginatedTable.currentPage() * 5
            }}
            av {{ paginatedTable.totalRecords() }}
          </span>
          <hvi-pagination
            [totalItems]="paginatedTable.totalFilteredRecords()"
            [pageSize]="5"
            [currentPage]="paginatedTable.currentPage()"
            (currentPageChange)="paginatedTable.goToPage($event)"
          />
        </div>
      </app-demo-section>

      <!-- Tall i tabell -->
      <app-demo-section
        title="Tall i tabell"
        [code]="tallITabellCode"
        description="Når det er tall som skal sammenlignes, plasser tallene til høyre i tabellfeltet."
      >
        <table hviTable class="table-fixed tabular-nums">
          <caption>
            Antall søknader per måned
          </caption>
          <thead>
            <tr>
              <th scope="col">Måned</th>
              <th scope="col" class="text-right">2023</th>
              <th scope="col" class="text-right">2024</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Januar</th>
              <td class="text-right">1 230</td>
              <td class="text-right">1 450</td>
            </tr>
            <tr>
              <th scope="row">Februar</th>
              <td class="text-right">980</td>
              <td class="text-right">1 120</td>
            </tr>
            <tr>
              <th scope="row">Mars</th>
              <td class="text-right">1 150</td>
              <td class="text-right">1 300</td>
            </tr>
          </tbody>
        </table>
      </app-demo-section>

      <!-- Kombinert -->
      <app-demo-section
        title="Kombinert"
        [code]="kombinertCode"
        description="Du kan kombinere flere varianter for å tilpasse tabellen til dine behov."
      >
        <table hviTable zebra border hover>
          <caption>
            Pasientoversikt med alle varianter
          </caption>
          <thead>
            <tr>
              <th>Navn</th>
              <th>Avdeling</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ola Nordmann</td>
              <td>Medisinsk avdeling</td>
              <td>Innlagt</td>
            </tr>
            <tr>
              <td>Kari Hansen</td>
              <td>Kirurgisk avdeling</td>
              <td>Utskrevet</td>
            </tr>
            <tr>
              <td>Per Johansen</td>
              <td>Akuttmottak</td>
              <td>Under behandling</td>
            </tr>
          </tbody>
        </table>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class TableDemoComponent {
  readonly basisCode = TableBasisExampleSource;
  readonly zebrastriperCode = TableZebrastriperExampleSource;
  readonly medBorderCode = TableMedBorderExampleSource;
  readonly hoverCode = TableHoverExampleSource;
  readonly sokOgSorteringCode = TableSokOgSorteringExampleSource;
  readonly pagineringCode = TablePagineringExampleSource;
  readonly tallITabellCode = TableTallITabellExampleSource;
  readonly kombinertCode = TableKombinertExampleSource;

  // Data for sorteringseksempel
  persons: Person[] = [
    { navn: 'Lise Nordmann', epost: 'lise@nordmann.no', telefon: '22345678' },
    { navn: 'Kari Nordmann', epost: 'kari@nordmann.no', telefon: '87654321' },
    { navn: 'Ola Nordmann', epost: 'ola@nordmann.no', telefon: '32345678' },
    { navn: 'Per Nordmann', epost: 'per@nordmann.no', telefon: '12345678' },
  ];

  // Større datasett for pagineringseksempel
  manyPersons: Person[] = [
    { navn: 'Lise Nordmann', epost: 'lise@nordmann.no', telefon: '22345678' },
    { navn: 'Kari Nordmann', epost: 'kari@nordmann.no', telefon: '87654321' },
    { navn: 'Ola Nordmann', epost: 'ola@nordmann.no', telefon: '32345678' },
    { navn: 'Per Nordmann', epost: 'per@nordmann.no', telefon: '12345678' },
    { navn: 'Anne Hansen', epost: 'anne@hansen.no', telefon: '11223344' },
    { navn: 'Erik Larsen', epost: 'erik@larsen.no', telefon: '55667788' },
    { navn: 'Ingrid Berg', epost: 'ingrid@berg.no', telefon: '99887766' },
    { navn: 'Bjørn Olsen', epost: 'bjorn@olsen.no', telefon: '44332211' },
    { navn: 'Marte Vik', epost: 'marte@vik.no', telefon: '66778899' },
    { navn: 'Jonas Dahl', epost: 'jonas@dahl.no', telefon: '33445566' },
    { navn: 'Hilde Mo', epost: 'hilde@mo.no', telefon: '77889900' },
    { navn: 'Geir Strand', epost: 'geir@strand.no', telefon: '11002233' },
    { navn: 'Silje Haugen', epost: 'silje@haugen.no', telefon: '44556677' },
    { navn: 'Thomas Lie', epost: 'thomas@lie.no', telefon: '88990011' },
    { navn: 'Nina Bakke', epost: 'nina@bakke.no', telefon: '22334455' },
    { navn: 'Anders Holm', epost: 'anders@holm.no', telefon: '55443322' },
    { navn: 'Maria Kvam', epost: 'maria@kvam.no', telefon: '99001122' },
    { navn: 'Lars Bø', epost: 'lars@bo.no', telefon: '33221100' },
  ];
}
