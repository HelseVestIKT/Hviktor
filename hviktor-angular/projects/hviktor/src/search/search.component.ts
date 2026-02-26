import { Component } from '@angular/core';

/**
 * @summary
 * Search allows users to quickly find relevant content on a website or in an application.
 * The component consists of a search field, with or without a search button.
 *
 * Use `hviInput` with `type="search"` for the input field.
 * Use `hviSearchClear` for the clear button.
 * Use `hviButton` for the submit button.
 *
 * Important: Add an empty `placeholder=""` on the input if you have a clear button.
 *
 * @example
 * Basic search with clear and submit button:
 * ```html
 * <hvi-search>
 *   <input hviInput type="search" placeholder="" aria-label="Søk" />
 *   <button hviSearchClear type="reset" aria-label="Tøm"></button>
 *   <button hviButton variant="primary" type="submit">Søk</button>
 * </hvi-search>
 * ```
 *
 * @example
 * Search without submit button:
 * ```html
 * <hvi-search>
 *   <input hviInput type="search" placeholder="" aria-label="Søk" />
 *   <button hviSearchClear type="reset" aria-label="Tøm"></button>
 * </hvi-search>
 * ```
 *
 * @example
 * Search with label using hvi-field:
 * ```html
 * <hvi-field>
 *   <label hviLabel>Søk etter katter</label>
 *   <hvi-search>
 *     <input hviInput type="search" placeholder="" name="cat-search" />
 *     <button hviSearchClear type="reset" aria-label="Tøm"></button>
 *     <button hviButton variant="primary" type="submit">Søk</button>
 *   </hvi-search>
 * </hvi-field>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/search}
 */
@Component({
  selector: 'hvi-search',
  standalone: true,
  template: '<ng-content />',
  host: {
    class: 'ds-search',
  },
})
export class HviSearch {}
