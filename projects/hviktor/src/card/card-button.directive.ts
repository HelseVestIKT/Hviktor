import { Directive, Input } from '@angular/core';

/**
 * @summary
 * CardButton makes an entire card a clickable button. It applies the `ds-card`
 * class with hardcoded `default` variant and `neutral` color. Use it when the
 * card should trigger an action like opening a dialog rather than navigate via a link.
 *
 * @example Card button with content
 * ```html
 * <button hviCardButton maxWidth="420px">
 *   <div hviCardBlock>
 *     <h2 hviHeading>Innstillinger</h2>
 *     <p hviParagraph>Åpne innstillinger og personvern.</p>
 *   </div>
 * </button>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/card/code/}
 */
@Directive({
  selector: 'button[hviCardButton]',
  standalone: true,
  host: {
    class: 'ds-card',
    'data-variant': 'default',
    'data-color': 'neutral',
    '[style.max-width]': 'maxWidth',
  },
})
export class HviCardButton {
  /** Maximum width of the card (e.g. `'320px'` or `'20rem'`). */
  @Input() maxWidth?: string;
}
