// Auto-generated - do not edit manually
export const TextfieldMedTellerExampleSource = `import { Component } from '@angular/core';
import { HviTextfield } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-textfield-med-teller-example',
  standalone: true,
  imports: [HviTextfield],
  template: \`
    <hvi-textfield
      label="Hvor mange kroner koster det per måned?"
      [counterLimit]="10"
    ></hvi-textfield>
  \`,
})
export class TextfieldMedTellerExampleComponent {
  types = [
    'text',
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'month',
    'hidden',
    'number',
    'password',
    'search',
    'tel',
    'time',
    'url',
    'week',
  ];
  selectedType: any = 'text';
}
`;
