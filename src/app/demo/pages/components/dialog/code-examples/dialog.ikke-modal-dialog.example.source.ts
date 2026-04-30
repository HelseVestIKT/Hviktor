// Auto-generated - do not edit manually
export const DialogIkkeModalDialogExampleSource = `import { Component, signal } from '@angular/core';
import { HviButton, HviDialog, HviInput, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-dialog-ikke-modal-dialog-example',
  standalone: true,
  imports: [HviButton, HviDialog, HviInput, HviLabel],
  template: \`
    <button hviButton (click)="nonModalOpen.set(true)">Åpne ikke-modal Dialog</button>
    
    <dialog
      hviDialog
      title="Vi ønsker din mening"
      [modal]="false"
      [open]="nonModalOpen()"
      (openChange)="nonModalOpen.set($event)"
      style="z-index:10;top:calc(100vh - 400px);left:calc(100vw - 385px);margin:0;max-width:350px"
    >
      <label hviLabel for="my-textarea">Hvordan var din opplevelse?</label>
      <textarea hviInput id="my-textarea"></textarea>
      <button hviButton variant="primary" (click)="nonModalOpen.set(false)" class="mt-2">
        Send inn
      </button>
    </dialog>
  \`,
})
export class DialogIkkeModalDialogExampleComponent {
  readonly modalOpen = signal(false);
  readonly nonModalOpen = signal(false);
  readonly drawerOpen = signal(false);
  readonly formOpen = signal(false);
  readonly blocksOpen = signal(false);
  readonly backdropOpen = signal(false);
}
`;
