import { Component, CUSTOM_ELEMENTS_SCHEMA, signal, WritableSignal } from '@angular/core';
import '@helsevestikt/hviktor-icons/icon-clipboard.webcomponent';

@Component({
  selector: 'app-tooltip-betinget-tooltip-example',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="flex justify-center">
      <button
        hviButton
        variant="secondary"
        icon
        [attr.hviTooltip]="visTooltip() ? 'Kopier' : null"
        tooltipPlacement="bottom"
        aria-label="Kopier"
      >
        <hvi-icon-clipboard />
      </button>
    </div>
    <hvi-field class="mt-4 flex justify-center">
      <input
        hviInput
        type="checkbox"
        role="switch"
        id="tooltip-toggle"
        [checked]="visTooltip()"
        (change)="toggleTooltip()"
      />
      <label hviLabel for="tooltip-toggle">Vis tooltip</label>
    </hvi-field>
  `,
})
export class TooltipBetingetTooltipExampleComponent {
  visTooltip: WritableSignal<boolean> = signal(false);

  toggleTooltip(): void {
    this.visTooltip.set(!this.visTooltip());
  }
}
