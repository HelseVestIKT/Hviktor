// Auto-generated - do not edit manually
export const InputMedFeilExampleSource = `import { Component } from '@angular/core';
import {
  HviField,
  HviFieldDescription,
  HviFieldValidation,
  HviInput,
  HviLabel,
} from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-input-med-feil-example',
  standalone: true,
  imports: [HviField, HviInput, HviLabel, HviFieldDescription, HviFieldValidation],
  template: \`
    <hvi-field>
      <label hviLabel for="fnr-error" weight="medium">Fødselsnummer</label>
      <p hviFieldDescription>Fødselsnummer må inneholde 11 siffer</p>
      <input
        hviInput
        type="text"
        id="fnr-error"
        [attr.aria-invalid]="hasFodselsnummerError ? 'true' : null"
        (input)="validerFodselsnummer($any($event.target).value)"
      />
      @if (hasFodselsnummerError) {
        <p hviFieldValidation>Fødselsnummeret må inneholde 11 siffer</p>
      }
    </hvi-field>
  \`,
})
export class InputMedFeilExampleComponent {
  hasFodselsnummerError = true;

  validerFodselsnummer(value: string): void {
    this.hasFodselsnummerError = !/^\d{11}$/.test(value);
  }
}
`;
