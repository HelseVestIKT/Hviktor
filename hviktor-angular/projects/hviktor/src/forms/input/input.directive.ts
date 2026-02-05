import { booleanAttribute, Directive, HostListener, Input } from '@angular/core';

type HviAriaRole = 'switch' | 'button' | 'checkbox' | 'radio' | 'textbox' | 'searchbox' | string;

@Directive({
  selector: 'input[hviInput]',
  standalone: true,
  host: {
    class: 'ds-input',
    '[attr.type]': 'type ?? null',
    '[attr.size]': 'size ?? null',
    '[attr.disabled]': '_disabled ? "" : null',
    '[attr.readonly]': '_readOnly ? "" : null',
    '[attr.role]': 'role ?? null',
  },
})
export class HviInput {
  @Input() type?:
    | 'number'
    | 'hidden'
    | 'color'
    | 'checkbox'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'month'
    | 'password'
    | 'radio'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';

  @Input() size?: number;

  /** Set role, e.g. `switch` when `checkbox` or `radio` */
  @Input() role?: HviAriaRole;

  protected _disabled = false;
  protected _readOnly = false;

  @Input({ transform: booleanAttribute })
  set disabled(value: boolean) {
    this._disabled = value;
  }
  get disabled(): boolean {
    return this._disabled;
  }

  @Input({ transform: booleanAttribute })
  set readOnly(value: boolean) {
    this._readOnly = value;
  }
  get readOnly(): boolean {
    return this._readOnly;
  }

  @Input({ transform: booleanAttribute })
  set readonly(value: boolean) {
    this._readOnly = value;
  }

  private get isToggle(): boolean {
    return this.type === 'checkbox' || this.type === 'radio';
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (this._readOnly && this.isToggle) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  @HostListener('change', ['$event'])
  onChange(event: Event): void {
    if (this._readOnly && this.isToggle) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this._readOnly || !this.isToggle) return;

    if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
