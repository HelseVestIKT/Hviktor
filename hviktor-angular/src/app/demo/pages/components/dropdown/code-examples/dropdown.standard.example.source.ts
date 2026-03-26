// Auto-generated - do not edit manually
export const DropdownStandardExampleSource = `import { Component } from '@angular/core';
import { HviButton, HviDropdown, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-dropdown-standard-example',
  standalone: true,
  imports: [HviButton, HviDropdown, HviParagraph],
  template: \`
    <p hviParagraph>Standard dropdown har plassering bottom-end</p>
    <div class="flex flex-wrap gap-2">
      <button hviButton popovertarget="dropdown1">Åpne dropdown</button>
      <hvi-dropdown id="dropdown1">
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
  \`,
})
export class DropdownStandardExampleComponent {
}
`;
