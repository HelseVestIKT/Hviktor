import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  HviAlert,
  HviAvatar,
  HviBadge,
  HviBadgePosition,
  HviBreadcrumbs,
  HviButton,
  HviCard,
  HviCardBlock,
  HviChipButton,
  HviChipLabel,
  HviDetails,
  HviDetailsContent,
  HviDetailsSummary,
  HviDialog,
  HviDialogBlock,
  HviDivider,
  HviField,
  HviFieldAffix,
  HviFieldAffixes,
  HviFieldDescription,
  HviFieldOptional,
  HviFieldset,
  HviHeading,
  HviInput,
  HviLabel,
  HviParagraph,
  HviTag,
} from '@helsevestikt/hviktor';
import '@u-elements/u-details';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HviButton,
    HviAlert,
    HviAvatar,
    HviBadge,
    HviDetails,
    HviDivider,
    HviDetailsSummary,
    HviDetailsContent,
    HviHeading,
    HviParagraph,
    HviCard,
    HviCardBlock,
    HviLabel,
    HviBreadcrumbs,
    HviBadgePosition,
    HviFieldset,
    HviField,
    HviFieldDescription,
    HviFieldOptional,
    HviFieldAffix,
    HviFieldAffixes,
    HviInput,
    HviChipLabel,
    HviChipButton,
    HviDialog,
    HviDialogBlock,
    HviTag,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly dialogOpen = signal(false);

  toggleDialog(nextState?: boolean): void {
    if (typeof nextState === 'boolean') {
      this.dialogOpen.set(nextState);
      return;
    }

    this.dialogOpen.update((current) => !current);
  }
}
