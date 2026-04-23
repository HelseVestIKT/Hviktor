import { Component, signal } from '@angular/core';
import { HviButton, HviDialog, HviDialogBlock, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-dialog-dialog-som-drawer-example',
  standalone: true,
  imports: [HviButton, HviDialog, HviDialogBlock, HviParagraph],
  template: `
    <button hviButton (click)="drawerOpen.set(true)">Åpne Dialog (Bottom)</button>

    <dialog
      hviDialog
      placement="bottom"
      closedby="any"
      [open]="drawerOpen()"
      (openChange)="drawerOpen.set($event)"
    >
      <div hviDialogBlock>
        <p hviParagraph>This is a modal Dialog with <code>placement="bottom"</code></p>
      </div>
    </dialog>
  `,
})
export class DialogDialogSomDrawerExampleComponent {
  readonly modalOpen = signal(false);
  readonly nonModalOpen = signal(false);
  readonly drawerOpen = signal(false);
  readonly formOpen = signal(false);
  readonly blocksOpen = signal(false);
  readonly backdropOpen = signal(false);
}
