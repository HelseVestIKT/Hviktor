import { Component } from '@angular/core';
import { HviHeading } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { HeadingStorrelserExampleSource } from './code-examples/heading.storrelser.example.source';
@Component({
  selector: 'app-heading-demo',
  standalone: true,
  imports: [HviHeading, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page componentId="heading">
      <app-demo-section title="Størrelser" [code]="storrelserCode">
        <div class="flex flex-col gap-4">
          <h1 hviHeading size="2xl">2XL Overskrift</h1>
          <h1 hviHeading size="xl">XL Overskrift</h1>
          <h2 hviHeading size="lg">LG Overskrift</h2>
          <h3 hviHeading size="md">MD Overskrift</h3>
          <h4 hviHeading size="sm">SM Overskrift</h4>
          <h5 hviHeading size="xs">XS Overskrift</h5>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class HeadingDemoComponent {
  readonly storrelserCode = HeadingStorrelserExampleSource;
}
