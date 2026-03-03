// Auto-generated - do not edit manually
export const CardMedInndelingExampleSource = `import { Component } from '@angular/core';
import { HviButton, HviCard, HviCardBlock, HviHeading, HviParagraph } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-card-med-inndeling-example',
  standalone: true,
  imports: [HviButton, HviCard, HviCardBlock, HviHeading, HviParagraph],
  template: \`
    <div class="flex flex-wrap gap-4">
      <hvi-card color="accent" variant="tinted" maxWidth="380px">
        <div hviCardBlock>
          <video controls width="100%">
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          </video>
        </div>
        <div hviCardBlock>
          <h3 hviHeading>Om Designsystemet</h3>
          <p hviParagraph>
            Videoen over gir en kort introduksjon til hva Designsystemet er, og hvordan det kan
            brukes i utviklingen av digitale tjenester.
          </p>
          <button hviButton variant="secondary">Vis mer</button>
        </div>
      </hvi-card>
    </div>
  \`,
})
export class CardMedInndelingExampleComponent {
  
}
`;
