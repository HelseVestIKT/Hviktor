import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  HviButton,
  HviControlInvalid,
  HviErrorSummary,
  HviField,
  HviFieldValidation,
  HviForms,
  HviInput,
  HviLabel,
  HviValidationMessage,
  HviValidationMessages,
} from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-error-summary-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    HviErrorSummary,
    HviForms,
    HviField,
    HviInput,
    HviLabel,
    HviFieldValidation,
    HviValidationMessage,
    HviControlInvalid,
    HviButton,
  ],
  template: `
    <app-demo-page
      title="ErrorSummary"
      description="ErrorSummary er en oppsummering av feil. Den gir brukeren oversikt over feil eller mangler som må rettes på en side eller trinn, for å komme videre."
    >
      <!-- Manuell modus -->
      <app-demo-section
        title="Manuell modus"
        description="ErrorSummary kan brukes manuelt ved å sende inn en liste med feil. Hver feil har en melding og en href som peker til feltet."
      >
        <hvi-error-summary
          showWhen="always"
          [errors]="[
            { message: 'Fødselsdato kan ikke være etter år 2005', href: '#fodselsdato' },
            { message: 'Telefonnummer kan kun inneholde siffer', href: '#telefon-manuell' },
            { message: 'E-post må være gyldig', href: '#epost-manuell' },
          ]"
        />
      </app-demo-section>

      <!-- Bruk i skjema -->
      <app-demo-section
        title="Bruk i skjema"
        description="I eksempelet under kan du trykke på hver lenke i ErrorSummary for å navigere til det aktuelle feltet med feil."
      >
        <form hviForm [formGroup]="form" [focusOnInvalid]="summary" class="grid gap-4">
          <hvi-field>
            <label hviLabel for="fornavn" weight="medium">Fornavn</label>
            <input
              hviInput
              id="fornavn"
              formControlName="fornavn"
              hviControlInvalid
              aria-describedby="fornavn-validation"
            />
            <p
              hviFieldValidation
              id="fornavn-validation"
              hviValidationMessage="fornavn"
              [messages]="messages['fornavn']"
            ></p>
          </hvi-field>

          <hvi-field>
            <label hviLabel for="telefon" weight="medium">Telefon</label>
            <input
              hviInput
              id="telefon"
              type="tel"
              formControlName="telefon"
              hviControlInvalid
              aria-describedby="telefon-validation"
            />
            <p
              hviFieldValidation
              id="telefon-validation"
              hviValidationMessage="telefon"
              [messages]="messages['telefon']"
            ></p>
          </hvi-field>

          <hvi-error-summary #summary [form]="form" [messages]="messages" showWhen="always" />

          <div class="flex gap-2">
            <button hviButton type="submit" variant="primary">Send inn</button>
            <button hviButton type="button" variant="secondary" (click)="form.reset()">
              Nullstill
            </button>
          </div>
        </form>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class ErrorSummaryDemoComponent {
  form = new FormGroup({
    fornavn: new FormControl('', [Validators.required, Validators.minLength(2)]),
    telefon: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
  });

  messages: Record<string, HviValidationMessages> = {
    fornavn: {
      required: 'Fornavn er påkrevd',
      minlength: 'Fornavn må være minst 2 tegn',
    },
    telefon: {
      required: 'Telefon er påkrevd',
      pattern: 'Telefonnummer kan kun inneholde siffer',
    },
  };
}
