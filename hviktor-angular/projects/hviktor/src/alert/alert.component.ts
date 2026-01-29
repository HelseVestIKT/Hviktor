import { Component, Input } from '@angular/core';

/**
 * Alert provides users with information that is especially important for them to see and understand.
 * The component is designed to capture users' attention.
 * The text in the alert should be short and clear.
 *
 * @example
 * ```html
 * <hvi-alert color="warning">
 *  Dette er et advarselsvarsel!
 * </hvi-alert>
 * ```
 *
 * Documentation: https://designsystemet.no/en/components/docs/alert/code/
 */
@Component({
  selector: 'hvi-alert',
  standalone: true,
  template: `<ng-content />`,
  host: {
    class: 'ds-alert',
    '[attr.data-color]': 'color',
  },
})
export class HviAlert {
  /** Sets the type of alert by changing the color and  */
  @Input() color?: 'info' | 'success' | 'warning' | 'danger';
}
