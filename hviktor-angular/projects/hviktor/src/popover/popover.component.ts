import { Component, Input } from '@angular/core';

/**
 * @summary
 * Popover component description.
 *
 * @example
 * ```html
 * <hvi-popover id="popoverId">Popovercontent</hvi-popover>
 * <button hviButton popovertarget="popoverId">Open popover</button>
 * ```
 *
 * Documentation: https://designsystemet.no/en/components/docs/popover/code
 */

@Component({
  selector: 'hvi-popover',
  standalone: true,
  template: '<ng-content />',
  host: {
    class: 'ds-popover',
    '[attr.popover]': 'type',
  },
})
export class HviPopover {
  @Input() type: 'auto' | 'manual' | 'hint' = 'manual';
  @Input() variant: 'default' | 'tinted' = 'default';
  @Input() placement: 'top' | 'right' | 'bottom' | 'left' = 'top';
  @Input() autoPlacement: boolean = true;
}
