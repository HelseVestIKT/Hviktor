import {
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  QueryList,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { HviToggleGroupItem } from './toggle-group-item.directive';

let nextGroupId = 0;

/**
 * @summary
 * ToggleGroup collects related options. The component consists of a group of
 * buttons that are connected, where only one button can be selected at a time.
 *
 * @example
 * ```html
 * <hvi-toggle-group [(value)]="selected" variant="primary">
 *   <button hviToggleGroupItem value="innboks">Innboks</button>
 *   <button hviToggleGroupItem value="utkast">Utkast</button>
 *   <button hviToggleGroupItem value="sendt">Sendt</button>
 * </hvi-toggle-group>
 * ```
 *
 * @example
 * With reactive forms:
 * ```html
 * <hvi-toggle-group formControlName="view" variant="secondary">
 *   <button hviToggleGroupItem value="list">Liste</button>
 *   <button hviToggleGroupItem value="grid">Rutenett</button>
 * </hvi-toggle-group>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/toggle-group}
 */
@Component({
  selector: 'hvi-toggle-group',
  standalone: true,
  template: '<ng-content />',
  host: {
    class: 'ds-toggle-group',
    role: 'radiogroup',
    '[attr.data-variant]': '_variant()',
    '[tabindex]': '0',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HviToggleGroup),
      multi: true,
    },
  ],
})
export class HviToggleGroup implements ControlValueAccessor {
  @ContentChildren(forwardRef(() => HviToggleGroupItemToken) as never)
  private items!: QueryList<HviToggleGroupItem>;

  private readonly registeredItems: HviToggleGroupItem[] = [];

  /** The variant of the toggle group */
  readonly _variant = signal<'primary' | 'secondary'>('primary');

  /** Form element name */
  readonly _name = signal(`togglegroup-name-${++nextGroupId}`);

  /** The currently selected value */
  private readonly _value = signal<string | undefined>(undefined);

  /** Event emitted when value changes */
  @Output() valueChange = new EventEmitter<string>();

  // ControlValueAccessor callbacks
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  @Input()
  set value(val: string | undefined) {
    this._value.set(val);
    this.updateItemStates();
  }

  @Input()
  set variant(val: 'primary' | 'secondary') {
    this._variant.set(val);
  }

  @Input()
  set name(val: string) {
    if (val) this._name.set(val);
  }

  /** Register an item with this group */
  registerItem(item: HviToggleGroupItem): void {
    this.registeredItems.push(item);
    // Update state if this item matches current value
    if (this._value() === item.value) {
      item.setSelected(true);
    }
  }

  /** Unregister an item from this group */
  unregisterItem(item: HviToggleGroupItem): void {
    const index = this.registeredItems.indexOf(item);
    if (index > -1) {
      this.registeredItems.splice(index, 1);
    }
  }

  /** Select an item and update all states */
  selectItem(item: HviToggleGroupItem): void {
    this._value.set(item.value);
    this.updateItemStates();
    this.valueChange.emit(item.value);
    this.onChange(item.value);
    this.onTouched();
  }

  /** Handle keyboard navigation (roving tabindex) */
  handleKeydown(event: KeyboardEvent, currentItem: HviToggleGroupItem): void {
    const items = this.registeredItems;
    const currentIndex = items.indexOf(currentItem);

    let nextIndex: number | null = null;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (currentIndex + 1) % items.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (currentIndex - 1 + items.length) % items.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = items.length - 1;
        break;
      case ' ':
      case 'Enter':
        this.selectItem(currentItem);
        event.preventDefault();
        return;
      default:
        return;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      const nextItem = items[nextIndex];
      nextItem.focus();
      this.selectItem(nextItem);
    }
  }

  private updateItemStates(): void {
    const currentValue = this._value();
    for (const item of this.registeredItems) {
      item.setSelected(item.value === currentValue);
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this._value.set(value);
    this.updateItemStates();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}

// Token for forward reference to avoid circular dependency
export const HviToggleGroupItemToken = Symbol('HviToggleGroupItem');
