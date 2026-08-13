import {
  booleanAttribute,
  Component,
  computed,
  forwardRef,
  inject,
  input,
  model,
  numberAttribute,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HviFieldAffix } from '../forms/field/field-affix.component';
import { HviFieldAffixes } from '../forms/field/field-affixes.component';
import { HviFieldCounter } from '../forms/field/field-counter.component';
import { HviFieldDescription } from '../forms/field/field-description.directive';
import { HviFieldValidation } from '../forms/field/field-validation.directive';
import { HviField } from '../forms/field/field.component';
import { HviForm } from '../forms/form/form.directive';
import { HviInput } from '../forms/input/input.directive';
import { HviLabel } from '../label/label.directive';
import { HviRequiredTag, RequiredTagMode } from '../required-tag/required-tag.component';

export type HviTextfieldType =
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
  | 'week';

let nextId = 0;

/**
 * Textfield gir brukere muligheten til å skrive fritekst eller tall.
 *
 * Dette er en sammensatt komponent som bruker Field, Input/Textarea og Label under panseret.
 * Bruk `multiline` for å bytte mellom input og textarea.
 *
 * Komponenten er signalbasert og fungerer derfor også i soneløse applikasjoner
 * og sammen med signalbaserte skjemaer.
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
  styles: [':host { display: block; }'],
  imports: [
    HviField,
    HviLabel,
    HviInput,
    HviFieldAffixes,
    HviFieldAffix,
    HviFieldCounter,
    HviFieldDescription,
    HviFieldValidation,
    HviRequiredTag,
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
      <label hviLabel [attr.for]="inputId()">
        {{ label() }}
        @if (effectiveRequiredMode(); as mode) {
          <hvi-required-tag [mode]="mode" />
        }
      </label>
      @if (description()) {
        <span hviFieldDescription>{{ description() }}</span>
      }
      <hvi-field-affixes>
        @if (prefix()) {
          <hvi-field-affix>{{ prefix() }}</hvi-field-affix>
        }
        @if (multiline()) {
          <textarea
            hviInput
            [id]="inputId()"
            [attr.name]="name() ?? null"
            [attr.rows]="rows() ?? null"
            [attr.placeholder]="placeholder() ?? null"
            [disabled]="disabled()"
            [readOnly]="readOnly()"
            [attr.maxlength]="maxLength() ?? null"
            [attr.aria-invalid]="error() ? 'true' : null"
            [attr.required]="required() ? '' : null"
            [attr.autocomplete]="autocomplete() ?? null"
            [value]="value()"
            (input)="handleInput($event)"
            (blur)="onTouched()"
          ></textarea>
        } @else {
          <input
            hviInput
            [id]="inputId()"
            [type]="type()"
            [attr.name]="name() ?? null"
            [attr.size]="size() ?? null"
            [attr.placeholder]="placeholder() ?? null"
            [disabled]="disabled()"
            [readOnly]="readOnly()"
            [attr.maxlength]="maxLength() ?? null"
            [attr.aria-invalid]="error() ? 'true' : null"
            [attr.required]="required() ? '' : null"
            [attr.autocomplete]="autocomplete() ?? null"
            [value]="value()"
            (input)="handleInput($event)"
            (blur)="onTouched()"
          />
        }
        @if (suffix()) {
          <hvi-field-affix>{{ suffix() }}</hvi-field-affix>
        }
      </hvi-field-affixes>
      @if (counterLimit(); as limit) {
        <hvi-field-counter [limit]="limit" />
      }
      @if (error()) {
        <p hviFieldValidation>{{ error() }}</p>
      }
    </hvi-field>
  `,
})
export class HviTextfield implements ControlValueAccessor {
  /** Ledetekst for feltet. */
  readonly label = input<string>('');

  /** Hjelpetekst under ledeteksten. */
  readonly description = input<string>();

  /** Dekorativ tekst foran inputfeltet. Leses ikke av skjermlesere. */
  readonly prefix = input<string>();

  /** Dekorativ tekst etter inputfeltet. Leses ikke av skjermlesere. */
  readonly suffix = input<string>();

  /** Feilmelding for feltet. */
  readonly error = input<string>();

  /** Tegngrense. Viser en teller under feltet. */
  readonly counterLimit = input<number | undefined>(undefined, { transform: numberAttribute });

  /** Input-typen for feltet. */
  readonly type = input<HviTextfieldType>('text');

  /**
   * Manuell overstyring av required-tag-mode.
   * Når satt, vises taggen uavhengig av HviForm-kontekst.
   * - `'required'`: "Må fylles ut" (warning)
   * - `'optional'`: "Valgfritt" (info)
   *
   * Når IKKE satt og feltet er inne i en `<form hviForm>`, bestemmes mode automatisk:
   * - Form er `'all-required'` → ingen tag per felt (vis `all-required` øverst i form)
   * - Form er `'mixed'` → `'required'` hvis feltet er required, `'optional'` hvis ikke
   * - Form er `'none'` → ingen tag
   */
  readonly requiredMode = input<RequiredTagMode>();

  /** Autocomplete-attributt for inputfeltet, f.eks. 'given-name' eller 'email'. */
  readonly autocomplete = input<string>();

  /** Render en textarea i stedet for input, for flerlinjet tekst. */
  readonly multiline = input(false, { transform: booleanAttribute });

  /** Antall rader i textarea. */
  readonly rows = input<number | undefined>(undefined, { transform: numberAttribute });

  /** Bredden på inputfeltet målt i antall tegn. */
  readonly size = input<number | undefined>(undefined, { transform: numberAttribute });

  /** Plassholdertekst. Unngå å bruke dette i stedet for ledetekst. */
  readonly placeholder = input<string>();

  /** `name`-attributt på inputfeltet. */
  readonly name = input<string>();

  /** `id` på inputfeltet. Genereres automatisk hvis den ikke settes. */
  readonly id = input<string>();

  /** Maks antall tegn. */
  readonly maxLength = input<number | undefined>(undefined, { transform: numberAttribute });

  /** Verdien i feltet. Toveisbinding, og settes også av `ngModel`/`formControlName`. */
  readonly value = model<string>('');

  /** Marker feltet som påkrevd. */
  readonly required = input(false, { transform: booleanAttribute });

  /** Deaktiverer feltet. Settes også av `formControlName`. */
  readonly disabled = model(false);

  /** Gjør feltet skrivebeskyttet. Foretrekkes framfor `disabled`. */
  readonly readOnly = model(false);

  /** Injisert HviForm for automatisk required-tag-beregning. */
  private readonly hviForm = inject(HviForm, { optional: true });

  private readonly uniqueId = nextId++;

  readonly inputId = computed(() => this.id() ?? `hvi-textfield-${this.uniqueId}`);

  /**
   * Beregnet required-tag-mode basert på manuell overstyring eller HviForm-kontekst.
   * Er `null` når ingen tag skal vises.
   */
  readonly effectiveRequiredMode = computed<RequiredTagMode | null>(() => {
    // Manuell overstyring vinner alltid
    const override = this.requiredMode();
    if (override) return override;

    // Uten HviForm-kontekst eller med tags skrudd av: ingen automatikk
    const form = this.hviForm;
    if (!form || !form.showRequiredTags) return null;

    switch (form.requiredMode()) {
      case 'all-required':
        // Alle er required – vis ingen tag per felt (all-required vises øverst i form)
        return null;
      case 'mixed':
        // Blanding – vis required eller optional basert på feltets required-state
        return this.required() ? 'required' : 'optional';
      case 'none':
      default:
        return null;
    }
  });

  private onChange: (value: string) => void = () => undefined;
  protected onTouched: () => void = () => undefined;

  protected handleInput(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.value.set(target.value);
    this.onChange(target.value);
  }

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
