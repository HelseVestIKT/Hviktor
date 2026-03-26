import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import '@digdir/designsystemet-web';

/**
 * @summary
 * Popover vises over andre elementer i grensesnittet og er koblet til et spesifikt element.
 * Den brukes til å vise tilleggsinformasjon, interaktive elementer eller korte forklaringer uten å navigere bort fra siden.
 *
 * @example
 * ```html
 * <button hviButton popovertarget="popover1">Open popover</button>
 * <hvi-popover id="popover1"> Popover content </hvi-popover>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/popover/code}
 */
@Component({
  selector: 'hvi-popover',
  standalone: true,
  template: '<ng-content />',
  host: {
    class: 'ds-popover',
    '[attr.popover]': 'type',
    '[attr.data-variant]': 'variant',
    '[attr.data-color]': 'color',
    '[attr.data-placement]': 'placement',
    '[attr.data-autoplacement]': 'autoPlacement ? "" : null',
  },
})
export class HviPopover {
  /** Popover type - 'manual' krever manuell lukking, 'auto' lukkes ved klikk utenfor */
  @Input() type: 'auto' | 'manual' | 'hint' = 'manual';

  /** Visuell variant */
  @Input() variant: 'default' | 'tinted' = 'default';

  /** Farge-tema */
  @Input() color: 'neutral' | 'danger' | 'info' | 'success' | 'warning' = 'neutral';

  /** Plassering av popover relativt til trigger */
  @Input() placement: 'top' | 'right' | 'bottom' | 'left' = 'top';

  /** Aktiver automatisk repositjonering hvis det ikke er plass */
  @Input() autoPlacement = true;

  /** Event når popover åpnes */
  @Output() opened = new EventEmitter<void>();

  /** Event når popover lukkes */
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
