import {
  booleanAttribute,
  computed,
  Directive,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { HviToggleGroup } from './toggle-group.component';

let nextId = 0;

/**
 * @summary
 * ToggleGroupItem is a button directive for use inside HviToggleGroup.
 *
 * @example
 * ```html
 * <hvi-toggle-group [(value)]="selected">
 *   <button hviToggleGroupItem value="option1">Option 1</button>
 *   <button hviToggleGroupItem value="option2">Option 2</button>
 * </hvi-toggle-group>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/toggle-group}
 */
@Directive({
  selector: 'button[hviToggleGroupItem]',
  standalone: true,
  host: {
    class: 'ds-button',
    type: 'button',
    role: 'radio',
    '[id]': 'id',
    '[attr.value]': 'value',
    '[attr.name]': 'group._name()',
    '[attr.aria-checked]': 'isSelected()',
    '[attr.aria-current]': 'isSelected()',
    '[attr.data-variant]': 'computedVariant()',
    '[attr.data-icon]': 'icon ? "" : null',
    '[attr.data-roving-tabindex-item]': '"true"',
    '[tabindex]': 'isSelected() ? 0 : -1',
    '(click)': 'onClick()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class HviToggleGroupItem implements OnInit, OnDestroy {
  readonly group = inject(HviToggleGroup);
  private readonly elementRef = inject(ElementRef<HTMLButtonElement>);

  /** Unique ID for this item */
  readonly id = `togglegroup-item-${++nextId}`;

  /** The value of this toggle item */
  @Input({ required: true }) value!: string;

  /** Toggle icon-only styling */
  @Input({ transform: booleanAttribute }) icon = false;

  /** Internal signal for tracking selection state */
  private readonly _isSelected = signal(false);

  /** Whether this item is currently selected */
  readonly isSelected = this._isSelected.asReadonly();

  /** Computed variant based on selection state */
  readonly computedVariant = computed(() => {
    return this._isSelected() ? this.group._variant() : 'tertiary';
  });

  ngOnInit(): void {
    this.group.registerItem(this);
  }

  ngOnDestroy(): void {
    this.group.unregisterItem(this);
  }

  /** Update the selected state (called by parent group) */
  setSelected(selected: boolean): void {
    this._isSelected.set(selected);
  }

  /** Focus this item's button element */
  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  protected onClick(): void {
    this.group.selectItem(this);
  }

  protected onKeydown(event: KeyboardEvent): void {
    this.group.handleKeydown(event, this);
  }
}
