import { Component } from '@angular/core';
import { HviChipButton, HviChipLabel, HviFieldKit } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { ChipButtonRemovableExampleSource } from './code-examples/chip.button-removable.example.source';
import { ChipButtonExampleSource } from './code-examples/chip.button.example.source';
import { ChipCheckboxExampleSource } from './code-examples/chip.checkbox.example.source';
import { ChipRadioExampleSource } from './code-examples/chip.radio.example.source';
@Component({
  selector: 'app-chip-demo',
  standalone: true,
  imports: [HviChipButton, HviChipLabel, HviFieldKit, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page
      title="Chip"
      description="Kompakte elementer for valg, filtrering og visning av informasjon."
    >
      <app-demo-section title="Radio" [code]="radioCode">
        <div class="flex flex-wrap gap-2">
          <label hviChip>
            <input hviInput type="radio" value="nynorsk" checked name="my-radio" />
            Nynorsk
          </label>
          <label hviChip>
            <input hviInput type="radio" value="bokmål" name="my-radio" />
            Bokmål
          </label>
        </div>
      </app-demo-section>

      <app-demo-section title="Checkbox" [code]="checkboxCode">
        <div class="flex flex-wrap gap-2">
          <label hviChip>
            <input hviInput type="checkbox" />
            Nynorsk
          </label>
        </div>
      </app-demo-section>

      <app-demo-section title="Button" [code]="buttonCode">
        <div class="flex flex-wrap gap-2">
          <button hviChip>Tøm alle filtre</button>
        </div>
      </app-demo-section>

      <app-demo-section title="Button (removable)" [code]="buttonRemovableCode">
        <div class="flex flex-wrap gap-2">
          <button hviChip removable="true" aria-label="Slett Norge">Norge</button>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class ChipDemoComponent {
  readonly radioCode = ChipRadioExampleSource;
  readonly checkboxCode = ChipCheckboxExampleSource;
  readonly buttonCode = ChipButtonExampleSource;
  readonly buttonRemovableCode = ChipButtonRemovableExampleSource;
}
