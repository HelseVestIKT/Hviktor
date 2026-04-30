import { Component, EventEmitter, Input, Output } from '@angular/core';
import '@digdir/designsystemet-web';

/**
 * @summary Renders a Designsystemet dropdown popover container for grouped actions or navigation links.
 *
 * @example Basic dropdown connected with popovertarget
 * ```html
 * <button hviButton popovertarget="myDropdown">Open dropdown</button>
 * <hvi-dropdown id="myDropdown">
 *  <ul>
 *    <li>
 *     <button hviButton variant="tertiary">Menu item</button>
 *   </li>
 *   <li>
 *    <button hviButton variant="tertiary">Menu item</button>
 *  </li>
 * </ul>
 * </hvi-dropdown>
 * ```
 *
 * @example Dropdown with explicit floating placement and overscroll behavior
 * ```html
 * <hvi-dropdown
 *   id="myDropdown"
 *   dropdownPlacement="top"
 *   floating="top"
 *   overscroll="contain"
 * >
 *   <ul>
 *     <li><button hviButton variant="tertiary">Menu item</button></li>
 *   </ul>
 * </hvi-dropdown>
 * ```
 *
 * @see {@link https://designsystemet.no/komponenter/dropdown}
 */

@Component({
  selector: 'hvi-dropdown',
  standalone: true,
  template: '<ng-content />',
  host: {
    class: 'ds-popover ds-dropdown',
    '[id]': 'id',
    '[attr.popover]': 'type',
    '[attr.data-variant]': 'variant',
    '[attr.data-placement]': 'dropdownPlacement',
    '[attr.data-floating]': 'floating',
    '[attr.data-overscroll]': 'overscroll',
    '[attr.data-autoplacement]': 'autoPlacement ? "" : null',
    '(toggle)': 'onToggle($event)',
  },
})
export class HviDropdown {
  /** Sets the element id used by a trigger with popovertarget. */
  @Input() id?: string;

  /** Sets the popover mode. Use manual when close behavior is handled explicitly. */
  @Input() type: 'auto' | 'manual' = 'auto';

  /** Sets the dropdown visual variant. */
  @Input() variant?: 'default' | 'tertiary';

  /** Sets preferred dropdown placement relative to the trigger element. */
  @Input() dropdownPlacement: 'top' | 'right' | 'bottom' | 'left' = 'bottom';

  /** Sets the floating side used by the Designsystemet floating-ui integration. */
  @Input() floating?: 'top' | 'right' | 'bottom' | 'left';

  /** Sets overscroll strategy for the dropdown container. */
  @Input() overscroll?: 'contain';

  /** Enables automatic repositioning when there is not enough space. */
  @Input() autoPlacement = true;

  /** Emits when the dropdown is opened. */
  @Output() opened = new EventEmitter<void>();

  /** Emits when the dropdown is closed. */
  @Output() closed = new EventEmitter<void>();

  onToggle(event: ToggleEvent) {
    if (event.newState === 'open') {
      this.opened.emit();
    } else {
      this.closed.emit();
    }
  }
}
