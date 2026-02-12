import { Component } from '@angular/core';
import { HviDivider, HviParagraph } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-divider-demo',
  standalone: true,
  imports: [HviDivider, HviParagraph, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page title="Divider" description="Skillelinjer for å separere innhold visuelt.">
      <app-demo-section title="Standard">
        <div class="flex flex-col gap-4">
          <p hviParagraph>Innhold over skillelinjen</p>
          <hr hviDivider />
          <p hviParagraph>Innhold under skillelinjen</p>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class DividerDemoComponent {}
