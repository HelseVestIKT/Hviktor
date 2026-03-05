import { Component } from '@angular/core';
import { HviHeading, HviLogo, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-logo-varianter-example',
  standalone: true,
  imports: [HviHeading, HviLogo, HviParagraph],
  template: `
    <div class="flex flex-col gap-8">
      <p hviParagraph>Variant endres med <code>company</code>-attributtet.</p>
      <div class="grid gap-2">
        <h3 hviHeading>dots</h3>
        <hvi-logo company="dots" />
      </div>
      <div class="grid gap-2">
        <h3 hviHeading>hve</h3>
        <hvi-logo company="hve" />
      </div>
      <div class="grid gap-2">
        <h3 hviHeading>hvikt</h3>
        <hvi-logo company="hvikt" />
      </div>
      <div class="grid gap-2">
        <h3 hviHeading>hbe</h3>
        <hvi-logo company="hbe" />
      </div>
      <div class="grid gap-2">
        <h3 hviHeading>hbe-hus</h3>
        <hvi-logo company="hbe-hus" />
      </div>
      <div class="grid gap-2">
        <h3 hviHeading>hfd</h3>
        <hvi-logo company="hfd" />
      </div>
      <div class="grid gap-2">
        <h3 hviHeading>hfo</h3>
        <hvi-logo company="hfo" />
      </div>
      <div class="grid gap-2">
        <h3 hviHeading>hst</h3>
        <hvi-logo company="hst" />
      </div>
      <div class="grid gap-2">
        <h3 hviHeading>hst-sus</h3>
        <hvi-logo company="hst-sus" />
      </div>
      <div class="grid gap-2">
        <h3 hviHeading>sav</h3>
        <hvi-logo company="sav" />
      </div>
    </div>
  `,
})
export class LogoVarianterExampleComponent {}
