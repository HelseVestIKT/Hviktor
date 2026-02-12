import { Component } from '@angular/core';
import { HviList } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-list-demo',
  standalone: true,
  imports: [HviList, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page title="List" description="Ordnede og uordnede lister.">
      <app-demo-section title="Nummerert liste">
        <ol hviList>
          <li>Første element</li>
          <li>Andre element</li>
          <li>Tredje element</li>
        </ol>
      </app-demo-section>

      <app-demo-section title="Punktliste">
        <ul hviList>
          <li>Første element</li>
          <li>Andre element</li>
          <li>Tredje element</li>
        </ul>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class ListDemoComponent {}
