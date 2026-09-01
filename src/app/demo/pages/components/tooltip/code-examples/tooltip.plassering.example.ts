import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@helsevestikt/hviktor-icons/icon-clipboard.webcomponent';

@Component({
  selector: 'app-tooltip-plassering-example',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="flex justify-center">
      <button
        hviButton
        variant="secondary"
        icon
        hviTooltip="Kopier"
        tooltipPlacement="bottom"
        aria-label="Kopier"
      >
        <hvi-icon-clipboard />
      </button>
    </div>
  `,
})
export class TooltipPlasseringExampleComponent {}
