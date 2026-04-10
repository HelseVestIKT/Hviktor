import { Directive } from '@angular/core';

/**
 * @summary
 * CardBlock divides a Card into distinct sections separated by borders.
 * When using CardBlock, all content must be placed inside CardBlock elements —
 * nothing should be placed directly inside the Card. Useful for separating
 * media (images, video) from text content.
 *
 * @example Multiple blocks
 * ```html
 * <hvi-card color="neutral">
 *   <div hviCardBlock>
 *     <img src="banner.jpg" alt="" width="100%" />
 *   </div>
 *   <div hviCardBlock>
 *     <h2 class="ds-heading">Title</h2>
 *     <p class="ds-paragraph">Description text.</p>
 *   </div>
 * </hvi-card>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/card/code/}
 */
@Directive({
  selector: '[hviCardBlock]',
  standalone: true,
  host: { class: 'ds-card__block' },
})
export class HviCardBlock {}
