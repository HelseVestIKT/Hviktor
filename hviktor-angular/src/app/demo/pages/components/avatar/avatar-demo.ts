import { Component } from '@angular/core';
import { HviAvatar, HviButton } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-avatar-demo',
  standalone: true,
  imports: [HviAvatar, HviButton, DemoPageComponent, DemoSectionComponent],
  template: `
    <app-demo-page title="Avatar" description="Viser profilbilde eller initialer for en bruker.">
      <app-demo-section title="Varianter">
        <div class="flex items-center gap-4">
          <hvi-avatar ariaLabel="Erlend Johnsen" />
          <hvi-avatar variant="square" ariaLabel="Erlend Johnsen" />
          <hvi-avatar initials="EJ" ariaLabel="Erlend Johnsen" />
        </div>
      </app-demo-section>

      <app-demo-section title="Størrelser">
        <div class="flex items-center gap-4">
          <hvi-avatar initials="xs" ariaLabel="Erlend Johnsen" size="xs" />
          <hvi-avatar initials="sm" ariaLabel="Erlend Johnsen" size="sm" />
          <hvi-avatar initials="md" ariaLabel="Erlend Johnsen" size="md" />
          <hvi-avatar initials="lg" ariaLabel="Erlend Johnsen" size="lg" />
        </div>
      </app-demo-section>

      <app-demo-section title="I knapp">
        <div class="flex items-center gap-4">
          <button hviButton variant="secondary">
            <hvi-avatar initials="EJ" ariaLabel="Erlend Johnsen" size="sm" />
            Button with Avatar
          </button>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class AvatarDemoComponent {}
