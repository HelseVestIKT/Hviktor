import { Component } from '@angular/core';
import { HviBadge, HviBadgePosition } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-badge-demo',
  standalone: true,
  imports: [HviBadge, HviBadgePosition, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page
      title="Badge"
      description="Små indikatorer og tellere for å vise status eller antall."
    >
      <app-demo-section title="Base variant">
        <div class="flex flex-wrap items-center gap-4">
          <hvi-badge color="neutral" count="9+" variant="base"></hvi-badge>
          <hvi-badge color="danger" count="9+" variant="base"></hvi-badge>
          <hvi-badge color="info" count="9+" variant="base"></hvi-badge>
          <hvi-badge color="warning" count="9+" variant="base"></hvi-badge>
          <hvi-badge color="brand1" count="9+" variant="base"></hvi-badge>
          <hvi-badge color="brand2" count="9+" variant="base"></hvi-badge>
          <hvi-badge color="brand3" count="9+" variant="base"></hvi-badge>
          <hvi-badge color="accent" count="9+" variant="base"></hvi-badge>
        </div>
      </app-demo-section>

      <app-demo-section title="Tinted variant">
        <div class="flex flex-wrap items-center gap-4">
          <hvi-badge color="neutral" count="9+" variant="tinted"></hvi-badge>
          <hvi-badge color="danger" count="9+" variant="tinted"></hvi-badge>
          <hvi-badge color="info" count="9+" variant="tinted"></hvi-badge>
          <hvi-badge color="warning" count="9+" variant="tinted"></hvi-badge>
          <hvi-badge color="brand1" count="9+" variant="tinted"></hvi-badge>
          <hvi-badge color="brand2" count="9+" variant="tinted"></hvi-badge>
          <hvi-badge color="brand3" count="9+" variant="tinted"></hvi-badge>
          <hvi-badge color="accent" count="9+" variant="tinted"></hvi-badge>
        </div>
      </app-demo-section>

      <app-demo-section title="Status indikator">
        <div class="flex flex-wrap items-center gap-4">
          <hvi-badge color="success" variant="base"></hvi-badge>
          <p>Aktiv</p>
        </div>
      </app-demo-section>

      <app-demo-section title="Med posisjonering">
        <div class="flex flex-wrap items-center gap-4">
          <hvi-badge-position placement="top-left">
            <hvi-badge color="danger" count="3"></hvi-badge>
            <div class="rounded bg-(--ds-color-background-tinted) p-4">Element</div>
          </hvi-badge-position>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class BadgeDemoComponent {}
