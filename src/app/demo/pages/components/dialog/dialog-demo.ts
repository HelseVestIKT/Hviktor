import { Component, signal } from '@angular/core';

import {
  HviButton,
  HviDialog,
  HviDialogBlock,
  HviField,
  HviFieldAffixes,
  HviHeading,
  HviInput,
  HviLabel,
  HviParagraph,
} from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { DialogDialogSomDrawerExampleSource } from './code-examples/dialog.dialog-som-drawer.example.source';
import { DialogIkkeModalDialogExampleSource } from './code-examples/dialog.ikke-modal-dialog.example.source';
import { DialogLukkVedKlikkUtenforExampleSource } from './code-examples/dialog.lukk-ved-klikk-utenfor.example.source';
import { DialogMedBlokkerExampleSource } from './code-examples/dialog.med-blokker.example.source';
import { DialogMedSkjemaOgFokusExampleSource } from './code-examples/dialog.med-skjema-og-fokus.example.source';
import { DialogModalDialogExampleSource } from './code-examples/dialog.modal-dialog.example.source';
@Component({
  selector: 'app-dialog-demo',
  standalone: true,
  imports: [
    DemoPageComponent,
    DemoSectionComponent,
    HviButton,
    HviDialog,
    HviDialogBlock,
    HviParagraph,
    HviHeading,
    HviLabel,
    HviInput,
    HviField,
    HviFieldAffixes,
  ],
  template: `
    <app-demo-page componentId="dialog">
      <app-demo-section title="Modal Dialog" [code]="modalDialogCode">
        <button hviButton (click)="modalOpen.set(true)">Åpne modal Dialog</button>

        <dialog hviDialog [open]="modalOpen()" (openChange)="modalOpen.set($event)">
          <div hviDialogBlock>
            <p hviParagraph size="sm">Bekreft endring</p>
            <h2 hviHeading>Er du sikker på at du vil endre søknaden?</h2>
          </div>
          <div hviDialogBlock>
            <p hviParagraph>
              OBS! Du bør ikke endre søknaden etter at fristen har gått ut. Hvis du endrer søknaden
              nå, er du ikke lenger med i kommende opptak. Ring kontaktsenteret på telefon 00 00 00
              00 hvis du trenger veiledning.
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
      </app-demo-section>

      <app-demo-section title="Ikke-modal Dialog" [code]="ikkeModalDialogCode">
        <button hviButton (click)="nonModalOpen.set(true)">Åpne ikke-modal Dialog</button>

        <dialog
          hviDialog
          [modal]="false"
          [open]="nonModalOpen()"
          (openChange)="nonModalOpen.set($event)"
          style="z-index:10;top:calc(100vh - 400px);left:calc(100vw - 385px);margin:0;max-width:350px"
        >
          <h2 hviHeading>Vi ønsker din mening</h2>
          <label hviLabel for="my-textarea">Hvordan var din opplevelse?</label>
          <textarea hviInput id="my-textarea"></textarea>
          <button hviButton variant="primary" (click)="nonModalOpen.set(false)" class="mt-2">
            Send inn
          </button>
        </dialog>
      </app-demo-section>

      <app-demo-section title="Dialog som drawer" [code]="dialogSomDrawerCode">
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
      </app-demo-section>

      <app-demo-section title="Med skjema og fokus" [code]="medSkjemaOgFokusCode">
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
      </app-demo-section>

      <app-demo-section title="Med blokker" [code]="medBlokkerCode">
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
      </app-demo-section>

      <app-demo-section title="Lukk ved klikk utenfor" [code]="lukkVedKlikkUtenforCode">
        <button hviButton (click)="backdropOpen.set(true)">Åpne Dialog</button>

        <dialog
          hviDialog
          closedby="any"
          [open]="backdropOpen()"
          (openChange)="backdropOpen.set($event)"
        >
          <h2 hviHeading>Klikk utenfor dialogen for å lukke</h2>
        </dialog>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class DialogDemoComponent {
  readonly modalDialogCode = DialogModalDialogExampleSource;
  readonly ikkeModalDialogCode = DialogIkkeModalDialogExampleSource;
  readonly dialogSomDrawerCode = DialogDialogSomDrawerExampleSource;
  readonly medSkjemaOgFokusCode = DialogMedSkjemaOgFokusExampleSource;
  readonly medBlokkerCode = DialogMedBlokkerExampleSource;
  readonly lukkVedKlikkUtenforCode = DialogLukkVedKlikkUtenforExampleSource;

  readonly modalOpen = signal(false);
  readonly nonModalOpen = signal(false);
  readonly drawerOpen = signal(false);
  readonly formOpen = signal(false);
  readonly blocksOpen = signal(false);
  readonly backdropOpen = signal(false);
}
