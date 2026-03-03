import { Component } from '@angular/core';
import { HviButton, HviTooltip } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-tooltip-tastatursnarvei-example',
  standalone: true,
  imports: [HviButton, HviTooltip],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <button hviButton variant="primary" hviTooltip="Ctrl+S">Lagre</button>
      <button hviButton variant="secondary" hviTooltip="Ctrl+Z">Angre</button>
      <button hviButton variant="secondary" hviTooltip="Ctrl+C">Kopier</button>
      <button hviButton variant="secondary" hviTooltip="Ctrl+V">Lim inn</button>
    </div>
  `,
})
export class TooltipTastatursnarveiExampleComponent {}
