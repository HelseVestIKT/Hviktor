import { Directive } from "@angular/core";

/**
 * Bruk flere <div hviCardBlock> hvis du vil dele opp kortet med skillelinjer eller legge til bilder eller video som går ut i kanten. 
 * Merk at når du bruker <div hviCardBlock>, må alt innhold ligge inni <div hviCardBlock> - ikke plasseres direkte i Card.
 * 
 * Eksempel på bruk:
 * ```html
 * <hvi-card variant="tinted" color="brand1" maxWidth="400px">
 *  <div hviCardBlock>
 *   <h2>Dette er et kort</h2>
 *   <p>Innholdet i kortet går her.</p>
 *  </div>
 * </hvi-card>
 * ```
 * 
 * Dokumentasjon: https://designsystemet.no/no/components/docs/card/overview#med-inndeling
 */
@Directive({
  selector: '[hviCardBlock]',
  standalone: true,
  host: { class: 'ds-card__block' },
})
export class HviCardBlock {}