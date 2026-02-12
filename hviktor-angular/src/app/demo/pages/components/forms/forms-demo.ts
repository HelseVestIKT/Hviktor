import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  HviButton,
  HviFieldKit,
  HviForms,
  HviLabel,
  HviParagraph,
  HviSelect,
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
    HviParagraph,
    HviSelect,
    DemoPageComponent,
    DemoSectionComponent,
  ],
  template: `
    <app-demo-page title="Forms" description="Skjemakomponenter med validering og feilmeldinger.">
      <!-- Basic Input Fields -->
      <app-demo-section title="Grunnleggende input-felt">
        <p hviParagraph class="mb-4">Enkle input-felt med label og ulike tilstander.</p>
        <div class="grid gap-4">
          <hvi-field>
            <label hviLabel for="basicText" weight="medium">Tekstfelt</label>
            <span hviFieldDescription>Hjelpetekst for feltet</span>
            <input hviInput id="basicText" type="text" placeholder="Skriv her..." />
          </hvi-field>

          <hvi-field>
            <label hviLabel for="basicEmail" weight="medium">E-post</label>
            <input hviInput id="basicEmail" type="email" placeholder="navn@eksempel.no" />
          </hvi-field>

          <hvi-field>
            <label hviLabel for="basicPassword" weight="medium">Passord</label>
            <input hviInput id="basicPassword" type="password" placeholder="••••••••" />
          </hvi-field>

          <hvi-field>
            <label hviLabel for="basicNumber" weight="medium">Tall</label>
            <input hviInput id="basicNumber" type="number" placeholder="0" />
          </hvi-field>
        </div>
      </app-demo-section>

      <!-- Input States -->
      <app-demo-section title="Input-tilstander">
        <p hviParagraph class="mb-4">
          Input-felt kan ha ulike tilstander som disabled og readonly.
        </p>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <hvi-field>
            <label hviLabel for="normalState" weight="medium">Normal</label>
            <input hviInput id="normalState" type="text" value="Redigerbar tekst" />
          </hvi-field>

          <hvi-field>
            <label hviLabel for="disabledState" weight="medium">Disabled</label>
            <input hviInput id="disabledState" type="text" value="Deaktivert felt" disabled />
          </hvi-field>

          <hvi-field>
            <label hviLabel for="readonlyState" weight="medium">Readonly</label>
            <input hviInput id="readonlyState" type="text" value="Skrivebeskyttet" readOnly />
          </hvi-field>
        </div>
      </app-demo-section>

      <!-- Field with Affixes -->
      <app-demo-section title="Felt med prefiks og suffiks">
        <p hviParagraph class="mb-4">
          Input-felt kan ha dekorative prefikser og suffikser for å gi kontekst.
        </p>
        <div class="grid grid-cols-1 gap-4">
          <hvi-field>
            <label hviLabel for="price" weight="medium">Pris</label>
            <hvi-field-affixes>
              <hvi-field-affix>NOK</hvi-field-affix>
              <input hviInput id="price" type="number" placeholder="0" />
            </hvi-field-affixes>
          </hvi-field>

          <hvi-field>
            <label hviLabel for="rent" weight="medium">Husleie</label>
            <hvi-field-affixes>
              <hvi-field-affix>kr</hvi-field-affix>
              <input hviInput id="rent" type="number" placeholder="0" />
              <hvi-field-affix>per måned</hvi-field-affix>
            </hvi-field-affixes>
          </hvi-field>

          <hvi-field>
            <label hviLabel for="domain" weight="medium">Domene</label>
            <hvi-field-affixes>
              <hvi-field-affix>https://</hvi-field-affix>
              <input hviInput id="domain" type="text" placeholder="eksempel" />
              <hvi-field-affix>.no</hvi-field-affix>
            </hvi-field-affixes>
          </hvi-field>

          <hvi-field>
            <label hviLabel for="weight" weight="medium">Vekt</label>
            <hvi-field-affixes>
              <input hviInput id="weight" type="number" placeholder="0" />
              <hvi-field-affix>kg</hvi-field-affix>
            </hvi-field-affixes>
          </hvi-field>
        </div>
      </app-demo-section>

      <!-- Optional Fields -->
      <app-demo-section title="Valgfrie felt">
        <p hviParagraph class="mb-4">Marker valgfrie felt med hviFieldOptional direktiv.</p>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <hvi-field>
            <label hviLabel for="requiredField" weight="medium">Påkrevd felt</label>
            <input hviInput id="requiredField" type="text" placeholder="Dette må fylles ut" />
          </hvi-field>

          <hvi-field>
            <label hviLabel for="optionalField" weight="medium">
              Valgfritt felt
              <span hviFieldOptional>(valgfritt)</span>
            </label>
            <input hviInput id="optionalField" type="text" placeholder="Kan hoppes over" />
          </hvi-field>
        </div>
      </app-demo-section>

      <!-- Checkboxes and Radio Buttons -->
      <app-demo-section title="Avmerkingsbokser">
        <p hviParagraph class="mb-4">Avmerkingsbokser for enkeltvalg eller flere valg.</p>
        <fieldset hviFieldset>
          <legend hviLabel>Hvilke interesser har du?</legend>
          <p hviParagraph class="text-sm">Velg alle som passer.</p>

          <hvi-field position="start">
            <input hviInput id="interest1" type="checkbox" />
            <label hviLabel for="interest1">Sport og trening</label>
          </hvi-field>

          <hvi-field position="start">
            <input hviInput id="interest2" type="checkbox" />
            <label hviLabel for="interest2">Musikk og konserter</label>
          </hvi-field>

          <hvi-field position="start">
            <input hviInput id="interest3" type="checkbox" checked />
            <label hviLabel for="interest3">Teknologi og programmering</label>
          </hvi-field>

          <hvi-field position="start">
            <input hviInput id="interest4" type="checkbox" disabled />
            <label hviLabel for="interest4">Deaktivert alternativ</label>
          </hvi-field>
        </fieldset>
      </app-demo-section>

      <!-- Radio Buttons -->
      <app-demo-section title="Radioknapper">
        <p hviParagraph class="mb-4">Radioknapper for valg der kun ett alternativ kan velges.</p>
        <fieldset hviFieldset>
          <legend hviLabel>Foretrukket kontaktmetode</legend>
          <p hviParagraph class="text-sm">Velg hvordan du vil bli kontaktet.</p>

          <hvi-field position="start">
            <input hviInput id="contact1" type="radio" name="contact" value="email" checked />
            <label hviLabel for="contact1">E-post</label>
          </hvi-field>

          <hvi-field position="start">
            <input hviInput id="contact2" type="radio" name="contact" value="phone" />
            <label hviLabel for="contact2">Telefon</label>
          </hvi-field>

          <hvi-field position="start">
            <input hviInput id="contact3" type="radio" name="contact" value="sms" />
            <label hviLabel for="contact3">SMS</label>
          </hvi-field>

          <hvi-field position="start">
            <input hviInput id="contact4" type="radio" name="contact" value="none" disabled />
            <label hviLabel for="contact4">Ingen kontakt (deaktivert)</label>
          </hvi-field>
        </fieldset>
      </app-demo-section>

      <!-- Switch -->
      <app-demo-section title="Switch">
        <p hviParagraph class="mb-4">Bruk role="switch" for toggle-lignende avmerkingsbokser.</p>
        <div class="flex flex-col gap-4">
          <hvi-field position="start">
            <input hviInput id="notifications" type="checkbox" role="switch" />
            <label hviLabel for="notifications" weight="medium">Aktiver varslinger</label>
          </hvi-field>

          <hvi-field position="start">
            <input hviInput id="darkMode" type="checkbox" role="switch" checked />
            <label hviLabel for="darkMode" weight="medium">Mørk modus</label>
          </hvi-field>

          <hvi-field position="start">
            <input hviInput id="autoSave" type="checkbox" role="switch" disabled />
            <label hviLabel for="autoSave" weight="medium">Automatisk lagring (deaktivert)</label>
          </hvi-field>
        </div>
      </app-demo-section>

      <!-- Select -->
      <app-demo-section title="Nedtrekksliste med validering">
        <p hviParagraph class="mb-4">Select-felt kan også inngå i skjemaer med validering.</p>
        <form hviForm [formGroup]="selectForm">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <hvi-field>
              <label hviLabel for="country" weight="medium">Land</label>
              <select hviSelect id="country" formControlName="country" hviControlInvalid>
                <option value="" disabled selected>Velg land</option>
                <option value="no">Norge</option>
                <option value="se">Sverige</option>
                <option value="dk">Danmark</option>
                <option value="fi">Finland</option>
              </select>
              <p
                hviFieldValidation
                hviValidationMessage="country"
                [messages]="selectMessages['country']"
              ></p>
            </hvi-field>

            <hvi-field>
              <label hviLabel for="language" weight="medium">Språk</label>
              <select hviSelect id="language" formControlName="language" hviControlInvalid>
                <option value="" disabled selected>Velg språk</option>
                <option value="nb">Norsk bokmål</option>
                <option value="nn">Norsk nynorsk</option>
                <option value="en">English</option>
              </select>
              <p
                hviFieldValidation
                hviValidationMessage="language"
                [messages]="selectMessages['language']"
              ></p>
            </hvi-field>
          </div>
        </form>
      </app-demo-section>

      <!-- Validation States -->
      <app-demo-section title="Valideringstilstander">
        <p hviParagraph class="mb-4">Felt kan vise valideringsfeil og hjelpetekster.</p>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <hvi-field>
            <label hviLabel for="validField" weight="medium">Gyldig felt</label>
            <span hviFieldDescription>Dette feltet er korrekt utfylt</span>
            <input hviInput id="validField" type="text" value="Korrekt verdi" />
          </hvi-field>

          <hvi-field>
            <label hviLabel for="invalidField" weight="medium">Ugyldig felt</label>
            <span hviFieldDescription>Dette feltet har en feil</span>
            <input hviInput id="invalidField" type="text" value="Feil verdi" aria-invalid="true" />
            <span hviFieldValidation>Dette feltet inneholder en feil</span>
          </hvi-field>
        </div>
      </app-demo-section>

      <!-- Date and Time Inputs -->
      <app-demo-section title="Dato og tid">
        <p hviParagraph class="mb-4">Native HTML5 dato- og tidsfelt.</p>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <hvi-field>
            <label hviLabel for="dateField" weight="medium">Dato</label>
            <input hviInput id="dateField" type="date" />
          </hvi-field>

          <hvi-field>
            <label hviLabel for="timeField" weight="medium">Tid</label>
            <input hviInput id="timeField" type="time" />
          </hvi-field>

          <hvi-field>
            <label hviLabel for="datetimeField" weight="medium">Dato og tid</label>
            <input hviInput id="datetimeField" type="datetime-local" />
          </hvi-field>

          <hvi-field>
            <label hviLabel for="monthField" weight="medium">Måned</label>
            <input hviInput id="monthField" type="month" />
          </hvi-field>

          <hvi-field>
            <label hviLabel for="weekField" weight="medium">Uke</label>
            <input hviInput id="weekField" type="week" />
          </hvi-field>
        </div>
      </app-demo-section>

      <!-- Other Input Types -->
      <app-demo-section title="Andre input-typer">
        <p hviParagraph class="mb-4">Flere HTML5 input-typer som støttes.</p>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <hvi-field>
            <label hviLabel for="searchField" weight="medium">Søk</label>
            <input hviInput id="searchField" type="search" placeholder="Søk etter noe..." />
          </hvi-field>

          <hvi-field>
            <label hviLabel for="urlField" weight="medium">URL</label>
            <input hviInput id="urlField" type="url" placeholder="https://eksempel.no" />
          </hvi-field>

          <hvi-field>
            <label hviLabel for="telField" weight="medium">Telefon</label>
            <input hviInput id="telField" type="tel" placeholder="+47 000 00 000" />
          </hvi-field>

          <hvi-field>
            <label hviLabel for="colorField" weight="medium">Farge</label>
            <input hviInput id="colorField" type="color" value="#3b82f6" />
          </hvi-field>

          <hvi-field>
            <label hviLabel for="fileField" weight="medium">Fil</label>
            <input hviInput id="fileField" type="file" />
          </hvi-field>
        </div>
      </app-demo-section>

      <!-- Complete Form with Validation -->
      <app-demo-section title="Komplett skjema med validering">
        <p hviParagraph class="mb-4">
          Et fullstendig skjema med reaktiv validering, feilmeldinger og error summary.
        </p>
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

      <!-- Error Summary Manual Mode -->
      <app-demo-section title="Error Summary (manuell modus)">
        <p hviParagraph class="mb-4">
          Error summary kan også brukes manuelt uten reaktive skjemaer.
        </p>
        <hvi-error-summary
          [errors]="[
            { message: 'Fornavn må være minst 2 tegn', href: '#firstName' },
            { message: 'Telefonnummer kan kun inneholde siffer', href: '#phone' },
            { message: 'Du må samtykke før du kan sende inn', href: '#consent' },
          ]"
        />
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

  selectForm = new FormGroup({
    country: new FormControl('', [Validators.required]),
    language: new FormControl('', [Validators.required]),
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

  selectMessages: Record<string, HviValidationMessages> = {
    country: {
      required: 'Du må velge et land',
    },
    language: {
      required: 'Du må velge et språk',
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
