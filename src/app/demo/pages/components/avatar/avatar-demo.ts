import { Component } from '@angular/core';
import { HviAvatar, HviButton } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { AvatarIKnappExampleSource } from './code-examples/avatar.i-knapp.example.source';
import { AvatarStorrelserExampleSource } from './code-examples/avatar.storrelser.example.source';
import { AvatarVarianterExampleSource } from './code-examples/avatar.varianter.example.source';
@Component({
  selector: 'app-avatar-demo',
  standalone: true,
  imports: [HviAvatar, HviButton, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page componentId="avatar">
      <app-demo-section title="Varianter" [code]="varianterCode">
        <div class="flex items-center gap-4">
          <hvi-avatar aria-label="Erlend Johnsen" />
          <hvi-avatar variant="square" aria-label="Erlend Johnsen" />
          <hvi-avatar initials="EJ" aria-label="Erlend Johnsen" />
        </div>
      </app-demo-section>

      <app-demo-section title="Størrelser" [code]="storrelserCode">
        <div class="flex items-center gap-4">
          <hvi-avatar initials="xs" aria-label="Erlend Johnsen" size="xs" />
          <hvi-avatar initials="sm" aria-label="Erlend Johnsen" size="sm" />
          <hvi-avatar initials="md" aria-label="Erlend Johnsen" size="md" />
          <hvi-avatar initials="lg" aria-label="Erlend Johnsen" size="lg" />
        </div>
      </app-demo-section>

      <app-demo-section title="I knapp" [code]="iKnappCode">
        <div class="flex items-center gap-4">
          <button hviButton variant="secondary">
            <hvi-avatar initials="EJ" aria-label="Erlend Johnsen" size="sm" />
            Button with Avatar
          </button>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class AvatarDemoComponent {
  readonly varianterCode = AvatarVarianterExampleSource;
  readonly storrelserCode = AvatarStorrelserExampleSource;
  readonly iKnappCode = AvatarIKnappExampleSource;
}
