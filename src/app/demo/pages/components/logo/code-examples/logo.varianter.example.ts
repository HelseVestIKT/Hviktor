import { Component, signal } from '@angular/core';
import { HviHeading, HviLogo, HviParagraph } from '@helsevestikt/hviktor';
import type { LogoSize } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-logo-varianter-example',
  standalone: true,
  imports: [HviHeading, HviLogo, HviParagraph],
  template: `
    <div class="flex flex-col gap-8">
      <p hviParagraph>Variant endres med <code>company</code>-attributtet.</p>
      <div class="grid gap-2">
        <h3 hviHeading>dots</h3>
        <hvi-logo company="dots" [size]="selectedSize()" />
      </div>
      <div class="grid gap-2">
        <h3 hviHeading>hve</h3>
        <hvi-logo company="hve" [size]="selectedSize()" />
      </div>
      <div class="grid gap-2">
        <h3 hviHeading>hvikt</h3>
        <hvi-logo company="hvikt" [size]="selectedSize()" />
      </div>
      <div class="grid gap-2">
        <h3 hviHeading>hviktor</h3>
        <hvi-logo company="hviktor" [size]="selectedSize()" />
      </div>
      <div class="grid gap-2">
        <h3 hviHeading>hbe</h3>
        <hvi-logo company="hbe" [size]="selectedSize()" />
      </div>
      <div class="grid gap-2">
        <h3 hviHeading>hbe-hus</h3>
        <hvi-logo company="hbe-hus" [size]="selectedSize()" />
      </div>
      <div class="grid gap-2">
        <h3 hviHeading>hfd</h3>
        <hvi-logo company="hfd" [size]="selectedSize()" />
      </div>
      <div class="grid gap-2">
        <h3 hviHeading>hfo</h3>
        <hvi-logo company="hfo" [size]="selectedSize()" />
      </div>
      <div class="grid gap-2">
        <h3 hviHeading>hst</h3>
        <hvi-logo company="hst" [size]="selectedSize()" />
      </div>
      <div class="grid gap-2">
        <h3 hviHeading>hst-sus</h3>
        <hvi-logo company="hst-sus" [size]="selectedSize()" />
      </div>
      <div class="grid gap-2">
        <h3 hviHeading>sav</h3>
        <hvi-logo company="sav" [size]="selectedSize()" />
      </div>
    </div>
  `,
})
export class LogoVarianterExampleComponent {
  selectedSize = signal<LogoSize>('md');
}
