import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import '@digdir/designsystemet-web';
import { HviForm } from '../form/form.directive';
import type { HviValidationMessages } from '../validation/validation-message';

/**
 * Item model used by manual error summaries. Provide `message` and `href` for each invalid field.
 */
export type HviErrorSummaryItem = {
  /** Text shown in the list */
  message: string;
  /** Link target (should be "#<field-id>") */
  href: string;
};

export type HviErrorSummaryMessages = Record<string, HviValidationMessages>;

const DEFAULT_ERROR_PRIORITY = [
  'required',
  'minlength',
  'maxlength',
  'email',
  'pattern',
  'min',
  'max',
] as const;

/**
 * @summary
 * ErrorSummary lists blocking validation errors so users can quickly find and fix them.
 *
 * @remarks
 * Modes:
 * - Manual: provide `[errors]` as `{ message, href }[]`.
 * - Auto (recommended): provide `[form]` + `[messages]` (and optionally `[idMap]`) to derive errors from invalid
 *   controls in a reactive form.
 *
 * Auto mode should be rendered inside `<form hviForm ...>` so it can follow submit visibility (`showWhen`) and
 * be focused automatically via `[focusOnInvalid]`.
 *
 * Each item link must point to a field id (e.g. `href="#firstName"`). Prefer `id === formControlName`.
 *
 * @example
 * Manual mode:
 * ```html
 * <hvi-error-summary
 *   [errors]="[
 *     { message: 'Fornavn må være minst 2 tegn', href: '#firstName' },
 *     { message: 'Telefonnummer kan kun inneholde siffer', href: '#phone' }
 *   ]"
 * />
 * ```
 *
 * @example
 * Auto mode (HTML + TS):
 *
 * ```html
 * HTML:
 * <form hviForm [formGroup]="form" [focusOnInvalid]="summary">
 *   <hvi-error-summary #summary [form]="form" [messages]="messages" showWhen="submitted" />
 *
 *   <hvi-field>
 *     <label hviLabel for="firstName" weight="medium">Fornavn</label>
 *     <input hviInput id="firstName" formControlName="firstName" hviControlInvalid />
 *     <p hviFieldValidation hviValidationMessage="firstName" [messages]="messages.firstName"></p>
 *   </hvi-field>
 *
 *   <hvi-field>
 *     <label hviLabel for="phone" weight="medium">Telefon</label>
 *     <input hviInput id="phone" type="tel" formControlName="phone" hviControlInvalid />
 *     <p hviFieldValidation hviValidationMessage="phone" [messages]="messages.phone"></p>
 *   </hvi-field>
 *
 *   <button hviButton type="submit" variant="primary">Send inn</button>
 * </form>
 * ```
 *
 * ```ts
 * TS:
 * form = new FormGroup({
 *   firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
 *   phone: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
 * });
 *
 * messages = {
 *   firstName: { required: 'Fornavn er påkrevd', minlength: 'Fornavn må være minst 2 tegn' },
 *   phone: { required: 'Telefon er påkrevd', pattern: 'Telefonnummer kan kun inneholde siffer' },
 * } as const;
 * ```
 *
 * Documentation: https://designsystemet.no/en/components/docs/error-summary/code
 */
@Component({
  selector: 'hvi-error-summary',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  styles: [':host { display: contents; }'],
  template: `
    <ds-error-summary class="ds-error-summary" [hidden]="!shouldShow">
      @switch (headingLevel) {
        @case (1) {
          <h1 class="ds-heading">{{ heading }}</h1>
        }
        @case (3) {
          <h3 class="ds-heading">{{ heading }}</h3>
        }
        @case (4) {
          <h4 class="ds-heading">{{ heading }}</h4>
        }
        @case (5) {
          <h5 class="ds-heading">{{ heading }}</h5>
        }
        @case (6) {
          <h6 class="ds-heading">{{ heading }}</h6>
        }
        @default {
          <h2 class="ds-heading">{{ heading }}</h2>
        }
      }

      <ul class="ds-list">
        @for (err of computedErrors; track err.href) {
          <li>
            <a
              class="ds-link"
              data-color="neutral"
              [href]="err.href"
              (click)="onLinkClick($event, err.href)"
              >{{ err.message }}</a
            >
          </li>
        }
      </ul>
    </ds-error-summary>
  `,
})
export class HviErrorSummary {
  private readonly el = inject(ElementRef<HTMLElement>);

  /** Heading text shown above the list */
  @Input() heading = 'For å gå videre må du rette opp følgende feil:';

  /** Heading level for the heading element (1-6). Defaults to 2 per DS */
  @Input() headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 2;

  /**
   * Manual mode: items displayed in the summary.
   * If non-empty, manual mode takes precedence over auto mode.
   */
  @Input() errors: HviErrorSummaryItem[] = [];

  /** Auto mode: reactive form to derive errors from */
  @Input() form?: FormGroup;

  /**
   * Auto mode: messages per controlName.
   * Example:
   * {
   *   firstName: { required: 'Fornavn er påkrevd', minlength: 'Fornavn må være minst 2 tegn' },
   *   phone: { required: 'Telefon er påkrevd', pattern: 'Telefonnummer kan kun inneholde siffer' }
   * }
   */
  @Input() messages?: HviErrorSummaryMessages;

  /**
   * Auto mode: map controlName -> element id.
   * Default is `id === controlName`.
   */
  @Input() idMap?: Record<string, string>;

  /** Auto mode: error key priority (first match wins) */
  @Input() errorPriority: readonly string[] = DEFAULT_ERROR_PRIORITY;

  /** When to show errors from the form controls */
  @Input() showWhen: 'submitted' | 'touched' | 'always' = 'submitted';

  focus(): void {
    this.el.nativeElement.querySelector('ds-error-summary')?.focus();
  }

  /**
   * Handles click on error links to prevent Angular Router navigation
   * and instead focus/scroll to the target element.
   */
  onLinkClick(event: MouseEvent, href: string): void {
    event.preventDefault();

    const id = href.startsWith('#') ? href.slice(1) : href;
    const target = document.getElementById(id);

    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  get computedErrors(): HviErrorSummaryItem[] {
    // 1) Manual mode wins
    if (this.errors?.length) return this.errors;

    // 2) Auto mode
    const form = this.form;
    const messages = this.messages;
    if (!form || !messages) return [];

    const items: HviErrorSummaryItem[] = [];

    for (const controlName of Object.keys(form.controls)) {
      const ctrl = form.controls[controlName];
      if (!ctrl?.invalid) continue;

      const errs = ctrl.errors ?? {};
      const msgMap = messages[controlName] ?? {};

      const message = this.pickMessage(errs, msgMap);
      if (!message) continue;

      const id = this.idMap?.[controlName] ?? controlName;
      items.push({ message, href: `#${id}` });
    }

    return items;
  }

  private pickMessage(errors: Record<string, unknown>, messages: HviValidationMessages): string {
    for (const key of this.errorPriority) {
      if (errors[key] && messages[key]) return messages[key]!;
    }
    for (const key of Object.keys(errors)) {
      if (messages[key]) return messages[key]!;
    }
    return Object.keys(errors).length ? 'Ugyldig verdi' : '';
  }

  private readonly hviForm = inject(HviForm, { optional: true });

  get shouldShow(): boolean {
    if (this.computedErrors.length === 0) return false;

    switch (this.showWhen) {
      case 'always':
        return true;

      case 'touched':
        // show when any invalid control is touched OR the form has been submitted
        return (this.hviForm?.submitted ?? false) || this.anyInvalidTouched();

      case 'submitted':
      default:
        return this.hviForm?.submitted ?? false;
    }
  }

  private anyInvalidTouched(): boolean {
    const form = this.form;
    if (!form) return false;

    for (const name of Object.keys(form.controls)) {
      const c = form.controls[name];
      if (c?.invalid && c.touched) return true;
    }
    return false;
  }
}
