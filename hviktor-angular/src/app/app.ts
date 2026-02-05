import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  HviFieldKit,
  HviForms,
  HviHeading,
  HviIcon,
  HviLabel,
  HviLink,
  HviParagraph,
  HviTag,
  HviValidationKit,
  HviValidationMessages,
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
    HviChipLabel,
    HviIcon,
    HviChipButton,
    HviDialog,
    HviDialogBlock,
    HviForms,
    HviFieldKit,
    HviValidationKit,
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

  form = new FormGroup({
    // Person
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),

    // Kontakt
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),

    // Økonomi
    monthlyCost: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),

    // Preferanser
    gender: new FormControl('', [Validators.required]),
    flightMode: new FormControl(false),

    // Samtykke
    consent: new FormControl(false, [Validators.requiredTrue]),
  });

  messages: Record<string, HviValidationMessages> = {
    firstName: {
      required: 'Fornavn er påkrevd',
      minlength: 'Fornavn må være minst 2 tegn',
    },
    lastName: {
      required: 'Etternavn er påkrevd',
      minlength: 'Etternavn må være minst 2 tegn',
    },
    email: {
      required: 'E-post er påkrevd',
      email: 'E-post må være gyldig',
    },
    phone: {
      required: 'Telefon er påkrevd',
      pattern: 'Telefonnummer kan kun inneholde siffer',
    },
    monthlyCost: {
      required: 'Beløp er påkrevd',
      min: 'Beløp kan ikke være negativt',
    },
    gender: {
      required: 'Velg et alternativ',
    },
    consent: {
      requiredTrue: 'Du må samtykke før du kan sende inn',
    },
  };

  onSubmit(): void {
    if (this.form.valid) {
      alert('Skjema sendt inn!');
    } else {
      this.form.markAllAsTouched();
    }
  }
}
