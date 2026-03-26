import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import '@digdir/designsystemet-web';
import '@u-elements/u-combobox';
import '@u-elements/u-datalist';

/**
 * @summary
 * Suggestion component description.
 *
 * @example
 * ```html
 * <hvi-suggestion></hvi-suggestion>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/suggestion/code}
 */

@Component({
  selector: 'hvi-suggestion',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  template: `
    <ds-suggestion
      class="ds-suggestion"
      [attr.data-multiple]="multiple || undefined"
      [attr.data-floating]="floating"
      [attr.data-empty]="empty"
    >
      <ng-content />
    </ds-suggestion>
  `,
  host: {},
})
export class HviSuggestion {
  /** Mulighet for flervalg fra suggestion */
  @Input() multiple = false;

  @Input() overscroll: 'contain' = 'contain';

  @Input() floating: 'top' | 'right' | 'bottom' | 'left' = 'bottom';

  @Input() empty: 'Ingen valgte' | 'No selected' = 'Ingen valgte';

  /**
   * Model for the selected item(s).
   *
   * @default undefined
   */
  // selected = model<SuggestionItem | SuggestionItem[] | undefined>(undefined)

  // protected selectedArray = computed(() => sanitizeItems(this.selected()))

  // protected onSelect(event: Event) {
  //   const customEvent = event as CustomEvent<HTMLDataElement | undefined>
  //   customEvent.preventDefault()

  //   const data = customEvent.detail
  //   if (!data) return

  //   this.selected.set(nextSelected(data, this.selected(), this.multiple()))
  // }
}
