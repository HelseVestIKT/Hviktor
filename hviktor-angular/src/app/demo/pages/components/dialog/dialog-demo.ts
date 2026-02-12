import { Component, signal } from '@angular/core';
import {
  HviButton,
  HviDialog,
  HviDialogBlock,
  HviHeading,
  HviParagraph,
} from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-dialog-demo',
  standalone: true,
  imports: [
    HviDialog,
    HviDialogBlock,
    HviButton,
    HviHeading,
    HviParagraph,
    DemoPageComponent,
    DemoSectionComponent,
  ],
  template: `
    <app-demo-page
      title="Dialog"
      description="Modale dialogbokser for viktige handlinger eller informasjon."
    >
      <app-demo-section title="Standard">
        <div class="flex gap-2">
          <button hviButton type="button" aria-haspopup="dialog" (click)="toggleDialog(true)">
            Åpne dialog
          </button>
        </div>

        <dialog
          hviDialog
          id="demoDialog"
          aria-labelledby="demoDialogTitle"
          [open]="dialogOpen()"
          (openChange)="toggleDialog($event)"
        >
          <div hviDialogBlock>
            <h3 hviHeading size="md" id="demoDialogTitle">En enkel dialog</h3>
          </div>
          <div hviDialogBlock>
            <p hviParagraph size="md">
              Her kan innholdet ditt ligge. Dialogen er modal og styrt med hviDialog-direktivet.
            </p>
          </div>
          <div hviDialogBlock class="flex justify-end gap-2">
            <button hviButton variant="secondary" type="button" (click)="toggleDialog(false)">
              Lukk
            </button>
            <button hviButton type="button" (click)="toggleDialog(false)">Fortsett</button>
          </div>
        </dialog>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class DialogDemoComponent {
  readonly dialogOpen = signal(false);

  toggleDialog(nextState?: boolean): void {
    if (typeof nextState === 'boolean') {
      this.dialogOpen.set(nextState);
      return;
    }
    this.dialogOpen.update((current) => !current);
  }
}
