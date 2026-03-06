import { Component } from '@angular/core';
import { HviField, HviInput, HviLabel } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { InputDisabledExampleSource } from './code-examples/input.disabled.example.source';
import { InputGrunnleggendeExampleSource } from './code-examples/input.grunnleggende.example.source';
import { InputMedFeilExampleSource } from './code-examples/input.med-feil.example.source';
import { InputMedLabelExampleSource } from './code-examples/input.med-label.example.source';
import { InputReadonlyExampleSource } from './code-examples/input.readonly.example.source';
import { InputUlikeTyperExampleSource } from './code-examples/input.ulike-typer.example.source';
@Component({
  selector: 'app-input-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent, HviInput, HviField, HviLabel],
  template: `
    <app-demo-page componentId="input">
      <!-- Grunnleggende -->
      <app-demo-section
        title="Grunnleggende"
        [code]="grunnleggendeCode"
        description="Et enkelt input-felt uten label. Bruk aria-label for tilgjengelighet."
      >
        <input hviInput type="text" aria-label="input" />
      </app-demo-section>

      <!-- Med label -->
      <app-demo-section
        title="Med label"
        [code]="medLabelCode"
        description="Input brukt sammen med hvi-field og label for å koble dem sammen."
      >
        <hvi-field>
          <label hviLabel for="fnr" weight="medium">Fødselsnummer</label>
          <input hviInput type="text" id="fnr" />
        </hvi-field>
      </app-demo-section>

      <!-- Med feil -->
      <app-demo-section
        title="Med feil"
        [code]="medFeilCode"
        description="Bruk aria-invalid for å indikere at feltet har en feil."
      >
        <hvi-field>
          <label hviLabel for="fnr-error" weight="medium">Fødselsnummer</label>
          <input hviInput type="text" id="fnr-error" aria-invalid="true" />
        </hvi-field>
      </app-demo-section>

      <!-- Disabled -->
      <app-demo-section
        title="Disabled"
        [code]="disabledCode"
        description="Unngå bruk av disabled der det er mulig. Vurder heller å bruke readOnly."
      >
        <hvi-field>
          <label hviLabel for="fnr-disabled" weight="medium">Fødselsnummer</label>
          <input hviInput type="text" id="fnr-disabled" value="12345678901" disabled />
        </hvi-field>
      </app-demo-section>

      <!-- ReadOnly -->
      <app-demo-section
        title="ReadOnly"
        [code]="readonlyCode"
        description="Skrivebeskyttet felt som fortsatt er i tabrekkefølgen og sendes med skjemaet."
      >
        <hvi-field>
          <label hviLabel for="fnr-readonly" weight="medium">Fødselsnummer</label>
          <input hviInput type="text" id="fnr-readonly" value="12345678901" readOnly />
        </hvi-field>
      </app-demo-section>

      <!-- Ulike typer -->
      <app-demo-section
        title="Ulike typer"
        [code]="ulikeTyperCode"
        description="Input støtter mange HTML5 input-typer som text, email, password, number, date, osv."
      >
        <div class="grid gap-4">
          <hvi-field>
            <label hviLabel for="email-input" weight="medium">E-post</label>
            <input hviInput type="email" id="email-input" placeholder="navn@eksempel.no" />
          </hvi-field>

          <hvi-field>
            <label hviLabel for="password-input" weight="medium">Passord</label>
            <input hviInput type="password" id="password-input" placeholder="••••••••" />
          </hvi-field>

          <hvi-field>
            <label hviLabel for="number-input" weight="medium">Tall</label>
            <input hviInput type="number" id="number-input" placeholder="0" />
          </hvi-field>

          <hvi-field>
            <label hviLabel for="date-input" weight="medium">Dato</label>
            <input hviInput type="date" id="date-input" />
          </hvi-field>

          <hvi-field>
            <label hviLabel for="tel-input" weight="medium">Telefon</label>
            <input hviInput type="tel" id="tel-input" placeholder="+47 123 45 678" />
          </hvi-field>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class InputDemoComponent {
  readonly grunnleggendeCode = InputGrunnleggendeExampleSource;
  readonly medLabelCode = InputMedLabelExampleSource;
  readonly medFeilCode = InputMedFeilExampleSource;
  readonly disabledCode = InputDisabledExampleSource;
  readonly readonlyCode = InputReadonlyExampleSource;
  readonly ulikeTyperCode = InputUlikeTyperExampleSource;
}
