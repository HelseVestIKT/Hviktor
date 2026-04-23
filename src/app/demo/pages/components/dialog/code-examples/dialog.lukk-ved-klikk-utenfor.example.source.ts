// Auto-generated - do not edit manually
export const DialogLukkVedKlikkUtenforExampleSource = `import { Component, signal } from '@angular/core';
import { HviButton, HviDialog, HviHeading } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-dialog-lukk-ved-klikk-utenfor-example',
  standalone: true,
  imports: [HviButton, HviDialog, HviHeading],
  template: \`
    <button hviButton (click)="backdropOpen.set(true)">Åpne Dialog</button>
    
    <dialog
      hviDialog
      closedby="any"
      [open]="backdropOpen()"
      (openChange)="backdropOpen.set($event)"
    >
      <h2 hviHeading>Klikk utenfor dialogen for å lukke</h2>
    </dialog>
  \`,
})
export class DialogLukkVedKlikkUtenforExampleComponent {
  readonly modalOpen = signal(false);
  readonly nonModalOpen = signal(false);
  readonly drawerOpen = signal(false);
  readonly formOpen = signal(false);
  readonly blocksOpen = signal(false);
  readonly backdropOpen = signal(false);
}
`;
