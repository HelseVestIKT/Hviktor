import { Component } from '@angular/core';
import { HviTag } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { TagFargerExampleSource } from './code-examples/tag.farger.example.source';
import { TagStorrelserExampleSource } from './code-examples/tag.storrelser.example.source';
import { TagVarianterExampleSource } from './code-examples/tag.varianter.example.source';
@Component({
  selector: 'app-tag-demo',
  standalone: true,
  imports: [HviTag, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page componentId="tag">
      <app-demo-section title="Varianter" [code]="varianterCode">
        <div class="flex flex-wrap gap-2">
          <hvi-tag variant="default">Default</hvi-tag>
          <hvi-tag variant="outline">Outline</hvi-tag>
        </div>
      </app-demo-section>

      <app-demo-section title="Størrelser" [code]="storrelserCode">
        <div class="flex flex-wrap gap-2">
          <hvi-tag size="sm">Small</hvi-tag>
          <hvi-tag size="md">Medium (default)</hvi-tag>
          <hvi-tag size="lg">Large</hvi-tag>
        </div>
      </app-demo-section>

      <app-demo-section title="Farger" [code]="fargerCode">
        <div class="flex flex-wrap gap-2">
          <hvi-tag>Default</hvi-tag>
          <hvi-tag color="neutral">Neutral</hvi-tag>
          <hvi-tag color="danger">Danger</hvi-tag>
          <hvi-tag color="warning">Warning</hvi-tag>
          <hvi-tag color="info">Info</hvi-tag>
          <hvi-tag color="success">Success</hvi-tag>
          <hvi-tag color="accent">Accent</hvi-tag>
          <hvi-tag color="brand1">Brand1</hvi-tag>
          <hvi-tag color="brand2">Brand2</hvi-tag>
          <hvi-tag color="brand3">Brand3</hvi-tag>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class TagDemoComponent {
  readonly varianterCode = TagVarianterExampleSource;
  readonly storrelserCode = TagStorrelserExampleSource;
  readonly fargerCode = TagFargerExampleSource;
}
