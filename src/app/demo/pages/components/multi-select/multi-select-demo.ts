import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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
    ReactiveFormsModule,
    JsonPipe,
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

      <app-demo-section title="Forhåndsvalgte verdier">
        <div class="flex max-w-sm flex-col gap-4">
          <hvi-field>
            <label hviLabel>Velg fjell</label>
            <hvi-multi-select
              [options]="fjell"
              [formControl]="fjellControl"
              placeholder="Velg fjell..."
            />
          </hvi-field>
          <p class="text-sm text-gray-600">Valgt: {{ fjellControl.value | json }}</p>
        </div>
      </app-demo-section>

      <app-demo-section title="Størrelser">
        <div class="flex max-w-sm flex-col gap-6">
          <hvi-field>
            <label hviLabel>Liten (sm)</label>
            <hvi-multi-select [options]="kommuner" size="sm" placeholder="Velg..." />
          </hvi-field>
          <hvi-field>
            <label hviLabel>Medium (md)</label>
            <hvi-multi-select [options]="kommuner" size="md" placeholder="Velg..." />
          </hvi-field>
          <hvi-field>
            <label hviLabel>Stor (lg)</label>
            <hvi-multi-select [options]="kommuner" size="lg" placeholder="Velg..." />
          </hvi-field>
        </div>
      </app-demo-section>

      <app-demo-section title="Disabled">
        <div class="flex max-w-sm flex-col gap-4">
          <hvi-field>
            <label hviLabel>Deaktivert</label>
            <hvi-multi-select
              [options]="kommuner"
              [disabled]="true"
              placeholder="Velg kommuner..."
            />
          </hvi-field>
        </div>
      </app-demo-section>

      <app-demo-section title="Mange valg">
        <div class="flex max-w-sm flex-col gap-4">
          <hvi-field>
            <label hviLabel>Velg kolonner</label>
            <hvi-multi-select
              [options]="kolonner"
              [formControl]="kolonnerControl"
              placeholder="Velg kolonner..."
            />
          </hvi-field>
          <p class="text-sm text-gray-600">Valgt: {{ kolonnerControl.value | json }}</p>
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

  readonly fjell: HviMultiSelectOption[] = [
    { label: 'Mount Everest', value: 'everest' },
    { label: 'Aconcagua', value: 'aconcagua' },
    { label: 'Denali', value: 'denali' },
    { label: 'Kilimanjaro', value: 'kilimanjaro' },
    { label: 'Elbrus', value: 'elbrus' },
    { label: 'Mount Vinson', value: 'vinson' },
    { label: 'Puncak Jaya', value: 'puncakjaya' },
    { label: 'Galdhøpiggen', value: 'galdhopiggen' },
  ];

  readonly kolonner: HviMultiSelectOption[] = [
    { label: 'Navn', value: 'name' },
    { label: 'E-post', value: 'email' },
    { label: 'Telefon', value: 'phone' },
    { label: 'Adresse', value: 'address' },
    { label: 'Postnummer', value: 'zip' },
    { label: 'Sted', value: 'city' },
    { label: 'Fylke', value: 'county' },
    { label: 'Status', value: 'status' },
  ];

  readonly fjellControl = new FormControl<string[]>(['everest', 'kilimanjaro']);
  readonly kolonnerControl = new FormControl<string[]>([
    'name',
    'email',
    'phone',
    'address',
    'zip',
  ]);
}
