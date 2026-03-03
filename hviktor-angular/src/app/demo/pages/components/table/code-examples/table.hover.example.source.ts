// Auto-generated - do not edit manually
export const TableHoverExampleSource = `import { Component } from '@angular/core';
import { HviTable } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-table-hover-example',
  standalone: true,
  imports: [HviTable],
  template: \`
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
  \`,
})
export class TableHoverExampleComponent {
}
`;
