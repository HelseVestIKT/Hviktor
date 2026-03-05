import { Component } from '@angular/core';

/**
 * @summary
 * Logo component description.
 *
 * @example
 * ```html
 * <hvi-logo></hvi-logo>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/logo/code}
 */

@Component({
  selector: 'hvi-logo',
  standalone: true,
  template: '<ng-content />',
  host: {},
})
export class HviLogo {}
