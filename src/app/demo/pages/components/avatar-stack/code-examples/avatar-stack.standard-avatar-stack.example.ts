import { Component } from '@angular/core';
import { HviAvatar, HviAvatarStack } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-avatar-stack-standard-avatar-stack-example',
  standalone: true,
  imports: [HviAvatar, HviAvatarStack],
  template: `
    <div class="flex flex-wrap gap-2">
      <hvi-avatar-stack>
        <hvi-avatar
          aria-label="Ola Nordmann"
          variant="circle"
          size="md"
          color="brand1"
        ></hvi-avatar>
        <hvi-avatar
          aria-label="Kari Nordmann"
          variant="circle"
          initials="KN"
          size="md"
          color="brand2"
        ></hvi-avatar>
        <hvi-avatar
          aria-label="Per Hansen"
          variant="circle"
          initials="PH"
          size="md"
          color="brand3"
        ></hvi-avatar>
      </hvi-avatar-stack>
    </div>
  `,
})
export class AvatarStackStandardAvatarStackExampleComponent {}
