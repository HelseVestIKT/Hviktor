import { Component, Input } from '@angular/core';

/**
 * @summary
 * ErrorSummary component description.
 *
 * @example
 * ```html
 * <hvi-error-summary></hvi-error-summary>
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

@Component({
  selector: 'hvi-error-summary',
  standalone: true,
  template: `
    <div class="ds-error-summary" tabindex="-1" [attr.aria-labelledby]="headingId">
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
        @for (err of errors; track err.href) {
          <li>
            <a class="ds-link" data-color="neutral" [href]="err.href">
              {{ err.message }}
            </a>
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

  /** Items displayed in the summary */
  @Input() errors: HviErrorSummaryItem[] = [];

  /** Used for aria-labelledby on the container */
  @Input() headingId = 'hvi-error-summary-heading';
}
