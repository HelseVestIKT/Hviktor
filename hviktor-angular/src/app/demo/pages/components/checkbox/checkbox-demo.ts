import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import {
  HviControlInvalid,
  HviField,
  HviFieldValidation,
  HviFieldset,
  HviInput,
  HviLabel,
  HviParagraph,
} from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { CheckboxBekreftingMedCheckboxExampleSource } from './code-examples/checkbox.bekrefting-med-checkbox.example.source';
import { CheckboxDisabledExampleSource } from './code-examples/checkbox.disabled.example.source';
import { CheckboxEnkelCheckboxExampleSource } from './code-examples/checkbox.enkel-checkbox.example.source';
import { CheckboxGrupperingExampleSource } from './code-examples/checkbox.gruppering.example.source';
import { CheckboxMedFeilExampleSource } from './code-examples/checkbox.med-feil.example.source';
import { CheckboxSkrivebeskyttetReadonlyExampleSource } from './code-examples/checkbox.skrivebeskyttet-readonly.example.source';

function minCheckedValidator(min: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const group = control as FormGroup;
    const checked = Object.values(group.controls).filter((c) => c.value === true).length;
    return checked >= min ? null : { minChecked: { required: min, actual: checked } };
  };
}

@Component({
  selector: 'app-checkbox-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    HviFieldset,
    HviLabel,
    HviParagraph,
    HviField,
    HviFieldValidation,
    HviInput,
    HviControlInvalid,
    ReactiveFormsModule,
  ],
  template: `
    <app-demo-page componentId="checkbox">
      <!-- Enkel checkbox -->
      <app-demo-section
        title="Enkel checkbox"
        [code]="enkelCheckboxCode"
        description="En enkel checkbox med label og beskrivelse."
      >
        <hvi-field>
          <input hviInput type="checkbox" id="simple-checkbox" />
          <label hviLabel for="simple-checkbox">Checkbox label</label>
        </hvi-field>
      </app-demo-section>

      <!-- Bekrefting med checkbox -->
      <app-demo-section
        title="Bekrefting med checkbox"
        [code]="bekreftingMedCheckboxCode"
        description="Hvis brukerne skal bekrefte noe, men ikke velge noe, kan en Checkbox stå alene. For eksempel når brukerne skal bekrefte at noe er riktig, eller samtykke til vilkår. En Checkbox for samtykke skal alltid kreve en aktiv handling, du skal aldri forhåndsvelge boksen."
      >
        <fieldset hviFieldset>
          <legend hviLabel weight="medium">Bekreft at du er over 18 år</legend>
          <p hviParagraph>
            For at vi skal kunne sende deg opplysningen du ber om, må du bekrefte at du er myndig.
          </p>
          <hvi-field>
            <input hviInput type="checkbox" id="age-confirm" value="samtykke" />
            <label hviLabel for="age-confirm">Jeg bekrefter at jeg er over 18 år</label>
          </hvi-field>
        </fieldset>
      </app-demo-section>

      <!-- Gruppering -->
      <app-demo-section
        title="Gruppering"
        [code]="grupperingCode"
        description="De aller fleste ganger brukes Checkbox i grupper, der brukerne kan velge flere alternativer. Fieldset som er rundt gruppen bør ha en tittel som forklarer hva valgene handler om."
      >
        <fieldset hviFieldset>
          <legend hviLabel weight="medium">Hvordan vil du helst at vi skal kontakte deg?</legend>
          <p hviParagraph>Velg alle alternativene som er relevante for deg.</p>
          <hvi-field>
            <input hviInput type="checkbox" id="group-epost" value="epost" name="kontakt" />
            <label hviLabel for="group-epost">E-post</label>
          </hvi-field>
          <hvi-field>
            <input hviInput type="checkbox" id="group-telefon" value="telefon" name="kontakt" />
            <label hviLabel for="group-telefon">Telefon</label>
          </hvi-field>
          <hvi-field>
            <input hviInput type="checkbox" id="group-sms" value="sms" name="kontakt" />
            <label hviLabel for="group-sms">SMS</label>
          </hvi-field>
        </fieldset>
      </app-demo-section>

      <!-- Med feil -->
      <app-demo-section
        title="Med feil"
        [code]="medFeilCode"
        description="Når Checkbox brukes i grupper, skal feilmeldingen vises på Fieldset, så den blir samlet for hele gruppen."
      >
        <fieldset hviFieldset [formGroup]="contactForm">
          <legend hviLabel weight="medium">Hvordan vil du helst at vi skal kontakte deg?</legend>
          <p hviParagraph>Velg alle alternativene som er relevante for deg.</p>
          <hvi-field>
            <input
              hviInput
              hviControlInvalid
              type="checkbox"
              id="error-epost"
              formControlName="epost"
            />
            <label hviLabel for="error-epost">E-post</label>
          </hvi-field>
          <hvi-field>
            <input
              hviInput
              hviControlInvalid
              type="checkbox"
              id="error-telefon"
              formControlName="telefon"
            />
            <label hviLabel for="error-telefon">Telefon</label>
          </hvi-field>
          <hvi-field>
            <input
              hviInput
              hviControlInvalid
              type="checkbox"
              id="error-sms"
              formControlName="sms"
            />
            <label hviLabel for="error-sms">SMS</label>
          </hvi-field>
          @if (contactForm.invalid) {
            <span hviFieldValidation>Du må velge minst to alternativ</span>
          }
        </fieldset>
      </app-demo-section>

      <!-- Skrivebeskyttet -->
      <app-demo-section
        title="Skrivebeskyttet (readonly)"
        [code]="skrivebeskyttetReadonlyCode"
        description="Checkbox støtter readonly-attributtet for å gjøre feltet skrivebeskyttet. Selv om de ikke kan redigeres, er felter med readonly-attributtet med i tabrekkefølgen, og informasjon blir med når skjemaet sendes inn."
      >
        <fieldset hviFieldset>
          <legend hviLabel weight="medium">Hvordan vil du helst at vi skal kontakte deg?</legend>
          <p hviParagraph>Velg alle alternativene som er relevante for deg.</p>
          <hvi-field>
            <input
              hviInput
              type="checkbox"
              id="readonly-epost"
              value="epost"
              name="kontakt-readonly"
              checked
              readonly
            />
            <label hviLabel for="readonly-epost">E-post</label>
          </hvi-field>
          <hvi-field>
            <input
              hviInput
              type="checkbox"
              id="readonly-telefon"
              value="telefon"
              name="kontakt-readonly"
              readonly
            />
            <label hviLabel for="readonly-telefon">Telefon</label>
          </hvi-field>
          <hvi-field>
            <input
              hviInput
              type="checkbox"
              id="readonly-sms"
              value="sms"
              name="kontakt-readonly"
              readonly
            />
            <label hviLabel for="readonly-sms">SMS</label>
          </hvi-field>
        </fieldset>
      </app-demo-section>

      <!-- Disabled -->
      <app-demo-section
        title="Disabled"
        [code]="disabledCode"
        description="Vi bør unngå at Checkbox er deaktivert (disabled) fordi det kan være vanskelig å oppfatte. Noen brukere vil ikke forstå hva valget sier eller hvorfor det ikke er klikkbart. Hvis en Checkbox eller gruppe med Checkbox ikke er relevant, bør du helst fjerne valgene fremfor å deaktivere dem."
      >
        <fieldset hviFieldset>
          <legend hviLabel weight="medium">Hvordan vil du helst at vi skal kontakte deg?</legend>
          <p hviParagraph>Velg alle alternativene som er relevante for deg.</p>
          <hvi-field>
            <input
              hviInput
              type="checkbox"
              id="disabled-epost"
              value="epost"
              name="kontakt-disabled"
              checked
              disabled
            />
            <label hviLabel for="disabled-epost">E-post</label>
          </hvi-field>
          <hvi-field>
            <input
              hviInput
              type="checkbox"
              id="disabled-telefon"
              value="telefon"
              name="kontakt-disabled"
              disabled
            />
            <label hviLabel for="disabled-telefon">Telefon</label>
          </hvi-field>
          <hvi-field>
            <input
              hviInput
              type="checkbox"
              id="disabled-sms"
              value="sms"
              name="kontakt-disabled"
              disabled
            />
            <label hviLabel for="disabled-sms">SMS</label>
          </hvi-field>
        </fieldset>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class CheckboxDemoComponent {
  readonly enkelCheckboxCode = CheckboxEnkelCheckboxExampleSource;
  readonly bekreftingMedCheckboxCode = CheckboxBekreftingMedCheckboxExampleSource;
  readonly grupperingCode = CheckboxGrupperingExampleSource;
  readonly medFeilCode = CheckboxMedFeilExampleSource;
  readonly skrivebeskyttetReadonlyCode = CheckboxSkrivebeskyttetReadonlyExampleSource;
  readonly disabledCode = CheckboxDisabledExampleSource;

  contactForm = new FormGroup(
    {
      epost: new FormControl(true),
      telefon: new FormControl(false),
      sms: new FormControl(false),
    },
    { validators: minCheckedValidator(2) },
  );
}
