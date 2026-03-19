// Auto-generated - do not edit manually
export const FormsBlandetExampleSource = `import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { HviButton, HviForms, HviTextfield, HviValidationKit, HviValidationMessages } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-forms-blandet-example',
  standalone: true,
  imports: [HviButton, HviForms, HviTextfield, HviValidationKit, ReactiveFormsModule],
  template: \`
    <form hviForm #mixedForm="hviForm" [formGroup]="mixedRequiredForm" class="max-w-md">
      <hvi-textfield label="Fornavn" formControlName="firstName" required />
      <hvi-textfield label="Etternavn" formControlName="lastName" required />
      <hvi-textfield label="Telefon" formControlName="phone" type="tel" />
      <hvi-textfield
        label="Kommentar"
        formControlName="comment"
        [multiline]="true"
        [rows]="3"
      />
      <div class="mt-4">
        <button hviButton type="submit" variant="primary">Send inn</button>
      </div>
    </form>
  \`,
})
export class FormsBlandetExampleComponent {
  /** Blanding av påkrevde og valgfrie → requiredMode = 'mixed' */
  mixedRequiredForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
    comment: new FormControl(''),
  });
}
`;
