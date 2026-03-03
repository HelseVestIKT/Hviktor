import { Component } from '@angular/core';
import { HviSpinner } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-spinner-storrelser-example',
  standalone: true,
  imports: [HviSpinner],
  template: `
    <div class="flex flex-wrap items-end gap-6">
      <div class="flex flex-col items-center gap-2">
        <hvi-spinner label="Laster" size="2xs" />
        <span>2xs</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <hvi-spinner label="Laster" size="xs" />
        <span>xs</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <hvi-spinner label="Laster" size="sm" />
        <span>sm</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <hvi-spinner label="Laster" size="md" />
        <span>md</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <hvi-spinner label="Laster" size="lg" />
        <span>lg</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <hvi-spinner label="Laster" size="xl" />
        <span>xl</span>
      </div>
    </div>
  `,
})
export class SpinnerStorrelserExampleComponent {}
