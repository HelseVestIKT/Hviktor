import { Component, Input } from '@angular/core';

/**
 * @summary
 * AvatarStack groups a collection of Avatar elements into a visually stacked layout.
 * Supports an optional suffix (e.g. "+4") to indicate additional hidden avatars,
 * and an expandable mode that automatically sets `tabindex="0"` for keyboard access.
 *
 * @example Stacked avatars with suffix
 * ```html
 * <hvi-avatar-stack suffix="+4">
 *   <hvi-avatar aria-label="Ola Nordmann" initials="ON"></hvi-avatar>
 *   <hvi-avatar aria-label="Kari Nordmann" initials="KN"></hvi-avatar>
 * </hvi-avatar-stack>
 * ```
 *
 * @example Square variant
 * ```html
 * <hvi-avatar-stack variant="square">
 *   <hvi-avatar aria-label="Ola Nordmann" variant="square" initials="ON"></hvi-avatar>
 *   <hvi-avatar aria-label="Kari Nordmann" variant="square" initials="KN"></hvi-avatar>
 * </hvi-avatar-stack>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/avatar-stack/code}
 */

@Component({
  selector: 'hvi-avatar-stack',
  standalone: true,
  template: '<ng-content />',
  host: {
    class: 'ds-avatar-stack',
    '[attr.data-variant]': 'variant',
    '[attr.data-expandable]': 'expandable',
    '[attr.tabindex]': 'expandable ? "0" : null',
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
