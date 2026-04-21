import { Component } from '@angular/core';
import { HviAvatar } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-avatar-varianter-example',
  standalone: true,
  imports: [HviAvatar],
  template: `
    <div class="flex items-center gap-4">
      <hvi-avatar aria-label="Erlend Johnsen" />
      <hvi-avatar variant="square" aria-label="Erlend Johnsen" />
      <hvi-avatar initials="EJ" aria-label="Erlend Johnsen" />
    </div>
  `,
})
export class AvatarVarianterExampleComponent {}
