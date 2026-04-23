import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  HviField,
  HviLabel,
  HviLink,
  HviMultiSelect,
  HviMultiSelectOption,
} from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-multi-select-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    HviMultiSelect,
    HviField,
    HviLabel,
    RouterLink,
    HviLink,
  ],
  template: `
    <app-demo-page componentId="multi-select">
      <div class="ds-alert ds-alert--info mb-6" data-color="info">
        <p class="ds-paragraph">
          <strong>MultiSelect</strong> er laget for bruk som kolonnefilter i tabeller. Se
          <a hviLink routerLink="/komponenter/table" fragment="kolonnefiltrering">
            kolonnefiltrering i tabell-demoen
          </a>
          for eksempler.
        </p>
        <p class="ds-paragraph mt-2">
          For generelle flervalgsscenarioer (f.eks. skjemaer), bruk
          <a hviLink routerLink="/komponenter/suggestion">Suggestion</a>
          i stedet.
        </p>
      </div>

      <app-demo-section title="Standard">
        <div class="flex max-w-sm flex-col gap-4">
          <hvi-field>
            <label hviLabel>Velg kommuner</label>
            <hvi-multi-select [options]="kommuner" placeholder="Velg kommuner..." />
          </hvi-field>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class MultiSelectDemoComponent {
  readonly kommuner: HviMultiSelectOption[] = [
    { label: 'Oslo', value: 'oslo' },
    { label: 'Bergen', value: 'bergen' },
    { label: 'Trondheim', value: 'trondheim' },
    { label: 'Stavanger', value: 'stavanger' },
    { label: 'Tromsø', value: 'tromso' },
    { label: 'Kristiansand', value: 'kristiansand' },
    { label: 'Drammen', value: 'drammen' },
    { label: 'Fredrikstad', value: 'fredrikstad' },
    { label: 'Sandnes', value: 'sandnes' },
    { label: 'Bodø', value: 'bodo' },
  ];
}
