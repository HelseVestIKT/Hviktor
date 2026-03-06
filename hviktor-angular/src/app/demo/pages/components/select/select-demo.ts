import { Component } from '@angular/core';
import { HviFieldKit, HviForms, HviLabel, HviSelect } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { SelectEksempelExampleSource } from './code-examples/select.eksempel.example.source';
@Component({
  selector: 'app-select-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent, HviSelect, HviForms, HviFieldKit, HviLabel],
  template: `
    <app-demo-page componentId="select">
      <app-demo-section title="Eksempel" [code]="eksempelCode">
        <div class="flex flex-col gap-2">
          <form hviForm>
            <fieldset hviFieldset class="flex flex-col gap-2">
              <legend hviLabel>Ulike select</legend>

              <hvi-field>
                <label hviLabel for="plainSelect" weight="medium">Vanlig select</label>
                <select hviSelect id="plainSelect">
                  <option value="" disabled="" selected="">Velg et alternativ</option>
                  <option value="option1">Alternativ 1</option>
                  <option value="option2">Alternativ 2</option>
                  <option value="option3">Alternativ 3</option>
                </select>
              </hvi-field>

              <hvi-field>
                <label hviLabel for="width" weight="medium">Width auto justerer bredden</label>
                <select hviSelect id="width" width="auto">
                  <option value="" disabled="" selected="">Velg et alternativ</option>
                  <option value="option1">Alternativ 1</option>
                  <option value="option2">Alternativ 2</option>
                  <option value="option3">Alternativ 3</option>
                </select>
              </hvi-field>

              <hvi-field>
                <label hviLabel for="readonlySelect" weight="medium">Readonly</label>
                <select hviSelect id="readonlySelect" width="auto" readOnly="">
                  <option value="" disabled="" selected="">Velg et alternativ</option>
                  <option value="option1">Alternativ 1</option>
                  <option value="option2">Alternativ 2</option>
                  <option value="option3">Alternativ 3</option>
                </select>
              </hvi-field>

              <hvi-field>
                <label hviLabel for="disabledSelect" weight="medium">Disabled</label>
                <select hviSelect id="disabledSelect" width="auto" disabled="">
                  <option value="" disabled="" selected="">Velg et alternativ</option>
                  <option value="option1">Alternativ 1</option>
                  <option value="option2">Alternativ 2</option>
                  <option value="option3">Alternativ 3</option>
                </select>
              </hvi-field>

              <hvi-field>
                <label hviLabel for="groups" weight="medium">Gruppering</label>
                <select hviSelect id="groups" width="auto">
                  <optgroup label="Gruppe 1">
                    <option value="option1">Alternativ 1</option>
                    <option value="option2">Alternativ 2</option>
                    <option value="option3">Alternativ 3</option>
                  </optgroup>
                  <optgroup label="Gruppe 2">
                    <option value="option4">Alternativ 4</option>
                    <option value="option5">Alternativ 5</option>
                    <option value="option6">Alternativ 6</option>
                  </optgroup>
                </select>
              </hvi-field>
            </fieldset>
          </form>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class SelectDemoComponent {
  readonly eksempelCode = SelectEksempelExampleSource;
}
