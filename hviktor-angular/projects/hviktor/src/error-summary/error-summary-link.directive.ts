import { Directive, Input } from '@angular/core';

/**
 * Style anchor elements as error summary links and forward optional color tokens.
 */
@Directive({
  selector: '[hviErrorSummaryLink]',
  standalone: true,
  host: {
    class: 'ds-link',
    '[attr.data-color]': 'colorValue',
  },
})
export class HviErrorSummaryLinkDirective {
  protected colorValue: string | null = 'neutral';

  /**
   * Optional data-color token, defaults to "neutral" when omitted.
   * Allows usage both as boolean attribute and with custom value.
   */
  @Input('hviErrorSummaryLink')
  set color(value: string | null | undefined) {
    this.colorValue = value == null || value === '' ? 'neutral' : value;
  }

  get color(): string | null {
    return this.colorValue;
  }
}
