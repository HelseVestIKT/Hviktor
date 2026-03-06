import { Component } from '@angular/core';
import { HviButton, HviParagraph, HviPopover } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { PopoverMedFargeDangerExampleSource } from './code-examples/popover.med-farge-danger.example.source';
import { PopoverMedPlasseringExampleSource } from './code-examples/popover.med-plassering.example.source';
import { PopoverStandardExampleSource } from './code-examples/popover.standard.example.source';
@Component({
  selector: 'app-popover-demo',
  standalone: true,
  imports: [HviPopover, HviButton, HviParagraph, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page componentId="popover">
      <app-demo-section title="Standard" [code]="standardCode">
        <div class="flex flex-wrap gap-4">
          <button hviButton popovertarget="popover1">Åpne popover</button>
          <hvi-popover id="popover1">Popoverinnhold</hvi-popover>
        </div>
      </app-demo-section>

      <app-demo-section title="Med plassering" [code]="medPlasseringCode">
        <div class="flex flex-wrap gap-4">
          <button hviButton variant="secondary" popovertarget="popoverTop">Top</button>
          <hvi-popover id="popoverTop" placement="top">Plassert på toppen</hvi-popover>

          <button hviButton variant="secondary" popovertarget="popoverBottom">Bottom</button>
          <hvi-popover id="popoverBottom" placement="bottom">Plassert på bunnen</hvi-popover>

          <button hviButton variant="secondary" popovertarget="popoverLeft">Left</button>
          <hvi-popover id="popoverLeft" placement="left">Plassert til venstre</hvi-popover>

          <button hviButton variant="secondary" popovertarget="popoverRight">Right</button>
          <hvi-popover id="popoverRight" placement="right">Plassert til høyre</hvi-popover>
        </div>
      </app-demo-section>

      <app-demo-section title="Med farge (danger)" [code]="medFargeDangerCode">
        <div class="flex flex-wrap gap-4">
          <button hviButton color="danger" popovertarget="popoverDanger">Slett</button>
          <hvi-popover id="popoverDanger" color="danger">
            <p hviParagraph>Er du sikker på at du vil slette?</p>
            <div class="mt-2 flex gap-2">
              <button hviButton size="sm" color="danger">Slett</button>
              <button hviButton size="sm" variant="tertiary">Avbryt</button>
            </div>
          </hvi-popover>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class PopoverDemoComponent {
  readonly standardCode = PopoverStandardExampleSource;
  readonly medPlasseringCode = PopoverMedPlasseringExampleSource;
  readonly medFargeDangerCode = PopoverMedFargeDangerExampleSource;
}
