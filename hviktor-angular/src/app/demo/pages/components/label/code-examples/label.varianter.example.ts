import { Component } from '@angular/core';
import { HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-label-varianter-example',
  standalone: true,
  imports: [HviLabel],
  template: `
    <div class="flex flex-col gap-2">
      <label hviLabel>Standard label</label>
      <label hviLabel weight="medium">Medium weight label</label>
      <label hviLabel weight="semibold">Semibold label</label>
    </div>
  `,
})
export class LabelVarianterExampleComponent {}
