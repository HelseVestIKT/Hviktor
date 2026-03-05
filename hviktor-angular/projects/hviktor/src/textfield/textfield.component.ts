import { booleanAttribute, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HviFieldAffix } from '../forms/field/field-affix.component';
import { HviFieldAffixes } from '../forms/field/field-affixes.component';
import { HviFieldCounter } from '../forms/field/field-counter.component';
import { HviFieldDescription } from '../forms/field/field-description.directive';
import { HviFieldValidation } from '../forms/field/field-validation.directive';
import { HviField } from '../forms/field/field.component';
import { HviInput } from '../forms/input/input.directive';
import { HviLabel } from '../label/label.directive';
import { HviTag } from '../tag/tag.component';

let nextId = 0;

/**
 * Textfield gir brukere muligheten til å skrive fritekst eller tall.
 *
 * Dette er en sammensatt komponent som bruker Field, Input/Textarea og Label under panseret.
 * Bruk `multiline` for å bytte mellom input og textarea.
 *
 * @example
 * ```html
 * <hvi-textfield label="Navn"></hvi-textfield>
 * ```
 *
 * @example
 * ```html
 * <hvi-textfield label="Beskrivelse" [multiline]="true" [rows]="4"></hvi-textfield>
 * ```
 *
 * @example
 * ```html
 * <hvi-textfield label="Pris" prefix="NOK" suffix="pr. mnd"></hvi-textfield>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/textfield/code}
 */
@Component({
  selector: 'hvi-textfield',
  standalone: true,
  imports: [
    HviField,
    HviLabel,
    HviInput,
    HviFieldAffixes,
    HviFieldAffix,
    HviFieldCounter,
    HviFieldDescription,
    HviFieldValidation,
    HviTag,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HviTextfield),
      multi: true,
    },
  ],
  template: `
    <hvi-field>
      <label hviLabel [attr.for]="inputId" weight="medium">
        {{ label }}
        @if (requiredLabel) {
          <hvi-tag
            variant="default"
            color="warning"
            style="margin-inline-start: var(--ds-size-2)"
            >{{ requiredLabel }}</hvi-tag
          >
        }
      </label>
      @if (description) {
        <span hviFieldDescription>{{ description }}</span>
      }
      <hvi-field-affixes>
        @if (prefix) {
          <hvi-field-affix>{{ prefix }}</hvi-field-affix>
        }
        @if (multiline) {
          <textarea
            hviInput
            [id]="inputId"
            [attr.name]="name ?? null"
            [attr.rows]="rows ?? null"
            [attr.placeholder]="placeholder ?? null"
            [disabled]="_disabled"
            [readOnly]="_readOnly"
            [attr.maxlength]="maxLength ?? null"
            [attr.aria-invalid]="error ? 'true' : null"
            [attr.required]="_required ? '' : null"
            [attr.autocomplete]="autocomplete ?? null"
            [value]="_value"
            (input)="_handleInput($event)"
            (blur)="_onTouched()"
          ></textarea>
        } @else {
          <input
            hviInput
            [id]="inputId"
            [type]="type"
            [attr.name]="name ?? null"
            [attr.size]="size ?? null"
            [attr.placeholder]="placeholder ?? null"
            [disabled]="_disabled"
            [readOnly]="_readOnly"
            [attr.maxlength]="maxLength ?? null"
            [attr.aria-invalid]="error ? 'true' : null"
            [attr.required]="_required ? '' : null"
            [attr.autocomplete]="autocomplete ?? null"
            [value]="_value"
            (input)="_handleInput($event)"
            (blur)="_onTouched()"
          />
        }
        @if (suffix) {
          <hvi-field-affix>{{ suffix }}</hvi-field-affix>
        }
      </hvi-field-affixes>
      @if (counterLimit) {
        <hvi-field-counter [limit]="counterLimit" />
      }
      @if (error) {
        <span hviFieldValidation>{{ error }}</span>
      }
    </hvi-field>
  `,
})
export class HviTextfield implements ControlValueAccessor {
  /** Label for the textfield */
  @Input() label!: string;

  /** Description text below the label */
  @Input() description?: string;

  /** Prefix text displayed before the input */
  @Input() prefix?: string;

  /** Suffix text displayed after the input */
  @Input() suffix?: string;

  /** Error message for the field */
  @Input() error?: string;

  /** Character counter limit. Displays a counter below the field. */
  @Input() counterLimit?: number;

  /**
   * Label text shown in a warning Tag next to the label when the field is required.
   * E.g. "Må fylles ut". Also sets the `required` attribute on the input.
   */
  @Input() requiredLabel?: string;

  /** Autocomplete attribute for the input, e.g. 'given-name', 'email'. */
  @Input() autocomplete?: string;

  /** Render a textarea instead of input for multiline support */
  @Input({ transform: booleanAttribute }) multiline = false;

  /** Supported input types */
  @Input() type:
    | 'number'
    | 'hidden'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'month'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week' = 'text';

  /** Number of rows for textarea (multiline mode) */
  @Input() rows?: number;

  /** Width of input in character count */
  @Input() size?: number;

  /** Placeholder text */
  @Input() placeholder?: string;

  /** Name attribute for the input */
  @Input() name?: string;

  /** Id attribute for the input. Auto-generated if not provided. */
  @Input() id?: string;

  /** Max length attribute for the input */
  @Input() maxLength?: number;

  /** Initial value for the input */
  @Input()
  set value(v: string) {
    this._value = v ?? '';
  }

  _value = '';
  _disabled = false;
  _readOnly = false;
  _required = false;

  @Input({ transform: booleanAttribute })
  set required(value: boolean) {
    this._required = value;
  }

  @Input({ transform: booleanAttribute })
  set disabled(value: boolean) {
    this._disabled = value;
  }

  @Input({ transform: booleanAttribute })
  set readOnly(value: boolean) {
    this._readOnly = value;
  }

  private readonly _uniqueId = nextId++;
  private _onChange: (value: string) => void = () => {};
  _onTouched: () => void = () => {};

  get inputId(): string {
    return this.id ?? `hvi-textfield-${this._uniqueId}`;
  }

  _handleInput(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this._value = target.value;
    this._onChange(this._value);
  }

  // ControlValueAccessor
  writeValue(value: string): void {
    this._value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }
}
