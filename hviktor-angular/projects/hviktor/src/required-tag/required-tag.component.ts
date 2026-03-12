import { Component, Input } from '@angular/core';
import { HviTag } from '../tag';

/**
 * RequiredTag brukes sammen med labels i skjema for å indikere om et felt er
 * påkrevd, valgfritt, eller om alle felt må fylles ut.
 *
 * Komponenten wrapper `HviTag` med forhåndsdefinerte tekster og farger basert på mode.
 *
 * @example
 * ```html
 * <hvi-required-tag />
 * <hvi-required-tag mode="optional" />
 * <hvi-required-tag mode="all-required" />
 * ```
 */
@Component({
  selector: 'hvi-required-tag',
  standalone: true,
  imports: [HviTag],
  template: `
    <hvi-tag variant="default" size="sm" [color]="mode === 'optional' ? 'info' : 'warning'">
      @switch (mode) {
        @case ('all-required') {
          Alle felt må fylles ut
        }
        @case ('required') {
          Må fylles ut
        }
        @case ('optional') {
          Valgfritt
        }
      }
    </hvi-tag>
  `,
})
export class HviRequiredTag {
  /**
   * Bestemmer tekst og farge på taggen.
   * - `required` (default): "Må fylles ut" (warning)
   * - `optional`: "Valgfritt" (info)
   * - `all-required`: "Alle felt må fylles ut" (warning)
   */
  @Input() mode: 'all-required' | 'required' | 'optional' = 'required';
}
