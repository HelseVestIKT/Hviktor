import { Component } from '@angular/core';
import { HviButton, HviDropdown } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-dropdown-med-dropdownplacement-kan-man-definere-ulike-plasseringer-example',
  standalone: true,
  imports: [HviButton, HviDropdown],
  template: `
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
  `,
})
export class DropdownMedDropdownplacementKanManDefinereUlikePlasseringerExampleComponent {}
