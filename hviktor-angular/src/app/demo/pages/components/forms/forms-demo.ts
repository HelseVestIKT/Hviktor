import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  HviButton,
  HviFieldKit,
  HviForms,
  HviLabel,
  HviValidationKit,
  HviValidationMessages,
} from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-forms-demo',
  standalone: true,
  imports: [
    HviForms,
    HviFieldKit,
    HviValidationKit,
    HviButton,
    HviLabel,
    DemoPageComponent,
    DemoSectionComponent,
  ],
  template: `
    <app-demo-page title="Forms" description="Skjemakomponenter med validering og feilmeldinger.">
      <app-demo-section title="Komplett skjema">
        <form hviForm [formGroup]="form" [focusOnInvalid]="summary" (hviSubmitted)="onSubmit()">
          <fieldset hviFieldset>
            <legend hviLabel>Person</legend>

            <hvi-field>
              <label hviLabel for="firstName" weight="medium">Fornavn</label>
              <input hviInput id="firstName" formControlName="firstName" hviControlInvalid />
              <p
                hviFieldValidation
                hviValidationMessage="firstName"
                [messages]="messages['firstName']"
              ></p>
            </hvi-field>

            <hvi-field>
              <label hviLabel for="lastName" weight="medium">Etternavn</label>
              <input hviInput id="lastName" formControlName="lastName" hviControlInvalid />
              <p
                hviFieldValidation
                hviValidationMessage="lastName"
                [messages]="messages['lastName']"
              ></p>
            </hvi-field>
          </fieldset>

          <fieldset hviFieldset>
            <legend hviLabel>Kontakt</legend>

            <hvi-field>
              <label hviLabel for="email" weight="medium">E-post</label>
              <input hviInput id="email" type="email" formControlName="email" hviControlInvalid />
              <p hviFieldValidation hviValidationMessage="email" [messages]="messages['email']"></p>
            </hvi-field>

            <hvi-field>
              <label hviLabel for="phone" weight="medium">Telefon</label>
              <input hviInput id="phone" type="tel" formControlName="phone" hviControlInvalid />
              <p hviFieldValidation hviValidationMessage="phone" [messages]="messages['phone']"></p>
            </hvi-field>
          </fieldset>

          <fieldset hviFieldset>
            <legend hviLabel>Samtykke</legend>

            <hvi-field position="start">
              <input
                hviInput
                id="consent"
                type="checkbox"
                formControlName="consent"
                hviControlInvalid
              />
              <label hviLabel for="consent" weight="medium">
                Jeg bekrefter at opplysningene er riktige
              </label>
              <p
                hviFieldValidation
                hviValidationMessage="consent"
                [messages]="messages['consent']"
              ></p>
            </hvi-field>
          </fieldset>

          <div class="my-4 flex flex-wrap gap-2">
            <button hviButton type="submit" variant="primary">Send inn</button>
            <button hviButton type="button" variant="secondary" (click)="form.reset()">
              Nullstill
            </button>
          </div>

          <hvi-error-summary #summary [form]="form" [messages]="messages" showWhen="submitted" />
        </form>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class FormsDemoComponent {
  form = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    consent: new FormControl(false, [Validators.requiredTrue]),
  });

  messages: Record<string, HviValidationMessages> = {
    firstName: {
      required: 'Fornavn er påkrevd',
      minlength: 'Fornavn må være minst 2 tegn',
    },
    lastName: {
      required: 'Etternavn er påkrevd',
      minlength: 'Etternavn må være minst 2 tegn',
    },
    email: {
      required: 'E-post er påkrevd',
      email: 'E-post må være gyldig',
    },
    phone: {
      required: 'Telefon er påkrevd',
      pattern: 'Telefonnummer kan kun inneholde siffer',
    },
    consent: {
      requiredTrue: 'Du må samtykke før du kan sende inn',
    },
  };

  onSubmit(): void {
    if (this.form.valid) {
      alert('Skjema sendt inn!');
    } else {
      this.form.markAllAsTouched();
    }
  }
}
