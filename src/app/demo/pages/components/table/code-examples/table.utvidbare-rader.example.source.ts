// Auto-generated - do not edit manually
export const TableUtvidbareRaderExampleSource = `import { Component, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HviButton, HviTable } from '@helsevestikt/hviktor';
import '@helsevestikt/hviktor-icons/icon-chevron-down.webcomponent';
import '@helsevestikt/hviktor-icons/icon-chevron-right.webcomponent';
import '@helsevestikt/hviktor-icons/icon-envelope-closed.webcomponent';
import '@helsevestikt/hviktor-icons/icon-phone.webcomponent';

@Component({
  selector: 'app-table-utvidbare-rader-example',
  standalone: true,
  imports: [HviButton, HviTable],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
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
  \`,
})
export class TableUtvidbareRaderExampleComponent {
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
`;
