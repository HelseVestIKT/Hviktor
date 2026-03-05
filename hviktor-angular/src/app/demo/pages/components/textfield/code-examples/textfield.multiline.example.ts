import { Component } from '@angular/core';
import { HviTextfield } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-textfield-multiline-example',
  standalone: true,
  imports: [HviTextfield],
  template: ` <hvi-textfield label="Label" [multiline]="true" [rows]="4"></hvi-textfield> `,
})
export class TextfieldMultilineExampleComponent {}
