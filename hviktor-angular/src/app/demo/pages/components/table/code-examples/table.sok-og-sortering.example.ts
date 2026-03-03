import { Component } from '@angular/core';
import { HviButton, HviInput, HviSortableColumn, HviTable } from '@helsevestikt/hviktor';

interface Person {
  navn: string;
  epost: string;
  telefon: string;
}

@Component({
  selector: 'app-table-sok-og-sortering-example',
  standalone: true,
  imports: [HviButton, HviInput, HviSortableColumn, HviTable],
  template: `
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
        @for (person of $any(searchTable.filteredValue()); track person.epost) {
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
  `,
})
export class TableSokOgSorteringExampleComponent {
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
