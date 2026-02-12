import { booleanAttribute, Directive, HostListener, Input } from '@angular/core';

/**
 * @summary
 * Select allows users to choose an option from a list.
 *
 * @example
 * ```html
 * <select hviSelect width="auto" id="select">
 *  <option value="" disabled="" selected="">Select an option</option>
 *  <option value="option1">Option 1</option>
 *  <option value="option2">Option 2</option>
 * </select>
 * ```
 *
 * Documentation: https://designsystemet.no/en/components/docs/select/code
 */

@Directive({
  selector: 'select[hviSelect]',
  standalone: true,
  host: {
    class: 'ds-select ds-input',
    '[attr.data-width]': 'width',
    '[attr.readonly]': '_readOnly ? "" : null',
    '[attr.disabled]': '_disabled ? "" : null',
  },
})
export class HviSelect {
  /** Defines the width of Select, where "auto" matches the content width. */
  @Input() width?: 'full' | 'auto';

  protected _readOnly = false;
  protected _disabled = false;

  /** Disabled Select. */
  @Input({ transform: booleanAttribute })
  set disabled(value: boolean) {
    this._disabled = value;
  }
  get disabled(): boolean {
    return this._disabled;
  }

  /** Readonly Select. */
  @Input({ transform: booleanAttribute })
  set readOnly(value: boolean) {
    this._readOnly = value;
  }
  get readOnly(): boolean {
    return this._readOnly;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    if (this._readOnly) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  @HostListener('change', ['$event'])
  onChange(event: Event): void {
    if (this._readOnly) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this._readOnly) return;

    if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
