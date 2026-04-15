import { Component, signal } from '@angular/core';
import {
  HviButton,
  HviDialog,
  HviDialogBlock,
  HviHeading,
  HviParagraph,
} from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';
import { DialogStandardExampleSource } from './code-examples/dialog.standard.example.source';

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
    <app-demo-page componentId="dialog">
      <app-demo-section title="Standard" [code]="standardExampleCode">
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

      <app-demo-section title="Skuff (placement)">
        <div class="flex gap-2">
          @for (p of placements; track p) {
            <button
              hviButton
              variant="secondary"
              type="button"
              aria-haspopup="dialog"
              (click)="openDrawer(p)"
            >
              {{ p }}
            </button>
          }
        </div>

        <dialog
          hviDialog
          id="drawerDialog"
          [placement]="drawerPlacement()"
          [open]="drawerOpen()"
          (openChange)="drawerOpen.set($event)"
        >
          <div hviDialogBlock>
            <h3 hviHeading size="md">Skuff – {{ drawerPlacement() }}</h3>
          </div>
          <div hviDialogBlock>
            <p hviParagraph size="md">Dialogen åpner som en skuff fra {{ drawerPlacement() }}.</p>
          </div>
          <div hviDialogBlock class="flex justify-end">
            <button hviButton variant="secondary" type="button" (click)="drawerOpen.set(false)">
              Lukk
            </button>
          </div>
        </dialog>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class DialogDemoComponent {
  readonly dialogOpen = signal(false);
  readonly drawerOpen = signal(false);
  readonly drawerPlacement = signal<'left' | 'right' | 'top' | 'bottom'>('right');
  readonly standardExampleCode = DialogStandardExampleSource;
  readonly placements = ['left', 'right', 'top', 'bottom'] as const;

  toggleDialog(nextState?: boolean): void {
    if (typeof nextState === 'boolean') {
      this.dialogOpen.set(nextState);
      return;
    }
    this.dialogOpen.update((current) => !current);
  }

  openDrawer(placement: 'left' | 'right' | 'top' | 'bottom'): void {
    this.drawerPlacement.set(placement);
    this.drawerOpen.set(true);
  }
}
