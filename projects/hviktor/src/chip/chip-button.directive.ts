import { booleanAttribute, Directive, Input } from '@angular/core';

/**
 * @summary Button chip directive for interactive chip elements.
 * Supports a removable variant that adds a close icon via `data-removable`.
 *
 * @example Basic button chip
 * ```html
 * <button hviChip>Clear all filters</button>
 * ```
 *
 * @example Removable chip
 * ```html
 * <button hviChip removable aria-label="Remove Norway">Norway</button>
 * ```
 *
 * @see {@link https://designsystemet.no/komponenter/chip}
 */
@Directive({
  selector: 'button[hviChip]',
  standalone: true,
  host: {
    class: 'ds-chip',
    '[attr.data-removable]': 'removable ? "true" : null',
  },
})
export class HviChipButton {
  /** Whether the chip is removable, adding a close icon. */
  @Input({ transform: booleanAttribute }) removable = false;
}
