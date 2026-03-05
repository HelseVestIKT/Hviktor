import { Component, signal } from '@angular/core';
import {
  HviHeading,
  HviLogo,
  HviParagraph,
  HviToggleGroup,
  HviToggleGroupItem,
  LogoSize,
} from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-logo-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    HviLogo,
    HviHeading,
    HviToggleGroup,
    HviToggleGroupItem,
    HviParagraph,
  ],
  template: `
    <app-demo-page
      title="Logo"
      description="Logo viser foretakslogoer for Helse Vest. Logoen responderer automatisk på applikasjonens light/dark mode."
    >
      <app-demo-section title="Størrelse">
        <hvi-toggle-group [(value)]="selectedSize" variant="primary">
          <button hviToggleGroupItem value="sm">sm</button>
          <button hviToggleGroupItem value="md">md</button>
          <button hviToggleGroupItem value="lg">lg</button>
        </hvi-toggle-group>
      </app-demo-section>

      <app-demo-section title="Varianter">
        <div class="flex flex-col gap-8">
          <p hviParagraph>Variant endres med <code>company</code>-attributtet.</p>
          <div class="grid gap-2">
            <h3 hviHeading>hve</h3>
            <hvi-logo company="hve" [size]="selectedSize()" />
          </div>
          <div class="grid gap-2">
            <h3 hviHeading>hvikt</h3>
            <hvi-logo company="hvikt" [size]="selectedSize()" />
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
            <h3 hviHeading>hst</h3>
            <hvi-logo company="hst" [size]="selectedSize()" />
          </div>
          <div class="grid gap-2">
            <h3 hviHeading>hst-sus</h3>
            <hvi-logo company="hst-sus" [size]="selectedSize()" />
          </div>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class LogoDemoComponent {
  selectedSize = signal<LogoSize>('md');
}
