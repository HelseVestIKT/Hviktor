import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HviAvatar, HviAlert, HviButton, HviHeading, HviParagraph, HviCard, HviCardBlock, HviLabel, HviBreadcrumbs, HviBadgePosition, HviBadge, HviFieldset, HviField, HviFieldDescription, HviFieldOptional, HviFieldValidation, HviFieldAffix, HviFieldAffixes, HviInput, HviChipLabel, HviChipButton  } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HviButton, HviAlert, HviAvatar, HviBadge, HviHeading, HviParagraph, HviCard, HviCardBlock, HviLabel, HviBreadcrumbs, HviBadgePosition, HviFieldset, HviField, HviFieldDescription, HviFieldOptional, HviFieldValidation, HviFieldAffix, HviFieldAffixes, HviInput, HviChipLabel, HviChipButton],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hviktor-angular');
}
