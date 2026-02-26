import { Component } from '@angular/core';
import { HviField, HviFieldCounter, HviInput, HviLabel } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-textarea-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent, HviInput, HviField, HviLabel, HviFieldCounter],
  template: `
    <app-demo-page
      title="Textarea"
      description="Textarea gir brukere muligheten til å skrive lengre fritekst over flere linjer."
    >
      <!-- Grunnleggende -->
      <app-demo-section title="Grunnleggende" description="En enkel textarea med label.">
        <hvi-field>
          <label hviLabel for="basic-textarea" weight="medium">Beskrivelse</label>
          <textarea hviInput id="basic-textarea" rows="4"></textarea>
        </hvi-field>
      </app-demo-section>

      <!-- Med hjelpetekst -->
      <app-demo-section
        title="Med hjelpetekst"
        description="Textarea med beskrivelse som gir brukeren kontekst."
      >
        <hvi-field>
          <label hviLabel for="description-textarea" weight="medium">Tilbakemelding</label>
          <span data-field="description">Fortell oss hva du synes om tjenesten</span>
          <textarea hviInput id="description-textarea" rows="4"></textarea>
        </hvi-field>
      </app-demo-section>

      <!-- Med tegnteller -->
      <app-demo-section
        title="Med tegnteller"
        description="Textarea med tegnteller som viser hvor mange tegn som gjenstår."
      >
        <hvi-field>
          <label hviLabel for="counter-textarea" weight="medium">Kort beskrivelse</label>
          <span data-field="description">Maks 200 tegn</span>
          <textarea hviInput id="counter-textarea" rows="4" maxlength="200"></textarea>
          <hvi-field-counter [limit]="200" />
        </hvi-field>
      </app-demo-section>

      <!-- Disabled -->
      <app-demo-section title="Disabled" description="Deaktivert textarea som ikke kan redigeres.">
        <hvi-field>
          <label hviLabel for="disabled-textarea" weight="medium">Kommentar</label>
          <textarea hviInput id="disabled-textarea" rows="3" disabled>
Dette feltet er deaktivert</textarea
          >
        </hvi-field>
      </app-demo-section>

      <!-- Readonly -->
      <app-demo-section
        title="Readonly"
        description="Skrivebeskyttet textarea som fortsatt er i tabrekkefølgen."
      >
        <hvi-field>
          <label hviLabel for="readonly-textarea" weight="medium">Vilkår</label>
          <textarea hviInput id="readonly-textarea" rows="3" readOnly>
Dette er skrivebeskyttet innhold som brukeren kan lese men ikke endre.</textarea
          >
        </hvi-field>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class TextareaDemoComponent {}
