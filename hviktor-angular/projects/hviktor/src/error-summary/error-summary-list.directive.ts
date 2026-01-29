import { Directive } from '@angular/core';

/**
 * Applies the correct class to the list of errors inside ErrorSummary.
 */
@Directive({
  selector: '[hviErrorSummaryList]',
  standalone: true,
  host: {
    class: 'ds-list',
  },
})
export class HviErrorSummaryListDirective {}
