import { Component } from '@angular/core';
import { HviAlert, HviAvatar, HviAvatarStack, HviLink } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { AvatarStackExpandableExampleSource } from './code-examples/avatar-stack.expandable.example.source';
import { AvatarStackMedSuffixExampleSource } from './code-examples/avatar-stack.med-suffix.example.source';
import { AvatarStackStandardAvatarStackExampleSource } from './code-examples/avatar-stack.standard-avatar-stack.example.source';
@Component({
  selector: 'app-avatar-stack-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent, HviAvatarStack, HviAvatar, HviAlert, HviLink],
  template: `
    <app-demo-page componentId="avatar-stack">
      <hvi-alert
        >AvatarStack er fortsatt under utvikling hos
        <a
          hviLink
          href="https://designsystemet.no/no/components/docs/avatar-stack/code"
          target="_blank"
          rel="noopener noreferrer"
          >Designsystemet</a
        >
        og er derfor ikke helt ferdig enda</hvi-alert
      >
      <app-demo-section title="Standard Avatar Stack" [code]="standardAvatarStackCode">
        <div class="flex flex-wrap gap-2">
          <figure hviAvatarStack tabindex="-1">
            <hvi-avatar
              ariaLabel="Ola Nordmann"
              variant="circle"
              size="md"
              color="brand1"
            ></hvi-avatar>
            <hvi-avatar
              ariaLabel="Kari Nordmann"
              variant="circle"
              initials="KN"
              size="md"
              color="brand2"
            ></hvi-avatar>
            <hvi-avatar
              ariaLabel="Per Hansen"
              variant="circle"
              initials="PH"
              size="md"
              color="brand3"
            ></hvi-avatar>
          </figure>
        </div>
      </app-demo-section>

      <app-demo-section title="Med suffix" [code]="medSuffixCode">
        <div class="flex flex-wrap gap-2">
          <figure hviAvatarStack tabindex="-1" suffix="+4">
            <hvi-avatar
              ariaLabel="Ola Nordmann"
              variant="circle"
              size="md"
              color="brand1"
            ></hvi-avatar>
            <hvi-avatar
              ariaLabel="Kari Nordmann"
              variant="circle"
              initials="KN"
              size="md"
              color="brand2"
            ></hvi-avatar>
            <hvi-avatar
              ariaLabel="Per Hansen"
              variant="circle"
              initials="PH"
              size="md"
              color="brand3"
            ></hvi-avatar>
          </figure>
        </div>
      </app-demo-section>

      <app-demo-section title="Expandable" [code]="expandableCode">
        <div class="flex flex-wrap gap-2">
          <figure hviAvatarStack tabindex="-1" expandable="true">
            <hvi-avatar ariaLabel="Ola Nordmann" variant="circle" color="brand1"></hvi-avatar>
            <hvi-avatar
              ariaLabel="Kari Nordmann"
              variant="circle"
              initials="KN"
              color="brand2"
            ></hvi-avatar>
            <hvi-avatar
              ariaLabel="Per Hansen"
              variant="circle"
              initials="PH"
              color="brand3"
            ></hvi-avatar>
          </figure>
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class AvatarStackDemoComponent {
  readonly standardAvatarStackCode = AvatarStackStandardAvatarStackExampleSource;
  readonly medSuffixCode = AvatarStackMedSuffixExampleSource;
  readonly expandableCode = AvatarStackExpandableExampleSource;
}
