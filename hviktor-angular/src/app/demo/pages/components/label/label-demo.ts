import { Component } from '@angular/core';
import { HviLabel } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-label-demo',
  standalone: true,
  imports: [HviLabel, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page title="Label" description="Etiketter for skjemaelementer og annen tekst.">
      <app-demo-section title="Varianter">
        <div class="flex flex-col gap-2">
          <label hviLabel>Standard label</label>
          <label hviLabel weight="medium">Medium weight label</label>
          <label hviLabel weight="semibold">Semibold label</label>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class LabelDemoComponent {}
