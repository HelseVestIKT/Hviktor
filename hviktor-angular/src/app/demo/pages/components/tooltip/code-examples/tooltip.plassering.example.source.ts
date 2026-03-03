// Auto-generated - do not edit manually
export const TooltipPlasseringExampleSource = `import { Component } from '@angular/core';
import { HviButton, HviTooltip } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-tooltip-plassering-example',
  standalone: true,
  imports: [HviButton, HviTooltip],
  template: \`
    <div class="flex flex-wrap items-center justify-center gap-4 py-8">
      <button hviButton variant="secondary" hviTooltip="Over (standard)" tooltipPlacement="top">
        Top
      </button>
      <button hviButton variant="secondary" hviTooltip="Til høyre" tooltipPlacement="right">
        Right
      </button>
      <button hviButton variant="secondary" hviTooltip="Under" tooltipPlacement="bottom">
        Bottom
      </button>
      <button hviButton variant="secondary" hviTooltip="Til venstre" tooltipPlacement="left">
        Left
      </button>
    </div>
  \`,
})
export class TooltipPlasseringExampleComponent {
  
}
`;
