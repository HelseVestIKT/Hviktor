import { Component, Input } from '@angular/core';

/**
 * @summary
 * Card highlights related information or tasks. Comes in two background variants
 * (`default` and `tinted`) with multiple color themes. Supports plain content or
 * sectioned layout via `HviCardBlock`. Can be made fully clickable by setting
 * `clickDelegateFor` to the `id` of a link inside the card.
 *
 * @example Basic card
 * ```html
 * <hvi-card color="neutral" maxWidth="320px">
 *   <h2 class="ds-heading">Title</h2>
 *   <p class="ds-paragraph">Card content goes here.</p>
 * </hvi-card>
 * ```
 *
 * @example Card with sections
 * ```html
 * <hvi-card color="neutral" variant="default">
 *   <div hviCardBlock>
 *     <h2 class="ds-heading">Title</h2>
 *   </div>
 *   <div hviCardBlock>
 *     <p class="ds-paragraph">Content</p>
 *   </div>
 * </hvi-card>
 * ```
 *
 * @example Clickable link card
 * ```html
 * <hvi-card color="neutral" clickDelegateFor="card-link">
 *   <h2 class="ds-heading">
 *     <a id="card-link" class="ds-link" href="/details">Read more</a>
 *   </h2>
 *   <p class="ds-paragraph">Card description.</p>
 * </hvi-card>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/card/code/}
 */
@Component({
  selector: 'hvi-card',
  standalone: true,
  template: '<ng-content />',
  host: {
    class: 'ds-card',
    '[attr.data-variant]': 'variant',
    '[attr.data-color]': 'color',
    '[attr.data-clickdelegatefor]': 'clickDelegateFor',
    '[style.max-width]': 'maxWidth',
  },
})
export class HviCard {
  /** Background style of the card. */
  @Input() variant?: 'default' | 'tinted';

  /** Color theme of the card. */
  @Input() color?: 'accent' | 'brand1' | 'brand2' | 'brand3' | 'neutral';

  /** ID of a link inside the card to delegate clicks to, making the entire card clickable. */
  @Input() clickDelegateFor?: string;

  /** Maximum width of the card (e.g. `'320px'` or `'20rem'`). */
  @Input() maxWidth?: string;
}
