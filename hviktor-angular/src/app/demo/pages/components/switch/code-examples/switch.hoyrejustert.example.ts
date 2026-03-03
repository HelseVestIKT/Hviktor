import { Component } from '@angular/core';
import { HviDivider, HviField, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-switch-hoyrejustert-example',
  standalone: true,
  imports: [HviDivider, HviField, HviInput, HviLabel],
  template: `
    <div style="flex-direction: column; width: 100%; max-width: 380px;">
      <hr hviDivider aria-hidden="true" />
      <hvi-field position="end" style="align-items: center; padding: var(--ds-size-2) 0;">
        <label hviLabel weight="medium" for="switch-flymodus">Flymodus</label>
        <input hviInput type="checkbox" role="switch" id="switch-flymodus" />
      </hvi-field>
      <hr hviDivider aria-hidden="true" />
      <hvi-field position="end" style="align-items: center; padding: var(--ds-size-2) 0;">
        <label hviLabel weight="medium" for="switch-lydlos">Lydløs</label>
        <input hviInput type="checkbox" role="switch" id="switch-lydlos" />
      </hvi-field>
      <hr hviDivider aria-hidden="true" />
    </div>
  `,
})
export class SwitchHoyrejustertExampleComponent {}
