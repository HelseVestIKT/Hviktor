import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HviForm } from '../form/form.directive';
import type { HviValidationMessages } from '../validation/validation-message';

/**
 * @summary
 * ErrorSummary is a summary of errors. It gives the user an overview of errors or missing information
 * that must be corrected on a page or step in order to proceed.
 *
 * @remarks
 * This component supports two modes:
 * 1) Manual mode: provide `[errors]` as an array of `{ message, href }`.
 * 2) Auto mode (recommended): provide `[form]` + `[messages]` and it will build the list from invalid controls.
 *
 * Each ErrorSummary link must have an `href` pointing to the unique id of a form field (e.g. `#firstName`)
 * so the user can navigate to the relevant field.
 *
 * @example
 * Manual mode:
 * ```html
 * <hvi-error-summary
 *   heading="For å gå videre må du rette opp følgende feil:"
 *   [errors]="[
 *     { message: 'Fornavn må være minst 2 tegn', href: '#firstName' },
 *     { message: 'Telefonnummer kan kun inneholde siffer', href: '#phone' }
 *   ]"
 * />
 * ```
 *
 * @example
 * Auto mode with Angular Reactive Forms:
 * ```html
 * <hvi-error-summary
 *   #summary
 *   headingId="form-errors"
 *   [form]="form"
 *   [messages]="messages"
 * />
 *
 * <form hviForm [formGroup]="form" [focusOnInvalid]="summary">
 *   <hvi-field>
 *     <label hviLabel for="firstName" weight="medium">Fornavn</label>
 *     <input hviInput id="firstName" formControlName="firstName" hviControlInvalid />
 *     <p hviFieldValidation hviValidationMessage="firstName" [messages]="messages.firstName"></p>
 *   </hvi-field>
 *
 *   <button hviButton type="submit" variant="primary">Send inn</button>
 * </form>
 * ```
 *
 * Documentation: https://designsystemet.no/en/components/docs/error-summary/code
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

let errorSummaryIdCounter = 0;
const nextErrorSummaryHeadingId = () => `hvi-error-summary-heading-${++errorSummaryIdCounter}`;

@Component({
  selector: 'hvi-error-summary',
  standalone: true,
  template: `
    <div
      #container
      class="ds-error-summary"
      tabindex="-1"
      [attr.aria-labelledby]="headingId"
      [hidden]="!shouldShow"
    >
      @switch (headingLevel) {
        @case (1) {
          <h1 class="ds-heading" [id]="headingId">{{ heading }}</h1>
        }
        @case (2) {
          <h2 class="ds-heading" [id]="headingId">{{ heading }}</h2>
        }
        @case (3) {
          <h3 class="ds-heading" [id]="headingId">{{ heading }}</h3>
        }
        @case (4) {
          <h4 class="ds-heading" [id]="headingId">{{ heading }}</h4>
        }
        @case (5) {
          <h5 class="ds-heading" [id]="headingId">{{ heading }}</h5>
        }
        @default {
          <h6 class="ds-heading" [id]="headingId">{{ heading }}</h6>
        }
      }

      <ul class="ds-list">
        @for (err of computedErrors; track err.href) {
          <li>
            <a class="ds-link" data-color="neutral" [href]="err.href">{{ err.message }}</a>
          </li>
        }
      </ul>
    </div>
  `,
})
export class HviErrorSummary {
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

  /** Used for aria-labelledby on the container */
  @Input() headingId = nextErrorSummaryHeadingId();

  /** When to show errors from the form controls */
  @Input() showWhen: 'submitted' | 'touched' | 'always' = 'submitted';

  @ViewChild('container', { static: true }) private container?: ElementRef<HTMLElement>;

  focus(): void {
    this.container?.nativeElement.focus();
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
