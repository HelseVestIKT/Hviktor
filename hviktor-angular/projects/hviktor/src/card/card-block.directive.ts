import { Directive } from "@angular/core";

/**
 * Use multiple <div hviCardBlock> elements if you want to divide the card with separators or add images or video that extend to the edge. 
 * Note that when you use <div hviCardBlock>, all content must be placed inside a <div hviCardBlock> and not directly in the Card.
 * 
 * @example
 * ```html
 * <hvi-card variant="tinted" color="brand1" maxWidth="400px">
 *  <div hviCardBlock>
 *   <h2>This is a card</h2>
 *   <p>The content of the card goes here.</p>
 *  </div>
 * </hvi-card>
 * ```
 * 
 * Documentation: https://designsystemet.no/en/components/docs/card/code#with-sections
 */
@Directive({
  selector: '[hviCardBlock]',
  standalone: true,
  host: { class: 'ds-card__block' },
})
export class HviCardBlock {}