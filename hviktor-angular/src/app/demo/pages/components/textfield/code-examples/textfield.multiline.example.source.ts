// Auto-generated - do not edit manually
export const TextfieldMultilineExampleSource = `import { Component } from '@angular/core';
import { HviTextfield } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-textfield-multiline-example',
  standalone: true,
  imports: [HviTextfield],
  template: \`
    <hvi-textfield label="Label" [multiline]="true" [rows]="4"></hvi-textfield>
  \`,
})
export class TextfieldMultilineExampleComponent {
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
