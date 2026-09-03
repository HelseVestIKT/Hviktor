import { Component } from '@angular/core';

@Component({
  selector: 'app-tooltip-med-tekst-example',
  standalone: true,
  template: `
    <div class="flex justify-center">
      <span hviTooltip="Organisasjonsnummer" tabindex="0"> Org.nr. </span>
    </div>
  `,
})
export class TooltipMedTekstExampleComponent {}
