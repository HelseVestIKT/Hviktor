// Auto-generated - do not edit manually
export const AvatarStackExpandableExampleSource = `import { Component } from '@angular/core';
import { HviAvatar, HviAvatarStack } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-avatar-stack-expandable-example',
  standalone: true,
  imports: [HviAvatar, HviAvatarStack],
  template: \`
    <div class="flex flex-wrap gap-2">
      <hvi-avatar-stack expandable="true">
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
      </hvi-avatar-stack>
    </div>
  \`,
})
export class AvatarStackExpandableExampleComponent {
  
}
`;
