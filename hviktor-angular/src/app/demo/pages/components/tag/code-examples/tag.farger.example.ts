import { Component } from '@angular/core';
import { HviTag } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-tag-farger-example',
  standalone: true,
  imports: [HviTag],
  template: `
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
  `,
})
export class TagFargerExampleComponent {}
