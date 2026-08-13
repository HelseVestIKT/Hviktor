// Auto-generated - do not edit manually
export const TextfieldTypeExampleSource = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HviField, HviLabel, HviSelect, HviTextfield, HviTextfieldType, } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-textfield-type-example',
  standalone: true,
  imports: [HviField, HviLabel, HviSelect, HviTextfield, FormsModule],
  template: \`
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
  \`,
})
export class TextfieldTypeExampleComponent {
  readonly types: HviTextfieldType[] = [
    'number',
    'hidden',
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'month',
    'password',
    'search',
    'tel',
    'text',
    'time',
    'url',
    'week',
  ];

  selectedType: HviTextfieldType = 'text';
}
`;
