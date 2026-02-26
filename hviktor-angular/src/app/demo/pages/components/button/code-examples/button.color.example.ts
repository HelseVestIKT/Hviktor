import { Component } from '@angular/core';
import { HviButton } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-button-color-example',
  standalone: true,
  imports: [HviButton],
  template: `
    <div class="flex flex-wrap gap-2">
      <button hviButton color="brand1">Brand1</button>
      <button hviButton color="brand2">Brand2</button>
      <button hviButton color="brand3">Brand3</button>
      <button hviButton color="neutral">Neutral</button>
      <button hviButton color="danger">Danger</button>
    </div>
  `,
})
export class ButtonColorExampleComponent {}
