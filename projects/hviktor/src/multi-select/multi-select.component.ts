import {
  afterNextRender,
  booleanAttribute,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostAttributeToken,
  inject,
  Input,
  Output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/** A single option for the multi-select component. */
export interface HviMultiSelectOption {
  label: string;
  value: string;
}

let nextId = 0;

/**
 * @summary
 * MultiSelect allows users to choose one or more options from a searchable dropdown list.
 * Selected items are displayed as comma-separated text, collapsing to a count when space is limited.
 *
 * @example
 * ```html
 * <hvi-multi-select
 *   [options]="[
 *     { label: 'Oslo', value: 'oslo' },
 *     { label: 'Bergen', value: 'bergen' },
 *     { label: 'Trondheim', value: 'trondheim' }
 *   ]"
 *   placeholder="Velg kommuner..."
 * />
 * ```
 *
 * @example
 * With reactive forms:
 * ```html
 * <hvi-multi-select
 *   [options]="options"
 *   [formControl]="myControl"
 *   placeholder="Velg..."
 * />
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/combobox/code}
 */
@Component({
  selector: 'hvi-multi-select',
  standalone: true,
  template: `
    <div
      class="ds-combobox__input__wrapper"
      #trigger
      (click)="onTriggerClick($event)"
      (keydown)="onTriggerKeydown($event)"
      [attr.tabindex]="_disabled ? -1 : 0"
      role="combobox"
      [attr.aria-expanded]="isOpen()"
      [attr.aria-controls]="isOpen() ? listboxId : null"
      [attr.aria-disabled]="_disabled ? 'true' : null"
      [attr.aria-label]="hostAriaLabel"
      aria-haspopup="listbox"
    >
      <div class="hvi-multi-select__display">
        @if (selectedOptions().length === 0) {
          <span class="ds-combobox__placeholder">{{ placeholder }}</span>
        } @else {
          <span class="hvi-multi-select__text" [title]="commaText()">{{ displayLabel() }}</span>
          <span class="hvi-multi-select__measure" #measure aria-hidden="true">{{
            commaText()
          }}</span>
        }
      </div>
      <span class="ds-combobox__arrow" [class.ds-combobox__arrow--open]="isOpen()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M5.47 9.47a.75.75 0 0 1 1.06 0L12 14.94l5.47-5.47a.75.75 0 1 1 1.06 1.06l-6 6a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1 0-1.06"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </div>
    @if (isOpen()) {
      <div class="ds-combobox__options-wrapper">
        <div class="hvi-multi-select__search">
          <input
            #searchInput
            type="search"
            class="ds-input"
            [attr.placeholder]="searchPlaceholder"
            [value]="searchText()"
            (input)="onSearchInput($event)"
            (keydown)="onSearchKeydown($event)"
          />
        </div>
        <div
          role="listbox"
          [id]="listboxId"
          aria-multiselectable="true"
          class="hvi-multi-select__listbox"
        >
          @for (option of filteredOptions(); track option.value) {
            <button
              type="button"
              class="ds-combobox__option ds-combobox__option--multiple"
              role="option"
              [attr.aria-selected]="isSelected(option.value)"
              (click)="toggleOption(option.value)"
            >
              <div
                class="ds-combobox__option__icon-wrapper"
                [class.ds-combobox__option__icon-wrapper--selected]="isSelected(option.value)"
              >
                @if (isSelected(option.value)) {
                  <svg
                    class="ds-combobox__option__icon-wrapper__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M20.03 5.97a.75.75 0 0 1 0 1.06l-11 11a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 1 1 1.06-1.06L8.5 16.44 18.97 5.97a.75.75 0 0 1 1.06 0"
                      clip-rule="evenodd"
                    />
                  </svg>
                }
              </div>
              <div class="ds-combobox__option__label">{{ option.label }}</div>
            </button>
          }
          @if (filteredOptions().length === 0) {
            <div class="ds-combobox__empty">Ingen treff</div>
          }
        </div>
      </div>
    }
  `,
  styles: `
    :host {
      position: relative;
      width: 100%;
      min-width: 0;
    }

    .ds-combobox__input__wrapper {
      border: var(--ds-border-width-default) solid var(--ds-color-neutral-border-default);
      background: var(--ds-color-neutral-surface-default);
      border-radius: var(--ds-border-radius-md);
      cursor: pointer;
      overflow: hidden;
      font-weight: normal;
    }

    .ds-combobox__input__wrapper:focus {
      box-shadow: 0 0 0 var(--ds-border-width-focus) var(--ds-color-focus-inner);
      outline: var(--ds-border-width-focus) solid var(--ds-color-focus-outer);
      outline-offset: var(--ds-border-width-focus);
    }

    @media (hover: hover) and (pointer: fine) {
      :host:not(.ds-combobox__disabled) .ds-combobox__input__wrapper:not(:focus):hover {
        outline-color: var(--ds-color-neutral-border-default);
        outline-style: solid;
        outline-width: var(--ds-border-width-default);
      }
    }

    .hvi-multi-select__display {
      overflow: hidden;
      min-width: 0;
      position: relative;
    }

    .hvi-multi-select__text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
    }

    .hvi-multi-select__measure {
      position: absolute;
      visibility: hidden;
      white-space: nowrap;
      pointer-events: none;
      height: 0;
      overflow: hidden;
    }

    .ds-combobox__options-wrapper {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      max-height: 300px;
      overflow: hidden;
    }

    .hvi-multi-select__listbox {
      display: flex;
      flex-direction: column;
      gap: 2px;
      overflow-y: auto;
      max-height: calc(300px - 3em);
      padding: 2px;
    }

    .ds-combobox__placeholder {
      color: var(--ds-color-neutral-text-default);
      user-select: none;
    }

    .ds-combobox__arrow {
      color: var(--ds-color-neutral-text-default);
      transition: transform 0.15s ease;
      flex-shrink: 0;
      font-size: 1.5em;
    }

    .ds-combobox__arrow--open {
      transform: rotate(180deg);
    }

    .ds-combobox__option:hover {
      outline-color: var(--ds-color-neutral-border-default);
      outline-style: solid;
      outline-width: var(--ds-border-width-default);
    }

    .ds-combobox__option[aria-selected='true'] {
      background: var(--ds-color-surface-hover);
    }

    .hvi-multi-select__search {
      padding-bottom: var(--ds-size-2);
    }

    .hvi-multi-select__search input {
      width: 100%;
      box-sizing: border-box;
    }
  `,
  host: {
    class: 'ds-combobox',
    '[class.ds-combobox--sm]': 'size === "sm"',
    '[class.ds-combobox--md]': 'size === "md"',
    '[class.ds-combobox--lg]': 'size === "lg"',
    '[class.ds-combobox__disabled]': '_disabled',
    '[attr.aria-label]': 'null',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HviMultiSelect),
      multi: true,
    },
  ],
})
export class HviMultiSelect implements ControlValueAccessor {
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  protected readonly hostAriaLabel = inject(new HostAttributeToken('aria-label'), {
    optional: true,
  });

  private readonly searchInputRef = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  private readonly triggerRef = viewChild<ElementRef<HTMLElement>>('trigger');
  private readonly measureRef = viewChild<ElementRef<HTMLElement>>('measure');

  /** Options to display in the dropdown. */
  @Input() options: HviMultiSelectOption[] = [];

  /** Placeholder text when no items are selected. */
  @Input() placeholder = 'Velg...';

  /** Placeholder text for the search input. */
  @Input() searchPlaceholder = 'Søk...';

  /** Size of the component. */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /** Event emitted when the selection changes. */
  @Output() selectionChange = new EventEmitter<string[]>();

  readonly listboxId = `hvi-multi-select-listbox-${++nextId}`;

  protected _disabled = false;

  /** Whether the component is disabled. */
  @Input({ transform: booleanAttribute })
  set disabled(value: boolean) {
    this._disabled = value;
    if (value) this.isOpen.set(false);
  }

  // --- Internal state ---
  readonly isOpen = signal(false);
  readonly searchText = signal('');
  private readonly selectedValues = signal(new Set<string>());

  readonly filteredOptions = computed(() => {
    const search = this.searchText().toLowerCase();
    if (!search) return this.options;
    return this.options.filter((o) => o.label.toLowerCase().includes(search));
  });

  readonly selectedOptions = computed(() => {
    const selected = this.selectedValues();
    return this.options.filter((o) => selected.has(o.value));
  });

  readonly commaText = computed(() =>
    this.selectedOptions()
      .map((o) => o.label)
      .join(', '),
  );

  private readonly showCount = signal(false);

  readonly displayLabel = computed(() => {
    const selected = this.selectedOptions();
    if (selected.length === 0) return '';
    if (this.showCount()) {
      return selected.length === 1 ? '1 element valgt' : `${selected.length} elementer valgt`;
    }
    return this.commaText();
  });

  // --- CVA ---
  private onChange: (value: string[]) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string[]): void {
    this.selectedValues.set(new Set(value ?? []));
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
    if (isDisabled) this.isOpen.set(false);
  }

  // --- Lifecycle ---
  constructor() {
    const onClickOutside = (event: MouseEvent) => {
      if (this.isOpen() && !this.elementRef.nativeElement.contains(event.target as Node)) {
        this.isOpen.set(false);
        this.searchText.set('');
        this.onTouched();
      }
    };

    afterNextRender(() => {
      document.addEventListener('click', onClickOutside);
      this.destroyRef.onDestroy(() => document.removeEventListener('click', onClickOutside));

      const ro = new ResizeObserver(() => this.checkOverflow());
      ro.observe(this.elementRef.nativeElement);
      this.destroyRef.onDestroy(() => ro.disconnect());
    });
  }

  // --- Event handlers ---
  onTriggerClick(event: Event): void {
    if (this._disabled) return;

    this.isOpen.update((open) => !open);
    if (this.isOpen()) {
      this.searchText.set('');
      this.focusSearch();
    }
  }

  onTriggerKeydown(event: KeyboardEvent): void {
    if (this._disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!this.isOpen()) {
        this.isOpen.set(true);
        this.searchText.set('');
        this.focusSearch();
      }
    }
    if (event.key === 'Escape' && this.isOpen()) {
      event.preventDefault();
      this.close();
    }
  }

  onSearchInput(event: Event): void {
    this.searchText.set((event.target as HTMLInputElement).value);
  }

  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }

  toggleOption(value: string): void {
    this.selectedValues.update((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
    this.emitChange();
    this.focusSearch();
  }

  isSelected(value: string): boolean {
    return this.selectedValues().has(value);
  }

  // --- Helpers ---
  private close(): void {
    this.isOpen.set(false);
    this.searchText.set('');
    this.onTouched();
    this.triggerRef()?.nativeElement.focus();
  }

  private focusSearch(): void {
    // Wait for the dropdown to render, then focus the search input
    queueMicrotask(() => this.searchInputRef()?.nativeElement.focus());
  }

  private emitChange(): void {
    const values = [...this.selectedValues()];
    this.selectionChange.emit(values);
    this.onChange(values);
    // Use setTimeout to run after Angular's change detection has updated the DOM
    setTimeout(() => this.checkOverflow());
  }

  private checkOverflow(): void {
    const el = this.measureRef()?.nativeElement;
    if (!el) {
      this.showCount.set(false);
      return;
    }
    this.showCount.set(el.scrollWidth > el.parentElement!.clientWidth);
  }
}
