// Auto-generated - do not edit manually
export const DialogMedSkjemaOgFokusExampleSource = `import { Component, signal } from '@angular/core';
import { HviButton, HviDialog, HviField, HviFieldAffixes, HviHeading, HviLabel } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-dialog-med-skjema-og-fokus-example',
  standalone: true,
  imports: [HviButton, HviDialog, HviField, HviFieldAffixes, HviHeading, HviLabel],
  template: \`
    <button hviButton (click)="formOpen.set(true)">Åpne Dialog</button>
    
    <dialog hviDialog closedby="any" [open]="formOpen()" (openChange)="formOpen.set($event)">
      <h2 hviHeading>Dialog med skjema</h2>
      <hvi-field>
        <label hviLabel>Navn</label>
        <hvi-field-affixes>
          <input class="ds-input" type="text" autofocus />
        </hvi-field-affixes>
      </hvi-field>
      <div class="mt-4 flex gap-2">
        <button hviButton (click)="formOpen.set(false)">Send inn skjema</button>
        <button hviButton variant="secondary" color="danger" (click)="formOpen.set(false)">
          Avbryt
        </button>
      </div>
    </dialog>
  \`,
})
export class DialogMedSkjemaOgFokusExampleComponent {
  readonly modalOpen = signal(false);
  readonly nonModalOpen = signal(false);
  readonly drawerOpen = signal(false);
  readonly formOpen = signal(false);
  readonly blocksOpen = signal(false);
  readonly backdropOpen = signal(false);
}
`;
