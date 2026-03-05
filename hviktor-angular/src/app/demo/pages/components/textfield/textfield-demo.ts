import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HviField, HviLabel, HviSelect, HviTextfield } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-textfield-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    HviTextfield,
    HviField,
    HviLabel,
    FormsModule,
    HviSelect,
  ],
  template: `
    <app-demo-page
      title="Textfield"
      description="Textfield gir brukere muligheten til å skrive fritekst eller tall. Dette er en sammensatt komponent som bruker Field, Input/Textarea og Label under panseret."
    >
      <!-- Grunnleggende -->
      <app-demo-section title="Grunnleggende" description="Et enkelt tekstfelt med label.">
        <hvi-textfield label="Label"></hvi-textfield>
      </app-demo-section>

      <!-- Multiline -->
      <app-demo-section
        title="Multiline"
        description="Du endrer til textarea ved å sette multiline til true. Da kan brukerne skrive lengre tekster."
      >
        <hvi-textfield label="Label" [multiline]="true" [rows]="4"></hvi-textfield>
      </app-demo-section>

      <!-- Med prefiks og suffiks -->
      <app-demo-section
        title="Med prefiks og suffiks"
        description="Prefixer og suffixer er nyttige for å vise enheter, valuta eller annen informasjon som er relevant for feltet. Disse skal ikke brukes uten label, da skjermlesere ikke leser dem opp."
      >
        <hvi-textfield
          label="Hvor mange kroner koster det per måned?"
          prefix="NOK"
          suffix="pr. mnd"
        ></hvi-textfield>
      </app-demo-section>

      <!-- Med teller -->
      <app-demo-section
        title="Med teller"
        description="Bruk counterLimit for å informere om antall tegn brukerne kan skrive i feltet."
      >
        <hvi-textfield
          label="Hvor mange kroner koster det per måned?"
          [counterLimit]="10"
        ></hvi-textfield>
      </app-demo-section>

      <!-- Påkrevde og valgfrie felt -->
      <app-demo-section
        title="Påkrevde og valgfrie felt"
        description="Det er lovpålagt å markere påkrevde felt. Bruk requiredLabel for å vise en Tag med teksten 'Må fylles ut' ved siden av label."
      >
        <hvi-textfield label="Hvor bor du?" requiredLabel="Må fylles ut" required></hvi-textfield>
      </app-demo-section>

      <!-- Type -->
      <app-demo-section
        title="Type"
        description="Siden Textfield er basert på native input, kan du bruke de fleste type-verdiene input støtter. Velg en type i nedtrekksmenyen for å se resultatet."
      >
        <div class="flex gap-2">
          <hvi-field>
            <label hviLabel for="type-select" weight="medium">Velg type</label>
            <select hviSelect id="type-select" [(ngModel)]="selectedType">
              @for (type of types; track type) {
                <option [value]="type" [selected]="type === selectedType">{{ type }}</option>
              }
            </select>
          </hvi-field>

          <hvi-textfield
            [label]="'type=&quot;' + selectedType + '&quot;'"
            [type]="selectedType"
          ></hvi-textfield>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class TextfieldDemoComponent {
  types = [
    'text',
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'month',
    'hidden',
    'number',
    'password',
    'search',
    'tel',
    'time',
    'url',
    'week',
  ];
  selectedType: any = 'text';
}
