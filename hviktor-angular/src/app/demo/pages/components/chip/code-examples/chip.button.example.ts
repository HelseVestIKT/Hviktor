import { Component } from '@angular/core';

@Component({
  selector: 'app-chip-button-example',
  standalone: true,
  template: `
    <div class="flex flex-wrap gap-2">
      <button hviChip>Tøm alle filtre</button>
    </div>
  `,
})
export class ChipButtonExampleComponent {}
