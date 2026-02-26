import { Component, Input } from '@angular/core';

/** Available sizes for the Spinner */
export type SpinnerSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * @summary
 * Spinner brukes for å indikere at innhold eller en handling er i ferd med å laste,
 * og at brukeren må vente før de kan fortsette.
 *
 * @example
 * ```html
 * <hvi-spinner label="Laster..." />
 * <hvi-spinner label="Henter data" size="lg" />
 * ```
 *
 * @see {@link https://designsystemet.no/komponenter/spinner}
 */
@Component({
  selector: 'hvi-spinner',
  standalone: true,
  template: `
    <svg
      [attr.aria-label]="label"
      class="ds-spinner"
      role="img"
      viewBox="0 0 50 50"
      [attr.data-size]="size"
    >
      <circle class="ds-spinner__background" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
      <circle class="ds-spinner__circle" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
    </svg>
  `,
  host: {
    style: 'display: contents;',
  },
})
export class HviSpinner {
  /** Accessible label describing what is loading */
  @Input({ required: true }) label!: string;

  /** Size of the spinner */
  @Input() size?: SpinnerSize;
}
