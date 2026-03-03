// Auto-generated - do not edit manually
export const TableKombinertExampleSource = `import { Component } from '@angular/core';
import { HviTable } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-table-kombinert-example',
  standalone: true,
  imports: [HviTable],
  template: \`
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
  \`,
})
export class TableKombinertExampleComponent {
}
`;
