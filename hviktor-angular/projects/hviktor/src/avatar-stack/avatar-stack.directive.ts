import { Directive, Input } from '@angular/core';

/**
 * @summary
 * AvatarStack stabler en samling Avatar elementer
 *
 * @example
 * ```html
 * <hvi-avatar-stack></hvi-avatar-stack>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/avatar-stack/code}
 */

@Directive({
  selector: 'figure[hviAvatarStack]',
  standalone: true,
  host: {
    class: 'ds-avatar-stack',
    '[attr.data-variant]': 'variant',
    '[attr.data-expandable]': 'expandable',
    '[attr.data-suffix]': 'suffix',
    '[attr.data-avatar-stack-gap]': 'gap',
  },
})
export class HviAvatarStack {
  /** variant */
  @Input() variant?: 'square' | 'circle';

  /** Plassering av popover relativt til trigger */

  @Input() expandable?: 'true' | 'fixed';

  @Input() suffix?: string;

  @Input() gap?: string;
}
