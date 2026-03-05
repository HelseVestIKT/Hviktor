import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HviField, HviLabel, HviSelect, HviTextfield } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-textfield-type-example',
  standalone: true,
  imports: [HviField, HviLabel, HviSelect, HviTextfield, FormsModule],
  template: `
    <div class="flex gap-2">
      <hvi-field>
        <label hviLabel for="type-select" weight="medium">Velg type</label>
        <select hviSelect id="type-select" [(ngModel)]="selectedType">
          @for (type of types; track type) {
            <option [value]="type" [selected]="type === selectedType">{{ type }}</option>
          }
        </select>
      </hvi-field>

      <hvi-textfield
        [label]="'type=&quot;' + selectedType + '&quot;'"
        [type]="selectedType"
      ></hvi-textfield>
    </div>
  `,
})
export class TextfieldTypeExampleComponent {
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
