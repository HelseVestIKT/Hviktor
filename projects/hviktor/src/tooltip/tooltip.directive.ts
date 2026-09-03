import { Directive, Input } from '@angular/core';
import '@digdir/designsystemet-web';

/**
 * @summary
 * Tooltip viser kort informasjon når brukeren holder musepekeren over
 * eller fokuserer på et element. Den brukes til sekundær informasjon,
 * for eksempel til å forklare hva et symbol betyr.
 *
 * @example
 * ```html
 * <button hviButton hviTooltip="Kopier">📋</button>
 * <span hviTooltip="Organisasjonsnummer">Org.nr.</span>
 *
 * <!-- Tom verdi fjerner tooltipen helt -->
 * <span [hviTooltip]="erLaast() ? 'Feltet er låst' : ''">Status</span>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/tooltip/code}
 */
@Directive({
  selector: '[hviTooltip]',
  standalone: true,
  host: {
    '[attr.data-tooltip]': 'hasTooltip ? hviTooltip : null',
    '[attr.data-placement]': 'hasTooltip ? tooltipPlacement : null',
    '[attr.data-autoplacement]': 'hasTooltip && tooltipAutoPlacement ? "true" : null',
  },
})
export class HviTooltip {
  /** Tooltip content. Empty, null or undefined removes the tooltip entirely. */
  @Input({ required: true }) hviTooltip: string | null | undefined = '';

  /** Placement of the tooltip relative to the trigger */
  @Input() tooltipPlacement: 'top' | 'right' | 'bottom' | 'left' = 'top';

  /** Enable auto placement when there's not enough space */
  @Input() tooltipAutoPlacement = true;

  get hasTooltip(): boolean {
    return !!this.hviTooltip?.trim();
  }
}
