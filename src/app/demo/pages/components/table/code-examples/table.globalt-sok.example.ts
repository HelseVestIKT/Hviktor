import { Component, signal } from '@angular/core';
import { HviInput, HviLabel, HviSearch, HviSearchClear, HviTable } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-table-globalt-sok-example',
  standalone: true,
  imports: [HviInput, HviLabel, HviSearch, HviSearchClear, HviTable],
  template: `
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
  `,
})
export class TableGlobaltSokExampleComponent {
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
  rowsPerPage = signal(5);
}
