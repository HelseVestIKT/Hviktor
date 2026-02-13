import { Component } from '@angular/core';
import {
  HviField,
  HviFieldAffix,
  HviFieldAffixes,
  HviFieldDescription,
  HviFieldValidation,
  HviInput,
  HviLabel,
} from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-field-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    HviField,
    HviFieldAffix,
    HviFieldAffixes,
    HviFieldDescription,
    HviFieldValidation,
    HviInput,
    HviLabel,
  ],
  template: `
    <app-demo-page
      title="Field"
      description="Field er et hjelpemiddel for å automatisk koble et felt sammen med Label, Field.Description, ValidationMessage og Field.Counter."
    >
      <!-- Grunnleggende eksempel -->
      <app-demo-section
        title="Grunnleggende"
        description="Field kobler automatisk sammen label, description og validation med feltet via riktige ARIA-attributter."
      >
        <hvi-field>
          <label hviLabel for="etternavn" weight="medium">Etternavn</label>
          <span hviFieldDescription>Etternavn kan ikke inneholde mellomrom</span>
          <input hviInput id="etternavn" type="text" value="Nordmann Svenske" aria-invalid="true" />
          <span hviFieldValidation>Du kan ikke ha mellomrom i etternavnet ditt</span>
        </hvi-field>
      </app-demo-section>

      <!-- Prefix/Suffix -->
      <app-demo-section
        title="Prefix/Suffix"
        description="Prefixer og suffixer er nyttige for å vise enheter, valuta eller andre typer informasjon som er relevant for feltet. Du skal ikke bruke disse alene, siden skjermlesere ikke leser dem opp."
      >
        <hvi-field>
          <label hviLabel for="pris" weight="medium">Hvor mange kroner koster det per måned?</label>
          <hvi-field-affixes>
            <hvi-field-affix>NOK</hvi-field-affix>
            <input hviInput id="pris" type="text" />
            <hvi-field-affix>pr. mnd.</hvi-field-affix>
          </hvi-field-affixes>
        </hvi-field>
      </app-demo-section>

      <!-- Plassering med Switch -->
      <app-demo-section
        title="Plassering"
        description="Når du bruker Field sammen med valgkomponenter som Switch, kan du plassere etiketten enten før eller etter kontrollen med position-attributtet."
      >
        <div class="flex flex-col gap-4">
          <hvi-field position="end">
            <label hviLabel for="flymodus" weight="medium">Flymodus</label>
            <input hviInput id="flymodus" type="checkbox" role="switch" />
          </hvi-field>

          <hvi-field position="start">
            <input hviInput id="bluetooth" type="checkbox" role="switch" checked />
            <label hviLabel for="bluetooth" weight="medium">Bluetooth</label>
          </hvi-field>
        </div>
      </app-demo-section>

      <!-- Checkbox og Radio plassering -->
      <app-demo-section
        title="Checkbox og Radio"
        description="Position-attributtet kan også brukes med checkbox og radio for å plassere label før eller etter kontrollen."
      >
        <div class="flex flex-col gap-4">
          <hvi-field>
            <input hviInput id="aksept" type="checkbox" />
            <label hviLabel for="aksept">Jeg godtar vilkårene</label>
          </hvi-field>

          <hvi-field>
            <input hviInput id="nyhetsbrev" type="checkbox" checked />
            <label hviLabel for="nyhetsbrev">Meld meg på nyhetsbrev</label>
          </hvi-field>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class FieldDemoComponent {}
