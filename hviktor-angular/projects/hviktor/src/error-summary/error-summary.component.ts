import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  booleanAttribute,
  inject,
} from '@angular/core';
import { HviErrorSummaryContext } from './error-summary-context';

/**
 * @summary
 * Displays a focusable summary of validation errors and links back to affected fields.
 *
 * @example
 * ```html
 * <hvi-error-summary autoFocus>
 *   <h2 hviErrorSummaryHeading>For å gå videre må du rette opp følgende feil:</h2>
 *   <ul hviErrorSummaryList>
 *     <li hviErrorSummaryItem>
 *       <a hviErrorSummaryLink href="#fornavn">Fornavn må være minst 2 tegn</a>
 *     </li>
 *     <li hviErrorSummaryItem>
 *       <a hviErrorSummaryLink href="#telefon">Telefonnummer kan kun inneholde siffer</a>
 *     </li>
 *   </ul>
 * </hvi-error-summary>
 * ```
 *
 * Documentation: https://designsystemet.no/no/components/docs/error-summary/code
 */

@Component({
  selector: 'hvi-error-summary',
  standalone: true,
  template: '<ng-content />',
  host: {
    class: 'ds-error-summary',
  },
  viewProviders: [HviErrorSummaryContext],
})
export class HviErrorSummary implements AfterViewInit {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly context = inject(HviErrorSummaryContext);

  /** Allow overriding aria-labelledby when heading is managed outside the component. */
  @Input() ariaLabelledby?: string;

  /** Focus the error summary once view has been initialized. */
  @Input({ transform: booleanAttribute }) autoFocus = false;

  /** Prevent scrolling the page when calling focus (default mirrors native behaviour). */
  @Input({ transform: booleanAttribute }) preventScrollOnFocus = false;

  /** Enables programmatic focus when true (tabindex="-1"). */
  @Input({ transform: booleanAttribute }) focusable = true;

  @HostBinding('attr.tabindex')
  get hostTabIndex() {
    return this.focusable ? -1 : null;
  }

  @HostBinding('attr.aria-labelledby')
  get hostLabelledby() {
    return this.ariaLabelledby || this.context.headingId();
  }

  ngAfterViewInit() {
    if (this.autoFocus) this.focus();
  }

  /** Programmatically focus the summary container. */
  focus(options?: FocusOptions) {
    if (!this.focusable) return;

    const focusOptions: FocusOptions | undefined =
      options ?? (this.preventScrollOnFocus ? { preventScroll: true } : undefined);

    const element = this.elementRef.nativeElement;
    if (focusOptions) element.focus(focusOptions);
    else element.focus();
  }
}
