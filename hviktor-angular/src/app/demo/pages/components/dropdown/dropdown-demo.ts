import { Component } from '@angular/core';
import { HviButton, HviDropdown, HviParagraph } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { DropdownMedDropdownplacementKanManDefinereUlikePlasseringerExampleSource } from './code-examples/dropdown.med-dropdownplacement-kan-man-definere-ulike-plasseringer.example.source';
import { DropdownStandardExampleSource } from './code-examples/dropdown.standard.example.source';
@Component({
  selector: 'app-dropdown-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent, HviDropdown, HviButton, HviParagraph],
  template: `
    <app-demo-page
      title="Dropdown"
      description="Dropdown er en generisk nedtrekksliste. Den legger grunnmuren for å bygge menyer og lister."
    >
      <app-demo-section title="Standard" [code]="standardCode">
        <p hviParagraph>Standard dropdown har plassering bottom-end</p>
        <div class="flex flex-wrap gap-2">
          <button hviButton popovertarget="dropdown1">Åpne dropdown</button>
          <hvi-dropdown id="dropdown1" popover>
            <ul>
              <li>
                <button hviButton variant="tertiary">Menylenke</button>
              </li>
              <li>
                <button hviButton variant="tertiary">Menylenke</button>
              </li>
            </ul>
          </hvi-dropdown>
        </div>
      </app-demo-section>

      <app-demo-section
        title="Med dropdownPlacement kan man definere ulike plasseringer"
        [code]="medDropdownplacementKanManDefinereUlikePlasseringerCode"
      >
        <div class="flex flex-wrap gap-2">
          <button hviButton popovertarget="dropdown2">top-start</button>
          <hvi-dropdown id="dropdown2" popover dropdownPlacement="top-start">
            <ul>
              <li>
                <button hviButton variant="tertiary">Menylenke</button>
              </li>
              <li>
                <button hviButton variant="tertiary">Menylenke</button>
              </li>
            </ul>
          </hvi-dropdown>

          <button hviButton popovertarget="left">left-start</button>
          <hvi-dropdown id="left" popover dropdownPlacement="left-start">
            <ul>
              <li>
                <button hviButton variant="tertiary">Menylenke</button>
              </li>
              <li>
                <button hviButton variant="tertiary">Menylenke</button>
              </li>
            </ul>
          </hvi-dropdown>

          <button hviButton popovertarget="right">right-end</button>
          <hvi-dropdown id="right" popover dropdownPlacement="right-end">
            <ul>
              <li>
                <button hviButton variant="tertiary">Menylenke</button>
              </li>
              <li>
                <button hviButton variant="tertiary">Menylenke</button>
              </li>
            </ul>
          </hvi-dropdown>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class DropdownDemoComponent {
  readonly standardCode = DropdownStandardExampleSource;
  readonly medDropdownplacementKanManDefinereUlikePlasseringerCode =
    DropdownMedDropdownplacementKanManDefinereUlikePlasseringerExampleSource;
}
