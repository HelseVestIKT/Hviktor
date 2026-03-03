import { Component } from '@angular/core';

@Component({
  selector: 'app-chip-checkbox-example',
  standalone: true,
  template: `
    <div class="flex flex-wrap gap-2">
      <label hviChip>
        <input hviInput type="checkbox" />
        Nynorsk
      </label>
    </div>
  `,
})
export class ChipCheckboxExampleComponent {}
