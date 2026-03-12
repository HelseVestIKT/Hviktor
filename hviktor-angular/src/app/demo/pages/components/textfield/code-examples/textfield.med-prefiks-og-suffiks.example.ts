import { Component } from '@angular/core';
import { HviTextfield } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-textfield-med-prefiks-og-suffiks-example',
  standalone: true,
  imports: [HviTextfield],
  template: `
    <hvi-textfield
      label="Hvor mange kroner koster det per måned?"
      prefix="NOK"
      suffix="pr. mnd"
    ></hvi-textfield>
  `,
})
export class TextfieldMedPrefiksOgSuffiksExampleComponent {
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
