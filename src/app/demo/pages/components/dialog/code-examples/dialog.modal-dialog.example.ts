import { Component, signal } from '@angular/core';
import {
  HviButton,
  HviDialog,
  HviDialogBlock,
  HviHeading,
  HviParagraph,
} from '@helsevestikt/hviktor';

@Component({
  selector: 'app-dialog-modal-dialog-example',
  standalone: true,
  imports: [HviButton, HviDialog, HviDialogBlock, HviHeading, HviParagraph],
  template: `
    <button hviButton (click)="modalOpen.set(true)">Åpne modal Dialog</button>

    <dialog hviDialog [open]="modalOpen()" (openChange)="modalOpen.set($event)">
      <div hviDialogBlock>
        <p hviParagraph size="sm">Bekreft endring</p>
        <h2 hviHeading>Er du sikker på at du vil endre søknaden?</h2>
      </div>
      <div hviDialogBlock>
        <p hviParagraph>
          OBS! Du bør ikke endre søknaden etter at fristen har gått ut. Hvis du endrer søknaden nå,
          er du ikke lenger med i kommende opptak. Ring kontaktsenteret på telefon 00 00 00 00 hvis
          du trenger veiledning.
        </p>
      </div>
      <div hviDialogBlock>
        <div class="flex gap-2">
          <button hviButton variant="primary" color="danger" (click)="modalOpen.set(false)">
            Ja, endre
          </button>
          <button hviButton variant="secondary" (click)="modalOpen.set(false)">Avbryt</button>
        </div>
      </div>
    </dialog>
  `,
})
export class DialogModalDialogExampleComponent {
  readonly modalOpen = signal(false);
  readonly nonModalOpen = signal(false);
  readonly drawerOpen = signal(false);
  readonly formOpen = signal(false);
  readonly blocksOpen = signal(false);
  readonly backdropOpen = signal(false);
}
