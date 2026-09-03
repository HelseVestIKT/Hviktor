import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  HviCard,
  HviCardBlock,
  HviHeading,
  HviLink,
  HviParagraph,
} from '@helsevestikt/hviktor-angular';
import { DEMO_COMPONENTS } from '../../demo-components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HviCard, HviCardBlock, HviHeading, HviParagraph, HviLink],
  template: `
    <header class="mb-8 max-w-xl">
      <h1 hviHeading size="xl">Hviktor Angular Demo</h1>
      <button>Klikk meg</button>
      <p hviParagraph>
        Demo av komponenter fra
        <a
          hviLink
          href="https://www.npmjs.com/package/@helsevestikt/hviktor-angular?activeTab=readme"
          target="_blank"
          rel="noopener noreferrer"
          >@helsevestikt/hviktor-angular</a
        >
      </p>
      <p hviParagraph>
        Alle komponenter er bygget på
        <a
          hviLink
          href="https://designsystemet.no/no/components"
          target="_blank"
          rel="noopener noreferrer"
          >designsystemet.no</a
        >
      </p>
      <p hviParagraph>
        Koden til denne siden og til hviktor-angular er tilgjengelig på
        <a
          hviLink
          href="https://github.com/HelseVestIKT/hviktor"
          target="_blank"
          rel="noopener noreferrer"
          >GitHub</a
        >
      </p>
    </header>

    <section class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
      @for (component of components; track component.id) {
        <a [routerLink]="['/komponenter', component.id]" class="text-inherit no-underline">
          <hvi-card class="hover-outline-2 h-full hover:outline">
            <div hviCardBlock>
              <h2 hviHeading size="sm">{{ component.name }}</h2>
            </div>
          </hvi-card>
        </a>
      }
    </section>
  `,
})
export class HomeComponent {
  components = DEMO_COMPONENTS;
}
