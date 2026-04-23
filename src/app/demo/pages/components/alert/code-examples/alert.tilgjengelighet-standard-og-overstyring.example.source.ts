// Auto-generated - do not edit manually
export const AlertTilgjengelighetStandardOgOverstyringExampleSource = `import { Component } from '@angular/core';
import { HviAlert } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-alert-tilgjengelighet-standard-og-overstyring-example',
  standalone: true,
  imports: [HviAlert],
  template: \`
    <div class="flex flex-wrap gap-2">
      <hvi-alert>
        Info/success/warning bruker role="status" og aria-live="polite" som standard.
      </hvi-alert>
      <hvi-alert color="danger">
        Danger bruker role="alert" uten aria-live som standard.
      </hvi-alert>
      <hvi-alert color="danger" role="status" aria-live="polite">
        Ved behov kan du overstyre role og aria-live eksplisitt.
      </hvi-alert>
    </div>
  \`,
})
export class AlertTilgjengelighetStandardOgOverstyringExampleComponent {
  
}
`;
