import { Component } from '@angular/core';
import { HviTable } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-table-enkel-tabell-example',
  standalone: true,
  imports: [HviTable],
  template: `
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
  `,
})
export class TableEnkelTabellExampleComponent {}
