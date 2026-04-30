import { Component, signal } from '@angular/core';
import {
  HviButton,
  HviDialog,
  HviField,
  HviFieldAffixes,
  HviInput,
  HviLabel,
} from '@helsevestikt/hviktor';

@Component({
  selector: 'app-dialog-med-skjema-og-fokus-example',
  standalone: true,
  imports: [HviButton, HviDialog, HviField, HviFieldAffixes, HviInput, HviLabel],
  template: `
    <button hviButton (click)="formOpen.set(true)">Åpne Dialog</button>

    <dialog
      hviDialog
      title="Dialog med skjema"
      closedby="any"
      [open]="formOpen()"
      (openChange)="formOpen.set($event)"
    >
      <hvi-field>
        <label hviLabel>Navn</label>
        <hvi-field-affixes>
          <input hviInput type="text" autofocus />
        </hvi-field-affixes>
      </hvi-field>
      <div class="mt-4 flex gap-2">
        <button hviButton (click)="formOpen.set(false)">Send inn skjema</button>
        <button hviButton variant="secondary" color="danger" (click)="formOpen.set(false)">
          Avbryt
        </button>
      </div>
    </dialog>
  `,
})
export class DialogMedSkjemaOgFokusExampleComponent {
  readonly modalOpen = signal(false);
  readonly nonModalOpen = signal(false);
  readonly drawerOpen = signal(false);
  readonly formOpen = signal(false);
  readonly blocksOpen = signal(false);
  readonly backdropOpen = signal(false);
}
