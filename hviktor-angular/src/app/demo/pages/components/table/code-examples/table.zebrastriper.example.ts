import { Component } from '@angular/core';
import { HviTable } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-table-zebrastriper-example',
  standalone: true,
  imports: [HviTable],
  template: `
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
  `,
})
export class TableZebrastriperExampleComponent {}
