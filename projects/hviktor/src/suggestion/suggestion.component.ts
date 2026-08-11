import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  Component,
  computed,
  contentChild,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
  model,
  output,
  PLATFORM_ID,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import '@digdir/designsystemet-web';
import '@u-elements/u-combobox';
import '@u-elements/u-datalist';

/** Sendes når brukeren skriver og forslagslista skal oppdateres. */
export interface HviSuggestionCompleteEvent {
  /** Teksten brukeren har skrevet. Tom streng ved fokus. */
  query: string;
}

/** Skjermlesertekster brukt av `<u-combobox>`. */
export interface HviSuggestionSrText {
  added: string;
  removed: string;
  remove: string;
  empty: string;
  found: string;
  invalid: string;
  of: string;
  items: string;
}

/** Norske standardtekster. u-combobox defaulter til engelsk. */
export const HVI_SUGGESTION_SR_TEXT: HviSuggestionSrText = {
  added: 'Lagt til',
  removed: 'Fjernet',
  remove: 'Trykk for å fjerne',
  empty: 'Ingen valgte',
  found: 'Naviger til venstre for å finne %d valgte',
  invalid: 'Ugyldig verdi',
  of: 'av',
  items: 'Valgte',
};

/** Minimal beskrivelse av `<u-combobox>` sitt DOM-API. */
interface ComboboxElement extends HTMLElement {
  readonly control: HTMLInputElement | null;
  readonly items: HTMLCollectionOf<HTMLDataElement>;
}

let nextId = 0;

/**
 * @summary
 * Søkbart inputfelt med forslagsliste. Verdien settes med `ngModel`,
 * `formControlName` eller `[(value)]`, og lista fylles via `suggestions`.
 *
 * @example
 * ```html
 * <hvi-suggestion
 *   label="Velg en kommune"
 *   [(ngModel)]="kommune"
 *   [suggestions]="treff"
 *   (completeMethod)="sok($event)"
 *   optionLabel="navn"
 * />
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/suggestion/code}
 * @see {@link https://u-elements.github.io/u-elements/elements/u-combobox}
 */
@Component({
  selector: 'hvi-suggestion',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgTemplateOutlet],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HviSuggestion),
      multi: true,
    },
  ],
  template: `
    <ds-field class="ds-field">
      @if (label()) {
        <label class="ds-label" [attr.for]="inputId()">{{ label() }}</label>
      }
      @if (description()) {
        <div data-field="description">{{ description() }}</div>
      }
      <ds-suggestion
        #combobox
        class="ds-suggestion"
        (comboboxafterselect)="readFromDom()"
        [attr.data-multiple]="multiple() ? '' : undefined"
        [attr.data-creatable]="creatable() ? '' : undefined"
        [attr.data-sr-added]="sr().added"
        [attr.data-sr-removed]="sr().removed"
        [attr.data-sr-remove]="sr().remove"
        [attr.data-sr-empty]="sr().empty"
        [attr.data-sr-found]="sr().found"
        [attr.data-sr-invalid]="sr().invalid"
        [attr.data-sr-of]="sr().of"
        [attr.data-sr-items]="sr().items"
      >
        <input
          class="ds-input"
          type="text"
          [id]="inputId()"
          [disabled]="disabled()"
          [attr.name]="name()"
          [attr.placeholder]="placeholder()"
          [attr.aria-label]="label() ? null : ariaLabel()"
          [attr.aria-invalid]="error() ? 'true' : null"
          [attr.aria-busy]="loading() ? 'true' : null"
          (input)="complete($event)"
          (focus)="onFocus($event)"
          (blur)="onTouched()"
        />
        <button type="reset" [attr.aria-label]="clearLabel()"></button>
        <u-datalist [attr.data-nofilter]="filter() ? undefined : ''">
          @for (option of suggestions(); track keyOf(option)) {
            <u-option [attr.value]="keyOf(option)" [attr.label]="labelOf(option)">
              @if (itemTemplate(); as template) {
                <ng-container
                  [ngTemplateOutlet]="template"
                  [ngTemplateOutletContext]="{ $implicit: option }"
                />
              } @else {
                {{ labelOf(option) }}
              }
            </u-option>
          }
        </u-datalist>
      </ds-suggestion>
      @if (error()) {
        <p class="ds-validation-message" data-field="validation">{{ error() }}</p>
      }
    </ds-field>
  `,
  host: {
    style: 'display: contents;',
  },
})
export class HviSuggestion<T = unknown> implements ControlValueAccessor {
  private readonly comboboxRef = viewChild<ElementRef<ComboboxElement>>('combobox');
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /** Valgfri mal per alternativ: `<ng-template let-item #item>`. */
  readonly itemTemplate = contentChild<TemplateRef<{ $implicit: T }>>('item');

  /** Ledetekst. Utelates den, bør `ariaLabel` settes. */
  readonly label = input<string>();

  /** Alternativ til synlig label. Brukes kun når `label` ikke er satt. */
  readonly ariaLabel = input<string>();

  /** Utfyllende hjelpetekst under label. */
  readonly description = input<string>();

  /** Feilmelding. Markerer samtidig feltet som ugyldig. */
  readonly error = input<string>();

  /** Alternativene som vises i lista. */
  readonly suggestions = input<readonly T[]>([]);

  /** Valgt verdi. Array når `multiple` er satt. */
  readonly value = model<T | T[] | null>(null);

  /** Egenskapen som brukes som visningstekst når alternativene er objekter. */
  readonly optionLabel = input<string>();

  /** Egenskapen som identifiserer et alternativ. Faller tilbake til `optionLabel`. */
  readonly dataKey = input<string>();

  /** Lar brukeren velge flere alternativer. */
  readonly multiple = input(false, { transform: booleanAttribute });

  /** Lar brukeren legge til verdier som ikke finnes i lista. */
  readonly creatable = input(false, { transform: booleanAttribute });

  /** Innebygd filtrering. Sett `false` når `suggestions` alt er filtrert. */
  readonly filter = input(true, { transform: booleanAttribute });

  /** Send `completeMethod` allerede ved fokus, som Prime sin `dropdown`. */
  readonly completeOnFocus = input(false, { transform: booleanAttribute });

  /** Marker feltet som opptatt mens forslag hentes. */
  readonly loading = input(false, { transform: booleanAttribute });

  /** `id` på inputfeltet. Genereres automatisk. */
  readonly inputId = input(`hvi-suggestion-${nextId++}`);

  /** `name` på inputfeltet. */
  readonly name = input<string>();

  /** Plassholdertekst. */
  readonly placeholder = input<string>();

  /** Deaktiverer feltet. Settes også av `formControlName`. */
  readonly disabled = model(false);

  /** Aria-label på tøm-knappen. */
  readonly clearLabel = input('Tøm');

  /** Overstyr enkelte skjermlesertekster. */
  readonly srText = input<Partial<HviSuggestionSrText>>({});

  /** Sendes når brukeren skriver, slik at `suggestions` kan oppdateres. */
  readonly completeMethod = output<HviSuggestionCompleteEvent>();

  protected readonly sr = computed<HviSuggestionSrText>(() => ({
    ...HVI_SUGGESTION_SR_TEXT,
    ...this.srText(),
  }));

  /** Valgt verdi som flat liste, uavhengig av `multiple`. */
  private readonly selected = computed<readonly T[]>(() => {
    const value = this.value();
    if (value == null) return [];
    return Array.isArray(value) ? value : [value];
  });

  private onChange: (value: T | T[] | null) => void = () => undefined;
  protected onTouched: () => void = () => undefined;

  constructor() {
    effect(() => {
      const selected = this.selected();
      this.optionLabel();
      this.dataKey();
      if (this.isBrowser) this.writeToDom(selected);
    });
  }

  /** Flytter fokus til inputfeltet. */
  focus(): void {
    this.comboboxRef()?.nativeElement.control?.focus();
  }

  protected keyOf(option: T): string {
    if (option == null) return '';
    if (typeof option !== 'object') return String(option);
    const property = this.dataKey() ?? this.optionLabel();
    return property ? String((option as Record<string, unknown>)[property] ?? '') : String(option);
  }

  protected labelOf(option: T): string {
    if (option == null) return '';
    if (typeof option !== 'object') return String(option);
    const property = this.optionLabel();
    return property ? String((option as Record<string, unknown>)[property] ?? '') : String(option);
  }

  protected complete(event: Event): void {
    this.completeMethod.emit({ query: (event.target as HTMLInputElement).value });
  }

  protected onFocus(event: Event): void {
    if (this.completeOnFocus()) this.complete(event);
  }

  /**
   * Speiler valgt verdi inn i `<data>`-elementene som `<u-combobox>` bruker
   * internt. Gjenbruker eksisterende noder, siden komponenten også eier dem.
   */
  private writeToDom(selected: readonly T[]): void {
    const combobox = this.comboboxRef()?.nativeElement;
    if (!combobox) return;

    const wanted = new Map(selected.map((option) => [this.keyOf(option), this.labelOf(option)]));

    for (const element of Array.from(combobox.querySelectorAll(':scope > data'))) {
      const key = element.getAttribute('value') ?? element.textContent?.trim() ?? '';
      const label = wanted.get(key);

      if (label === undefined) {
        element.remove();
      } else {
        if (element.textContent !== label) element.textContent = label;
        wanted.delete(key);
      }
    }

    for (const [key, label] of wanted) {
      const data = document.createElement('data');
      data.value = key;
      data.textContent = label;
      combobox.insertBefore(data, combobox.control);
    }
  }

  /** Leser `<data>`-elementene tilbake etter at brukeren har endret valget. */
  protected readFromDom(): void {
    const combobox = this.comboboxRef()?.nativeElement;
    if (!combobox) return;

    const options = Array.from(combobox.items).map((data) => {
      const label = data.textContent?.trim() ?? '';
      return this.resolve(data.value || label) ?? (label as T);
    });

    const value = this.multiple() ? options : (options[0] ?? null);
    this.value.set(value);
    this.onChange(value);
    this.onTouched();
  }

  /** Finner opprinnelig alternativ ut fra nøkkel, så verdien beholder typen. */
  private resolve(key: string): T | undefined {
    return (
      this.suggestions().find((option) => this.keyOf(option) === key) ??
      this.selected().find((option) => this.keyOf(option) === key)
    );
  }

  writeValue(value: T | T[] | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: T | T[] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
