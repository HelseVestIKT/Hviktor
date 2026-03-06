import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  HviControlInvalid,
  HviField,
  HviFieldDescription,
  HviFieldset,
  HviFieldValidation,
  HviInput,
  HviLabel,
  HviParagraph,
} from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { RadioEnkelRadioExampleSource } from './code-examples/radio.enkel-radio.example.source';
import { RadioGrupperingExampleSource } from './code-examples/radio.gruppering.example.source';
import { RadioHorisontalPlasseringExampleSource } from './code-examples/radio.horisontal-plassering.example.source';
import { RadioMedFeilExampleSource } from './code-examples/radio.med-feil.example.source';
@Component({
  selector: 'app-radio-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    HviField,
    HviFieldDescription,
    HviFieldset,
    HviFieldValidation,
    HviInput,
    HviLabel,
    HviParagraph,
    HviControlInvalid,
    ReactiveFormsModule,
  ],
  template: `
    <app-demo-page componentId="radio">
      <!-- Enkel radio -->
      <app-demo-section
        title="Enkel radio"
        [code]="enkelRadioCode"
        description="En enkel radio med label."
      >
        <hvi-field>
          <input hviInput type="radio" id="single-radio" name="single" value="value" />
          <label hviLabel for="single-radio">Radio</label>
        </hvi-field>
      </app-demo-section>

      <!-- Gruppering -->
      <app-demo-section
        title="Gruppering"
        [code]="grupperingCode"
        description="Bruk ledetekst til å stille spørsmålet og legg eventuelt ved beskrivelse der det er nødvendig."
      >
        <fieldset hviFieldset>
          <legend hviLabel weight="medium">Hvordan ønsker du at vi kontakter deg?</legend>
          <p hviParagraph>
            Velg metoden som passer best for deg. Vi bruker dette kun til å sende viktig informasjon
            om saken din.
          </p>
          <hvi-field>
            <input hviInput type="radio" id="kontakt-epost" name="kontakt" value="epost" />
            <label hviLabel for="kontakt-epost">E-post</label>
            <span hviFieldDescription
              >Vi bruker e-postadressen du har oppgitt tidligere (navn&#64;epost.no)</span
            >
          </hvi-field>
          <hvi-field>
            <input hviInput type="radio" id="kontakt-sms" name="kontakt" value="sms" />
            <label hviLabel for="kontakt-sms">SMS</label>
            <span hviFieldDescription
              >Vi bruker telefonnummeret du har oppgitt tidligere (99 99 99 99)</span
            >
          </hvi-field>
          <hvi-field>
            <input hviInput type="radio" id="kontakt-brev" name="kontakt" value="brev" />
            <label hviLabel for="kontakt-brev">Brev</label>
            <span hviFieldDescription
              >Levering kan ta 3-5 virkedager, avhengig av posttjenesten.</span
            >
          </hvi-field>
        </fieldset>
      </app-demo-section>

      <!-- Med feil -->
      <app-demo-section
        title="Med feil"
        [code]="medFeilCode"
        description="Hvis brukeren prøver å gå videre uten å svare på et obligatorisk spørsmål, skal feilmeldingen gjelde for hele gruppen med alternativer."
      >
        <fieldset hviFieldset>
          <legend hviLabel weight="medium">Hvilken bydel bor du i?</legend>
          <p hviParagraph>Trondheim er delt inn i fire bydeler</p>
          <hvi-field>
            <input
              hviInput
              hviControlInvalid
              type="radio"
              id="bydel-ostbyen"
              value="ostbyen"
              [formControl]="bydelControl"
            />
            <label hviLabel for="bydel-ostbyen">Østbyen</label>
          </hvi-field>
          <hvi-field>
            <input
              hviInput
              hviControlInvalid
              type="radio"
              id="bydel-lerkendal"
              value="lerkendal"
              [formControl]="bydelControl"
            />
            <label hviLabel for="bydel-lerkendal">Lerkendal</label>
          </hvi-field>
          <hvi-field>
            <input
              hviInput
              hviControlInvalid
              type="radio"
              id="bydel-heimdal"
              value="heimdal"
              [formControl]="bydelControl"
            />
            <label hviLabel for="bydel-heimdal">Heimdal</label>
          </hvi-field>
          <hvi-field>
            <input
              hviInput
              hviControlInvalid
              type="radio"
              id="bydel-midtbyen"
              value="midtbyen"
              [formControl]="bydelControl"
            />
            <label hviLabel for="bydel-midtbyen">Midtbyen</label>
          </hvi-field>
          @if (bydelControl.invalid) {
            <span hviFieldValidation>Du må velge en bydel før du kan fortsette.</span>
          }
        </fieldset>
      </app-demo-section>

      <!-- Horisontal plassering -->
      <app-demo-section
        title="Horisontal plassering"
        [code]="horisontalPlasseringCode"
        description="Du kan bruke horisontal visning når det bare er to alternativer med korte tekster som 'Ja' og 'Nei'."
      >
        <fieldset hviFieldset>
          <legend hviLabel weight="medium">Kontaktes på e-post?</legend>
          <p hviParagraph>Bekreft om du ønsker å bli kontaktet per e-post.</p>
          <div class="flex gap-4">
            <hvi-field>
              <input hviInput type="radio" id="epost-ja" name="epost-kontakt" value="ja" />
              <label hviLabel for="epost-ja">Ja</label>
            </hvi-field>
            <hvi-field>
              <input hviInput type="radio" id="epost-nei" name="epost-kontakt" value="nei" />
              <label hviLabel for="epost-nei">Nei</label>
            </hvi-field>
          </div>
        </fieldset>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class RadioDemoComponent {
  readonly enkelRadioCode = RadioEnkelRadioExampleSource;
  readonly grupperingCode = RadioGrupperingExampleSource;
  readonly medFeilCode = RadioMedFeilExampleSource;
  readonly horisontalPlasseringCode = RadioHorisontalPlasseringExampleSource;

  bydelControl = new FormControl('', Validators.required);
}
