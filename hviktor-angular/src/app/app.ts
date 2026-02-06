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
  HviErrorSummary,
  HviField,
  HviFieldAffix,
  HviFieldAffixes,
  HviFieldDescription,
  HviFieldOptional,
  HviFieldset,
  HviHeading,
  HviIcon,
  HviInput,
  HviLabel,
  HviLink,
  HviList,
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
    HviLink,
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
    HviIcon,
    HviChipButton,
    HviDialog,
    HviDialogBlock,
    HviErrorSummary,
    HviTag,
    HviList,
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
