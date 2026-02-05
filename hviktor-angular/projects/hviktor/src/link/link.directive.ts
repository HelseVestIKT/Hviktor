import { Directive, Input } from '@angular/core';

/**
 * Info
 *
 * Eksempel på bruk:
 * ```html
 * <a hviLink />
 * ```
 *
 * Dokumentasjon: https://designsystemet.no/no/components/docs/input/overview
 */

@Directive({
  selector: 'a[hviLink]',
  standalone: true,
  host: {
    class: 'ds-link',
    '[attr.data-color]': 'color',
  },
})
export class HviLink {
  /** Used to change the appearance of the link. */
  @Input() color?: 'default' | 'neutral' = 'default';
}
