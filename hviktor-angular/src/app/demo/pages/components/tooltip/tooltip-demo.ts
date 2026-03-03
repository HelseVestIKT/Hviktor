import { Component } from '@angular/core';
import { HviButton, HviTooltip } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { TooltipIkonKnappMedTooltipExampleSource } from './code-examples/tooltip.ikon-knapp-med-tooltip.example.source';
import { TooltipPlasseringExampleSource } from './code-examples/tooltip.plassering.example.source';
import { TooltipTastatursnarveiExampleSource } from './code-examples/tooltip.tastatursnarvei.example.source';
import { TooltipTekstMedTooltipExampleSource } from './code-examples/tooltip.tekst-med-tooltip.example.source';
@Component({
  selector: 'app-tooltip-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent, HviButton, HviTooltip],
  template: `
    <app-demo-page
      title="Tooltip"
      description="Tooltip viser kort informasjon når brukeren holder musepekeren over eller fokuserer på et element. Den brukes til sekundær informasjon, for eksempel til å forklare hva et symbol betyr."
    >
      <!-- Grunnleggende eksempel med ikon-knapp -->
      <app-demo-section
        title="Ikon-knapp med tooltip"
        [code]="ikonKnappMedTooltipCode"
        description="Bruk tooltip for å forklare hva et ikon-knapp gjør."
      >
        <div class="flex flex-wrap items-center gap-4">
          <button hviButton variant="primary" icon hviTooltip="Kopier" aria-label="Kopier">
            📋
          </button>
          <button hviButton variant="primary" icon hviTooltip="Lagre" aria-label="Lagre">💾</button>
          <button hviButton variant="primary" icon hviTooltip="Slett" aria-label="Slett">🗑️</button>
          <button hviButton variant="primary" icon hviTooltip="Rediger" aria-label="Rediger">
            ✏️
          </button>
        </div>
      </app-demo-section>

      <!-- Tekst med tooltip -->
      <app-demo-section
        title="Tekst med tooltip"
        [code]="tekstMedTooltipCode"
        description="Tooltip kan brukes på tekst for å gi utfyllende informasjon."
      >
        <div class="flex flex-wrap items-center gap-4">
          <span hviTooltip="Organisasjonsnummer" class="cursor-help underline decoration-dotted">
            Org.nr.
          </span>
          <span hviTooltip="Fødselsnummer" class="cursor-help underline decoration-dotted">
            Fødselsnr.
          </span>
          <span hviTooltip="Value Added Tax" class="cursor-help underline decoration-dotted">
            MVA
          </span>
        </div>
      </app-demo-section>

      <!-- Plassering -->
      <app-demo-section
        title="Plassering"
        [code]="plasseringCode"
        description="Vurder om tooltip skal plasseres over, under eller ved siden av elementet."
      >
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
      </app-demo-section>

      <!-- Tastatursnarvei -->
      <app-demo-section
        title="Tastatursnarvei"
        [code]="tastatursnarveiCode"
        description="Tooltip kan brukes til å vise tastatursnarveier."
      >
        <div class="flex flex-wrap items-center gap-4">
          <button hviButton variant="primary" hviTooltip="Ctrl+S">Lagre</button>
          <button hviButton variant="secondary" hviTooltip="Ctrl+Z">Angre</button>
          <button hviButton variant="secondary" hviTooltip="Ctrl+C">Kopier</button>
          <button hviButton variant="secondary" hviTooltip="Ctrl+V">Lim inn</button>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class TooltipDemoComponent {
  readonly ikonKnappMedTooltipCode = TooltipIkonKnappMedTooltipExampleSource;
  readonly tekstMedTooltipCode = TooltipTekstMedTooltipExampleSource;
  readonly plasseringCode = TooltipPlasseringExampleSource;
  readonly tastatursnarveiCode = TooltipTastatursnarveiExampleSource;
}
