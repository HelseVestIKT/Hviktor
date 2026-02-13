import { Component } from '@angular/core';

/**
 * @summary
 * Search allows users to quickly find relevant content on a website or in an application.
 * The component consists of a search field, with or without a search button.
 *
 * @example
 * ```html
 * <hvi-search>
 *   <input hviInput type="search" placeholder="" aria-label="Søk" />
 *   <button hviSearchClear aria-label="Tøm"></button>
 *   <button hviButton type="submit">Søk</button>
 * </hvi-search>
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
