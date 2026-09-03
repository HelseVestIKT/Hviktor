import { Directive, Input } from '@angular/core';

/**
 * @summary
 * CardLink makes an entire card a clickable link. It applies the `ds-card`
 * class with hardcoded `default` variant and `neutral` color. Use it when the
 * card should navigate to a new URL rather than trigger an action.
 *
 * @example Card link with content
 * ```html
 * <a hviCardLink href="/innstillinger" maxWidth="420px">
 *   <div hviCardBlock>
 *     <h2 hviHeading>Innstillinger</h2>
 *     <p hviParagraph>Åpne innstillinger og personvern.</p>
 *   </div>
 * </a>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/card/code/}
 */
@Directive({
  selector: 'a[hviCardLink]',
  standalone: true,
  host: {
    class: 'ds-card',
    'data-variant': 'default',
    'data-color': 'neutral',
    '[style.max-width]': 'maxWidth',
  },
})
export class HviCardLink {
  /** Maximum width of the card (e.g. `'320px'` or `'20rem'`). */
  @Input() maxWidth?: string;
}
