import { Component, signal } from '@angular/core';
import {
  HviButton,
  HviDialog,
  HviDialogBlock,
  HviHeading,
  HviParagraph,
} from '@helsevestikt/hviktor';

@Component({
  selector: 'app-dialog-med-blokker-example',
  standalone: true,
  imports: [HviButton, HviDialog, HviDialogBlock, HviHeading, HviParagraph],
  template: `
    <button hviButton (click)="blocksOpen.set(true)">Åpne Dialog</button>

    <dialog hviDialog [open]="blocksOpen()" (openChange)="blocksOpen.set($event)">
      <div hviDialogBlock>
        <p hviParagraph size="sm">Dialog subtitle</p>
        <h2 hviHeading>Dialog with dividers</h2>
      </div>
      <div hviDialogBlock>
        <p hviParagraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales eros justo.
        </p>
      </div>
      <div hviDialogBlock>
        <button hviButton variant="secondary" (click)="blocksOpen.set(false)">Lukk</button>
      </div>
    </dialog>
  `,
})
export class DialogMedBlokkerExampleComponent {
  readonly modalOpen = signal(false);
  readonly nonModalOpen = signal(false);
  readonly drawerOpen = signal(false);
  readonly formOpen = signal(false);
  readonly blocksOpen = signal(false);
  readonly backdropOpen = signal(false);
}
