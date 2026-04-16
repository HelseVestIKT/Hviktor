import { Component } from '@angular/core';
import { HviAvatar, HviAvatarStack } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-avatar-stack-expandable-example',
  standalone: true,
  imports: [HviAvatar, HviAvatarStack],
  template: `
    <div class="flex flex-wrap gap-2">
      <figure hviAvatarStack tabindex="-1" expandable="true">
        <hvi-avatar aria-label="Ola Nordmann" variant="circle" color="brand1"></hvi-avatar>
        <hvi-avatar
          aria-label="Kari Nordmann"
          variant="circle"
          initials="KN"
          color="brand2"
        ></hvi-avatar>
        <hvi-avatar
          aria-label="Per Hansen"
          variant="circle"
          initials="PH"
          color="brand3"
        ></hvi-avatar>
      </figure>
    </div>
  `,
})
export class AvatarStackExpandableExampleComponent {}
