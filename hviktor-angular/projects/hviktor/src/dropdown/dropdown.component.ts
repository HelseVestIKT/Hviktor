import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import '@digdir/designsystemet-web';

/**
 * @summary
 * Dropdown er en generisk nedtrekksliste. Den legger grunnmuren for å bygge menyer og lister.
 *
 * @example
 * ```html
 * <button hviButton popovertarget="myDropdown">Åpne dropdown</button>
 * <hvi-dropdown id="myDropdown">
 *  <ul>
 *    <li>
 *     <button hviButton variant="tertiary">Menylenke</button>
 *   </li>
 *   <li>
 *    <button hviButton variant="tertiary">Menylenke</button>
 *  </li>
 * </ul>
 * </hvi-dropdown>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/dropdown/code}
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
    '[attr.data-autoplacement]': 'autoPlacement ? "" : null',
  },
})
export class HviDropdown {
  /** ID to target the popover */
  @Input() id?: string;

  /** Popover type - 'auto' lukkes ved klikk utenfor, 'manual' krever manuell lukking */
  @Input() type: 'auto' | 'manual' = 'auto';

  /** Variant */
  @Input() variant?: 'default' | 'tertiary';

  /** Plassering av dropdown relativt til trigger */
  @Input() dropdownPlacement: 'top' | 'right' | 'bottom' | 'left' = 'bottom';

  /** Aktiver automatisk repositjonering hvis det ikke er plass */
  @Input() autoPlacement = true;

  /** Event når dropdown åpnes */
  @Output() opened = new EventEmitter<void>();

  /** Event når dropdown lukkes */
  @Output() closed = new EventEmitter<void>();

  @HostListener('toggle', ['$event'])
  onToggle(event: ToggleEvent) {
    if (event.newState === 'open') {
      this.opened.emit();
    } else {
      this.closed.emit();
    }
  }
}
