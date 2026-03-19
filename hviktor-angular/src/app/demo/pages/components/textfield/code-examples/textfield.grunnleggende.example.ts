import { Component } from '@angular/core';
import { HviTextfield } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-textfield-grunnleggende-example',
  standalone: true,
  imports: [HviTextfield],
  template: ` <hvi-textfield label="Label"></hvi-textfield> `,
})
export class TextfieldGrunnleggendeExampleComponent {
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
