import { Component } from '@angular/core';
import { HviList } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-list-punktliste-example',
  standalone: true,
  imports: [HviList],
  template: `
    <ul hviList>
      <li>Første element</li>
      <li>Andre element</li>
      <li>Tredje element</li>
    </ul>
  `,
})
export class ListPunktlisteExampleComponent {}
