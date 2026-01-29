import { Directive } from '@angular/core';

/**
 * Info
 *
 * Eksempel på bruk:
 * ```html
 * <hr hviDivider />
 * ```
 *
 * Dokumentasjon: https://designsystemet.no/no/components/docs/divider/overview
 */

@Directive({
  selector: 'hr[hviDivider]',
  standalone: true,
  host: {
    class: 'ds-divider',
    'aria-hidden': 'true',
  },
})
export class HviDivider {}
