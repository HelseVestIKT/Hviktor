import { Component } from '@angular/core';
import { HviPagination, HviTable } from '@helsevestikt/hviktor';

interface Person {
  navn: string;
  epost: string;
  telefon: string;
}

@Component({
  selector: 'app-table-paginering-example',
  standalone: true,
  imports: [HviPagination, HviTable],
  template: `
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
        @for (person of $any(paginatedTable).paginatedValue(); track person.epost) {
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
  `,
})
export class TablePagineringExampleComponent {
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
