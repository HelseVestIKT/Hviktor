import { Component } from '@angular/core';
import { HviTextfield } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-textfield-pakrevde-og-valgfrie-felt-example',
  standalone: true,
  imports: [HviTextfield],
  template: `
    <div class="space-y-4">
      <hvi-textfield label="Hvor bor du?" requiredMode="required" required></hvi-textfield>
      <hvi-textfield label="Kommentar" requiredMode="optional"></hvi-textfield>
    </div>
  `,
})
export class TextfieldPakrevdeOgValgfrieFeltExampleComponent {
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
