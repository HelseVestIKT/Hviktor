import { Component, signal } from '@angular/core';
import { HviButton, HviDialog, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-dialog-lukk-ved-klikk-utenfor-example',
  standalone: true,
  imports: [HviButton, HviDialog, HviParagraph],
  template: `
    <button hviButton (click)="backdropOpen.set(true)">Åpne Dialog</button>

    <dialog
      hviDialog
      title="Klikk utenfor dialogen for å lukke"
      closedby="any"
      [open]="backdropOpen()"
      (openChange)="backdropOpen.set($event)"
    >
      <p hviParagraph>Klikk utenfor denne dialogen for å lukke den.</p>
    </dialog>
  `,
})
export class DialogLukkVedKlikkUtenforExampleComponent {
  readonly modalOpen = signal(false);
  readonly nonModalOpen = signal(false);
  readonly drawerOpen = signal(false);
  readonly formOpen = signal(false);
  readonly blocksOpen = signal(false);
  readonly backdropOpen = signal(false);
}
