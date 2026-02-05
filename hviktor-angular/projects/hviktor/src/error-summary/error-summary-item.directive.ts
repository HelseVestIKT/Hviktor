import { Directive } from '@angular/core';

/**
 * Marks a list item as part of the ErrorSummary list.
 */
@Directive({
  selector: '[hviErrorSummaryItem]',
  standalone: true,
})
export class HviErrorSummaryItemDirective {}
