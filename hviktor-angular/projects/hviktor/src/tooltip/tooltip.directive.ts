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
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/tooltip/code}
 */
@Directive({
  selector: '[hviTooltip]',
  standalone: true,
  host: {
    '[attr.data-tooltip]': 'hviTooltip',
    '[attr.data-placement]': 'tooltipPlacement',
    '[attr.data-auto-placement]': 'tooltipAutoPlacement ? "true" : null',
    '[attr.aria-describedby]': 'tooltipType === "describedby" ? hviTooltip : null',
    '[attr.aria-labelledby]': 'tooltipType === "labelledby" ? hviTooltip : null',
  },
})
export class HviTooltip {
  /** Tooltip content */
  @Input({ required: true }) hviTooltip = '';

  /** Placement of the tooltip relative to the trigger */
  @Input() tooltipPlacement: 'top' | 'right' | 'bottom' | 'left' = 'top';

  /** Enable auto placement when there's not enough space */
  @Input() tooltipAutoPlacement = true;

  /**
   * Override ARIA attribute type.
   * - 'describedby': tooltip describes the element (default for elements with text)
   * - 'labelledby': tooltip labels the element (default for icon-only buttons)
   */
  @Input() tooltipType?: 'describedby' | 'labelledby';
}
