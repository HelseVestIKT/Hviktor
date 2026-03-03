import { Component } from '@angular/core';
import { HviList } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { ListNummerertListeExampleSource } from './code-examples/list.nummerert-liste.example.source';
import { ListPunktlisteExampleSource } from './code-examples/list.punktliste.example.source';
@Component({
  selector: 'app-list-demo',
  standalone: true,
  imports: [HviList, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page title="List" description="Ordnede og uordnede lister.">
      <app-demo-section title="Nummerert liste" [code]="nummerertListeCode">
        <ol hviList>
          <li>Første element</li>
          <li>Andre element</li>
          <li>Tredje element</li>
        </ol>
      </app-demo-section>

      <app-demo-section title="Punktliste" [code]="punktlisteCode">
        <ul hviList>
          <li>Første element</li>
          <li>Andre element</li>
          <li>Tredje element</li>
        </ul>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class ListDemoComponent {
  readonly nummerertListeCode = ListNummerertListeExampleSource;
  readonly punktlisteCode = ListPunktlisteExampleSource;
}
