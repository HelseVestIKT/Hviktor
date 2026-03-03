import { Component } from '@angular/core';
import { HviTable } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-table-basis-example',
  standalone: true,
  imports: [HviTable],
  template: `
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
  `,
})
export class TableBasisExampleComponent {}
