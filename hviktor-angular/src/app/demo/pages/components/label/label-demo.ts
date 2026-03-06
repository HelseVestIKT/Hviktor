import { Component } from '@angular/core';
import { HviLabel } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { LabelVarianterExampleSource } from './code-examples/label.varianter.example.source';
@Component({
  selector: 'app-label-demo',
  standalone: true,
  imports: [HviLabel, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page componentId="label">
      <app-demo-section title="Varianter" [code]="varianterCode">
        <div class="flex flex-col gap-2">
          <label hviLabel>Standard label</label>
          <label hviLabel weight="medium">Medium weight label</label>
          <label hviLabel weight="semibold">Semibold label</label>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class LabelDemoComponent {
  readonly varianterCode = LabelVarianterExampleSource;
}
