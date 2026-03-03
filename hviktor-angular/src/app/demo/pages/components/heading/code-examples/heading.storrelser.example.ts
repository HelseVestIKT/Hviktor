import { Component } from '@angular/core';
import { HviHeading } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-heading-storrelser-example',
  standalone: true,
  imports: [HviHeading],
  template: `
    <div class="flex flex-col gap-4">
      <h1 hviHeading size="2xl">2XL Overskrift</h1>
      <h1 hviHeading size="xl">XL Overskrift</h1>
      <h2 hviHeading size="lg">LG Overskrift</h2>
      <h3 hviHeading size="md">MD Overskrift</h3>
      <h4 hviHeading size="sm">SM Overskrift</h4>
      <h5 hviHeading size="xs">XS Overskrift</h5>
    </div>
  `,
})
export class HeadingStorrelserExampleComponent {}
