import { Component } from '@angular/core';

/**
 * @summary
 * Popover component description.
 *
 * @example
 * ```html
 * <hvi-popover></hvi-popover>
 * ```
 *
 * Documentation: https://designsystemet.no/en/components/docs/popover/code
 */

@Component({
  selector: 'hvi-popover',
  standalone: true,
  template: '<ng-content />',
  host: {},
})
export class HviPopover {}
