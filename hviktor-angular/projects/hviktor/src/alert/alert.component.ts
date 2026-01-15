import { Component, Input } from "@angular/core";

/**
 * Alert gir brukeren informasjon som det er ekstra viktig at de ser og forstår. 
 * Komponenten er designet for å fange brukernes oppmerksomhet. 
 * Teksten i varselet skal være kort og tydelig.
 * 
 * Eksempel på bruk:
 * ```html
 * <hvi-alert color="warning">
 *  Dette er et advarselsvarsel!
 * </hvi-alert>
 * ```
 * 
 */
@Component({
  selector: 'hvi-alert',
  standalone: true,
  template: `<ng-content />`,
  host: {
    class: 'ds-alert',
    '[attr.data-color]': 'color'
  },
})
export class HviAlert {
  /** Setter typen varsel ved å endre farge og ikon */
    @Input() color?: 'info' | 'success' | 'warning' | 'danger';
}