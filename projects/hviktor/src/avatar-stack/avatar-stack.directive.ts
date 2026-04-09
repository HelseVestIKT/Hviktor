import { Directive, Input } from '@angular/core';

/**
 * @summary
 * AvatarStack groups a collection of Avatar elements into a visually stacked layout.
 * Applied as a directive on a `<figure>` element. Supports an optional suffix
 * (e.g. "+4") to indicate additional hidden avatars, and an expandable mode.
 *
 * @example Stacked avatars with suffix
 * ```html
 * <figure hviAvatarStack suffix="+4">
 *   <hvi-avatar ariaLabel="Ola Nordmann" initials="ON"></hvi-avatar>
 *   <hvi-avatar ariaLabel="Kari Nordmann" initials="KN"></hvi-avatar>
 * </figure>
 * ```
 *
 * @example Square variant
 * ```html
 * <figure hviAvatarStack variant="square">
 *   <hvi-avatar ariaLabel="Ola Nordmann" variant="square" initials="ON"></hvi-avatar>
 *   <hvi-avatar ariaLabel="Kari Nordmann" variant="square" initials="KN"></hvi-avatar>
 * </figure>
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
  /** The shape of the stacked avatars (`'square'` or `'circle'`). */
  @Input() variant?: 'square' | 'circle';

  /** Whether the stack is expandable. `'true'` enables expanding, `'fixed'` keeps it static. */
  @Input() expandable?: 'true' | 'fixed';

  /** Text displayed after the visible avatars, typically a count like `"+4"`. */
  @Input() suffix?: string;

  /** Custom gap between stacked avatars. */
  @Input() gap?: string;
}
