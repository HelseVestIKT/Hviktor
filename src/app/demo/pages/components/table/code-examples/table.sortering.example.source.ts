// Auto-generated - do not edit manually
export const TableSorteringExampleSource = `import { Component, signal } from '@angular/core';
import { HviSortableColumn, HviTable } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-table-sortering-example',
  standalone: true,
  imports: [HviSortableColumn, HviTable],
  template: \`
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
  \`,
})
export class TableSorteringExampleComponent {
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
`;
