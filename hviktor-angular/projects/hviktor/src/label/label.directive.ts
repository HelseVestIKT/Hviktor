import { Directive, Input } from '@angular/core';

/**
 * Label functions as a clear and accessible text label that tells the user what an associated form element is about.
 *
 * @example
 * ```html
 * <label hviLabel weight="semibold">Name</label>
 * ```
 *
 * Documentation: https://designsystemet.no/en/components/docs/label/overview
 */
@Directive({
  selector: 'label[hviLabel], legend[hviLabel]',
  standalone: true,
  host: {
    class: 'ds-label',
    '[attr.data-weight]': 'weight ?? null',
  },
})
export class HviLabel {
  /** The font weight of the label */
  @Input() weight?: 'regular' | 'medium' | 'semibold';
}
