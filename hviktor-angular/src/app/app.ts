import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HviAvatar, HviAlert, HviButton, HviHeading, HviParagraph, HviCard, HviDetails, HviDetailsSummary, HviDetailsContent, HviCardBlock, HviLabel, HviBreadcrumbs, HviBadgePosition, HviBadge, HviFieldset, HviField, HviFieldDescription, HviFieldOptional, HviFieldAffix, HviFieldAffixes, HviInput, HviChipLabel, HviChipButton  } from '@helsevestikt/hviktor';
// your-main-app-file.js
import '@u-elements/u-details';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HviButton, HviAlert, HviAvatar, HviBadge, HviDetails, HviDetailsSummary, HviDetailsContent, HviHeading, HviParagraph, HviCard, HviCardBlock, HviLabel, HviBreadcrumbs, HviBadgePosition, HviFieldset, HviField, HviFieldDescription, HviFieldOptional, HviFieldAffix, HviFieldAffixes, HviInput, HviChipLabel, HviChipButton],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hviktor-angular');
}
