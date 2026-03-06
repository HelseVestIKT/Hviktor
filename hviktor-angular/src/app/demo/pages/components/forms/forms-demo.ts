import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  HviButton,
  HviFieldKit,
  HviForms,
  HviParagraph,
  HviSelect,
  HviValidationKit,
  HviValidationMessages,
} from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { FormsKontaktskjemaExampleSource } from './code-examples/forms.kontaktskjema.example.source';
@Component({
  selector: 'app-forms-demo',
  standalone: true,
  imports: [
    HviForms,
    HviFieldKit,
    HviValidationKit,
    HviButton,
    HviParagraph,
    HviSelect,
    DemoPageComponent,
    DemoSectionComponent,
  ],
  template: `
    <app-demo-page componentId="form">
      <app-demo-section
        title="Kontaktskjema"
        [code]="kontaktskjemaCode"
        description="Et fullstendig kontaktskjema med reaktiv validering og error summary."
      >
        <form
          hviForm
          [formGroup]="contactForm"
          [focusOnInvalid]="summary"
          (hviSubmitted)="onSubmit()"
          class="max-w-2xl"
        >
          <!-- Personalia -->
          <fieldset hviFieldset>
            <legend hviLabel weight="medium">Personalia</legend>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
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
            </div>
          </fieldset>

          <!-- Kontaktinformasjon -->
          <fieldset hviFieldset>
            <legend hviLabel weight="medium">Kontaktinformasjon</legend>

            <hvi-field>
              <label hviLabel for="email" weight="medium">E-post</label>
              <span hviFieldDescription>Vi bruker e-posten til å svare deg</span>
              <input hviInput id="email" type="email" formControlName="email" hviControlInvalid />
              <p hviFieldValidation hviValidationMessage="email" [messages]="messages['email']"></p>
            </hvi-field>

            <hvi-field>
              <label hviLabel for="phone" weight="medium">
                Telefon
                <span hviFieldOptional>(valgfritt)</span>
              </label>
              <input
                hviInput
                id="phone"
                type="tel"
                formControlName="phone"
                hviControlInvalid
                placeholder="+47 000 00 000"
              />
              <p hviFieldValidation hviValidationMessage="phone" [messages]="messages['phone']"></p>
            </hvi-field>
          </fieldset>

          <!-- Henvendelse -->
          <fieldset hviFieldset>
            <legend hviLabel weight="medium">Din henvendelse</legend>

            <hvi-field>
              <label hviLabel for="subject" weight="medium">Emne</label>
              <select hviSelect id="subject" formControlName="subject" hviControlInvalid>
                <option value="" disabled>Velg emne</option>
                <option value="general">Generell henvendelse</option>
                <option value="support">Teknisk support</option>
                <option value="feedback">Tilbakemelding</option>
                <option value="complaint">Klage</option>
                <option value="other">Annet</option>
              </select>
              <p
                hviFieldValidation
                hviValidationMessage="subject"
                [messages]="messages['subject']"
              ></p>
            </hvi-field>

            <hvi-field>
              <label hviLabel for="message" weight="medium">Melding</label>
              <span hviFieldDescription>Beskriv henvendelsen din så detaljert som mulig</span>
              <textarea
                hviInput
                id="message"
                formControlName="message"
                hviControlInvalid
                rows="5"
                maxlength="500"
              ></textarea>
              <hvi-field-counter [limit]="500" />
              <p
                hviFieldValidation
                hviValidationMessage="message"
                [messages]="messages['message']"
              ></p>
            </hvi-field>
          </fieldset>

          <!-- Preferanser -->
          <fieldset hviFieldset>
            <legend hviLabel weight="medium">Preferanser</legend>
            <p hviParagraph>Hvordan vil du helst at vi skal kontakte deg?</p>

            <hvi-field>
              <input
                hviInput
                id="pref-email"
                type="radio"
                name="contactPreference"
                value="email"
                formControlName="contactPreference"
              />
              <label hviLabel for="pref-email">E-post</label>
            </hvi-field>

            <hvi-field>
              <input
                hviInput
                id="pref-phone"
                type="radio"
                name="contactPreference"
                value="phone"
                formControlName="contactPreference"
              />
              <label hviLabel for="pref-phone">Telefon</label>
            </hvi-field>

            <hvi-field>
              <input
                hviInput
                id="newsletter"
                type="checkbox"
                role="switch"
                formControlName="newsletter"
              />
              <label hviLabel for="newsletter" weight="medium"> Meld meg på nyhetsbrev </label>
            </hvi-field>
          </fieldset>

          <!-- Samtykke -->
          <fieldset hviFieldset>
            <legend hviLabel weight="medium">Samtykke</legend>

            <hvi-field>
              <input
                hviInput
                id="consent"
                type="checkbox"
                formControlName="consent"
                hviControlInvalid
              />
              <label hviLabel for="consent">
                Jeg har lest og godtar
                <a href="#" class="ds-link">personvernerklæringen</a>
              </label>
              <p
                hviFieldValidation
                hviValidationMessage="consent"
                [messages]="messages['consent']"
              ></p>
            </hvi-field>
          </fieldset>

          <!-- Knapper -->
          <div class="my-4 flex flex-wrap gap-2">
            <button hviButton type="submit" variant="primary">Send inn</button>
            <button
              hviButton
              type="button"
              variant="secondary"
              (click)="contactForm.reset({ contactPreference: 'email' })"
            >
              Nullstill
            </button>
          </div>

          <!-- Error summary -->
          <hvi-error-summary
            #summary
            [form]="contactForm"
            [messages]="messages"
            showWhen="submitted"
          />
        </form>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class FormsDemoComponent {
  readonly kontaktskjemaCode = FormsKontaktskjemaExampleSource;

  contactForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.pattern(/^(\+47)?\s?\d{3}\s?\d{2}\s?\d{3}$/)]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500),
    ]),
    contactPreference: new FormControl('email'),
    newsletter: new FormControl(false),
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
      email: 'Oppgi en gyldig e-postadresse',
    },
    phone: {
      pattern: 'Oppgi et gyldig norsk telefonnummer',
    },
    subject: {
      required: 'Velg et emne',
    },
    message: {
      required: 'Skriv en melding',
      minlength: 'Meldingen må være minst 10 tegn',
      maxlength: 'Meldingen kan ikke være mer enn 500 tegn',
    },
    consent: {
      requiredTrue: 'Du må godta personvernerklæringen',
    },
  };

  onSubmit(): void {
    if (this.contactForm.valid) {
      alert('Takk for din henvendelse! Vi svarer deg så snart som mulig.');
      this.contactForm.reset({ contactPreference: 'email' });
    }
  }
}
