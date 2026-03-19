import { Component, Input } from '@angular/core';
import { HviTag } from '../tag';

/** Tilgjengelige modes for RequiredTag. */
export type RequiredTagMode = 'all-required' | 'required' | 'optional';

/**
 * RequiredTag brukes sammen med labels i skjema for å indikere om et felt er
 * påkrevd, valgfritt, eller om alle felt må fylles ut.
 *
 * Komponenten wrapper `HviTag` med forhåndsdefinerte tekster og farger basert på mode.
 * Bruker `display: contents` slik at den fungerer inline i `<label>` og frittstående.
 *
 * Kan brukes manuelt, eller automatisk via `HviForm` som analyserer FormGroup
 * og lar child-komponenter som `HviTextfield` vise riktig tag.
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
  host: {
    style: 'display: contents',
  },
})
export class HviRequiredTag {
  /**
   * Bestemmer tekst og farge på taggen.
   * - `required` (default): "Må fylles ut" (warning)
   * - `optional`: "Valgfritt" (info)
   * - `all-required`: "Alle felt må fylles ut" (warning)
   */
  @Input() mode: RequiredTagMode = 'required';
}
