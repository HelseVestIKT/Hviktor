import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  HviButton,
  HviFieldKit,
  HviForms,
  HviLabel,
  HviParagraph,
  HviRequiredTag,
  HviSelect,
  HviTextfield,
  HviValidationKit,
  HviValidationMessages,
} from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { FormsAllePakrevdExampleSource } from './code-examples/forms.alle-pakrevd.example.source';
import { FormsBlandetExampleSource } from './code-examples/forms.blandet.example.source';
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
    HviRequiredTag,
    HviTextfield,
    HviLabel,
    DemoPageComponent,
    DemoSectionComponent,
  ],
  template: `
    <app-demo-page componentId="form">
      <app-demo-section
        title="Alle påkrevd"
        [code]="allePakrevdCode"
        description="Når alle felt i et skjema er påkrevde, analyserer HviForm dette automatisk og setter requiredMode til 'all-required'. Vis hvi-required-tag med mode all-required øverst i skjemaet."
      >
        <form hviForm #allReqForm="hviForm" [formGroup]="allRequiredForm" class="max-w-md">
          @if (allReqForm.requiredMode() === 'all-required') {
            <hvi-required-tag mode="all-required" />
          }
          <hvi-textfield label="Fornavn" formControlName="firstName" required />
          <p
            hviFieldValidation
            hviValidationMessage="firstName"
            [messages]="messages['firstName']"
          ></p>
          <hvi-textfield label="Etternavn" formControlName="lastName" required />
          <p
            hviFieldValidation
            hviValidationMessage="lastName"
            [messages]="messages['lastName']"
          ></p>
          <hvi-textfield label="E-post" formControlName="email" type="email" required />
          <p hviFieldValidation hviValidationMessage="email" [messages]="messages['email']"></p>
          <div class="mt-4">
            <button hviButton type="submit" variant="primary">Send inn</button>
          </div>
        </form>
      </app-demo-section>

      <app-demo-section
        title="Blandet"
        [code]="blandetCode"
        description="Når noen felt er påkrevde og andre valgfrie, setter HviForm requiredMode til 'mixed'. HviTextfield viser da automatisk riktig required- eller optional-tag per felt."
      >
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

          <!-- Error summary -->
          <hvi-error-summary
            #summary
            [form]="allRequiredForm"
            [messages]="messages"
            showWhen="submitted"
          />
        </form>
      </app-demo-section>

      <app-demo-section
        title="Kontaktskjema"
        [code]="kontaktskjemaCode"
        description="Et fullstendig kontaktskjema med reaktiv validering og error summary."
      >
        <form
          hviForm
          #myForm="hviForm"
          [formGroup]="contactForm"
          [focusOnInvalid]="summary"
          (hviSubmitted)="onContactFormSubmit()"
          class="max-w-2xl"
        >
          <!-- Automatisk required-tag basert på FormGroup-analyse -->
          @if (myForm.requiredMode() === 'all-required') {
            <hvi-required-tag mode="all-required" />
          }
          <!-- Personalia -->
          <fieldset hviFieldset>
            <legend hviLabel>Personalia</legend>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <hvi-field>
                <label hviLabel for="firstName">
                  Fornavn <hvi-required-tag mode="required" />
                </label>
                <input hviInput id="firstName" formControlName="firstName" hviControlInvalid />
                <p
                  hviFieldValidation
                  hviValidationMessage="firstName"
                  [messages]="messages['firstName']"
                ></p>
              </hvi-field>

              <hvi-field>
                <label hviLabel for="lastName">
                  Etternavn <hvi-required-tag mode="required" />
                </label>
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
            <legend hviLabel>Kontaktinformasjon</legend>

            <hvi-field>
              <label hviLabel for="email"> E-post <hvi-required-tag mode="required" /> </label>
              <span hviFieldDescription>Vi bruker e-posten til å svare deg</span>
              <input hviInput id="email" type="email" formControlName="email" hviControlInvalid />
              <p hviFieldValidation hviValidationMessage="email" [messages]="messages['email']"></p>
            </hvi-field>

            <hvi-field>
              <label hviLabel for="phone"> Telefon <hvi-required-tag mode="optional" /> </label>
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
            <legend hviLabel>Din henvendelse</legend>

            <hvi-field>
              <label hviLabel for="subject"> Emne <hvi-required-tag mode="required" /> </label>
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
              <label hviLabel for="message"> Melding <hvi-required-tag mode="required" /> </label>
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
            <legend hviLabel>Preferanser <hvi-required-tag /></legend>
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
              <label hviLabel for="newsletter"> Meld meg på nyhetsbrev </label>
            </hvi-field>
          </fieldset>

          <!-- Samtykke -->
          <fieldset hviFieldset>
            <legend hviLabel>Samtykke<hvi-required-tag /></legend>

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
  readonly allePakrevdCode = FormsAllePakrevdExampleSource;
  readonly blandetCode = FormsBlandetExampleSource;
  readonly kontaktskjemaCode = FormsKontaktskjemaExampleSource;

  /** Alle felt er påkrevde → requiredMode = 'all-required' */
  allRequiredForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  /** Blanding av påkrevde og valgfrie → requiredMode = 'mixed' */
  mixedRequiredForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    phone: new FormControl(''),
    comment: new FormControl(''),
  });

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
    newsletter: new FormControl(false, [Validators.required]),
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

  onAllRequiredSubmit(): void {
    if (this.allRequiredForm.valid) {
      alert('Alle påkrevde felt er fylt ut! Skjemaet er gyldig.');
      this.allRequiredForm.reset();
    }
  }

  onMixedSubmit(): void {
    if (this.mixedRequiredForm.valid) {
      alert('Skjemaet er gyldig! Påkrevde felt er fylt ut, valgfrie kan være tomme.');
      this.mixedRequiredForm.reset();
    }
  }

  onContactFormSubmit(): void {
    if (this.contactForm.valid) {
      alert('Takk for din henvendelse! Vi svarer deg så snart som mulig.');
      this.contactForm.reset({ contactPreference: 'email' });
    }
  }
}
