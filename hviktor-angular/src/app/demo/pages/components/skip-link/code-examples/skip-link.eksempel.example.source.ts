// Auto-generated - do not edit manually
export const SkipLinkEksempelExampleSource = `import { Component } from '@angular/core';
import { HviParagraph, HviSkipLink } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-skip-link-eksempel-example',
  standalone: true,
  imports: [HviParagraph, HviSkipLink],
  template: \`
    <div
      class="relative grid gap-2 rounded border border-dashed p-4 focus-within:ring-2"
      tabindex="0"
    >
      <p hviParagraph class="text-center">
        Klikk her og trykk <kbd class="rounded border px-1 py-0.5">Tab</kbd> for å se SkipLink
      </p>
      <a hviSkipLink href="#demo-main-content">Hopp til hovedinnhold</a>
    </div>
    
    <main
      id="demo-main-content"
      tabindex="-1"
      class="mt-4 rounded border p-4 focus-within:ring-2"
    >
      <p hviParagraph>
        <strong>Hovedinnhold:</strong> Dette er regionen som mottar fokus fra SkipLink.
      </p>
    </main>
  \`,
})
export class SkipLinkEksempelExampleComponent {
  
}
`;
