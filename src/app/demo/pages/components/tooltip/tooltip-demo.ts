import { Component, CUSTOM_ELEMENTS_SCHEMA, signal, WritableSignal } from '@angular/core';
import { HviButton, HviField, HviInput, HviLabel, HviTooltip } from '@helsevestikt/hviktor-angular';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { TooltipIkonKnappMedTooltipExampleSource } from './code-examples/tooltip.ikon-knapp-med-tooltip.example.source';
import { TooltipPlasseringExampleSource } from './code-examples/tooltip.plassering.example.source';

import '@helsevestikt/hviktor-icons/icon-clipboard.webcomponent';
import { TooltipBetingetTooltipExampleSource } from './code-examples/tooltip.betinget-tooltip.example.source';
import { TooltipMedTekstExampleSource } from './code-examples/tooltip.med-tekst.example.source';

@Component({
  selector: 'app-tooltip-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    HviButton,
    HviField,
    HviInput,
    HviLabel,
    HviTooltip,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <app-demo-page componentId="tooltip">
      <!-- Grunnleggende eksempel med ikon-knapp -->
      <app-demo-section
        title="Ikon-knapp med tooltip"
        [code]="ikonKnappMedTooltipCode"
        description="Bruk tooltip for å forklare hva symbolet på knappen betyr."
      >
        <div class="flex justify-center">
          <button hviButton variant="primary" icon hviTooltip="Kopier" aria-label="Kopier">
            <hvi-icon-clipboard />
          </button>
        </div>
      </app-demo-section>

      <!-- Tekst med tooltip -->
      <app-demo-section
        title="Med tekst"
        [code]="medTekstCode"
        description="Tooltip kan brukes på tekst for å gi utfyllende informasjon."
      >
        <div class="flex justify-center">
          <span hviTooltip="Organisasjonsnummer" tabindex="0"> Org.nr. </span>
        </div>
      </app-demo-section>

      <!-- Plassering -->
      <app-demo-section
        title="Plassering"
        [code]="plasseringCode"
        description="Vurder om tooltip skal plasseres over, under eller ved siden av elementet."
      >
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
      </app-demo-section>

      <!-- Betinget tooltip -->
      <app-demo-section
        title="Betinget tooltip"
        [code]="betingetTooltipCode"
        description="Tooltip vises kun når det finnes innhold."
      >
        <div class="flex justify-center">
          <button
            hviButton
            variant="secondary"
            icon
            [hviTooltip]="visTooltip() ? 'Kopier' : ''"
            tooltipPlacement="bottom"
            aria-label="Kopier"
          >
            <hvi-icon-clipboard />
          </button>
        </div>
        <div class="flex justify-center">
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
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class TooltipDemoComponent {
  readonly medTekstCode = TooltipMedTekstExampleSource;
  readonly betingetTooltipCode = TooltipBetingetTooltipExampleSource;
  readonly ikonKnappMedTooltipCode = TooltipIkonKnappMedTooltipExampleSource;
  readonly plasseringCode = TooltipPlasseringExampleSource;

  visTooltip: WritableSignal<boolean> = signal(false);

  toggleTooltip(): void {
    this.visTooltip.set(!this.visTooltip());
  }
}
