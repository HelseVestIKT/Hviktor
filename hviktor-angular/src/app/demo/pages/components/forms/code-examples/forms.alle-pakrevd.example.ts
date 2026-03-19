import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  HviButton,
  HviFieldKit,
  HviForms,
  HviRequiredTag,
  HviTextfield,
  HviValidationKit,
} from '@helsevestikt/hviktor';

@Component({
  selector: 'app-forms-alle-pakrevd-example',
  standalone: true,
  imports: [
    HviButton,
    HviFieldKit,
    HviForms,
    HviRequiredTag,
    HviTextfield,
    HviValidationKit,
    ReactiveFormsModule,
  ],
  template: `
    <form hviForm #allReqForm="hviForm" [formGroup]="allRequiredForm" class="max-w-md">
      @if (allReqForm.requiredMode() === 'all-required') {
        <hvi-required-tag mode="all-required" />
      }
      <hvi-textfield label="Fornavn" formControlName="firstName" required />
      <hvi-textfield label="Etternavn" formControlName="lastName" required />
      <hvi-textfield label="E-post" formControlName="email" type="email" required />
      <div class="mt-4">
        <button hviButton type="submit" variant="primary">Send inn</button>
      </div>
    </form>
  `,
})
export class FormsAllePakrevdExampleComponent {
  /** Alle felt er påkrevde → requiredMode = 'all-required' */
  allRequiredForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
}
