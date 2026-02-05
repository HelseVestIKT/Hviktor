import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  HviForms,
  HviHeading,
  HviLabel,
  HviParagraph,
  HviValidationMessages,
} from '@helsevestikt/hviktor';
import '@u-elements/u-details';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
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
    HviChipLabel,
    HviChipButton,
    HviDialog,
    HviDialogBlock,
    HviForms,
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

  form = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
  });

  messages: Record<string, HviValidationMessages> = {
    firstName: {
      required: 'Fornavn er påkrevd',
      minlength: 'Fornavn må være minst 2 tegn',
    },
    phone: {
      required: 'Telefon er påkrevd',
      pattern: 'Telefonnummer kan kun inneholde siffer',
    },
  };
}
