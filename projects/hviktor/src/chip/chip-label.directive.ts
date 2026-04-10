import { Directive } from '@angular/core';

/**
 * @summary Label chip directive for radio and checkbox chip variants.
 * Wraps a native `<label>` element containing a radio or checkbox `<input>`
 * to create a selectable chip.
 *
 * @example Radio chip
 * ```html
 * <label hviChip>
 *   <input hviInput type="radio" name="language" value="nynorsk" />
 *   Nynorsk
 * </label>
 * ```
 *
 * @example Checkbox chip
 * ```html
 * <label hviChip>
 *   <input hviInput type="checkbox" />
 *   Nynorsk
 * </label>
 * ```
 *
 * @see {@link https://designsystemet.no/komponenter/chip}
 */
@Directive({
  selector: 'label[hviChip]',
  standalone: true,
  host: {
    class: 'ds-chip',
  },
})
export class HviChipLabel {}
