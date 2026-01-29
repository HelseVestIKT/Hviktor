import { Directive, Input } from '@angular/core';

/**
 * Paragraph is used for continuous text and is typically applied in articles, components, help text, and similar content.
 *
 * @example
 * ```html
 * <p hviParagraph variant="long" size="md">
 *  This is a paragraph with body text that can be adjusted in size and variant.
 * </p>
 * ```
 *
 * Documentation: https://designsystemet.no/en/components/docs/paragraph/overview
 */
@Directive({
  selector: 'p[hviParagraph]',
  standalone: true,
  host: {
    class: 'ds-paragraph',
    '[attr.data-variant]': 'variant ?? null',
    '[attr.data-size]': 'size ?? null',
  },
})
export class HviParagraph {
  /** Adjusts the style for the length of the paragraph */
  @Input() variant?: 'long' | 'default' | 'short';

  /** Paragraph is available in several text sizes to suit different needs */
  @Input() size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}
