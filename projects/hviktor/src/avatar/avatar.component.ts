import { Component, Input } from '@angular/core';

/**
 * @summary
 * Avatar displays an image, initials, or icon representing a person, entity, or profile.
 * Has `role="img"` by default. Supports projecting an `<img>` element, text initials,
 * or no content (falls back to a default icon via CSS).
 * When used alongside visible text, set `aria-hidden="true"` on the avatar to avoid redundancy.
 * Use aria-label to provide a descriptive label for screen readers when the avatar is used without visible text.
 *
 * @example With initials
 * ```html
 * <hvi-avatar aria-label="Ola Nordmann" variant="circle" initials="ON" size="md" color="brand1">
 * </hvi-avatar>
 * ```
 *
 * @example With image
 * ```html
 * <hvi-avatar aria-label="Ola Nordmann">
 *   <img src="avatar.jpg" alt="" />
 * </hvi-avatar>
 * ```
 *
 * @example Decorative (next to visible name)
 * ```html
 * <hvi-avatar aria-hidden="true">ON</hvi-avatar>
 * <span>Ola Nordmann</span>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/avatar/code/}
 */
@Component({
  selector: 'hvi-avatar',
  standalone: true,
  template: '<ng-content />',
  host: {
    class: 'ds-avatar',
    role: 'img',
    '[attr.data-variant]': 'variant ?? null',
    '[attr.data-initials]': 'initials ?? null',
    '[attr.data-size]': 'size ?? null',
    '[attr.data-color]': 'color ?? null',
  },
})
export class HviAvatar {
  /** The shape of the avatar */
  @Input() variant?: 'circle' | 'square';

  /** Initials displayed inside the avatar */
  @Input() initials?: string;

  /** The size of the avatar */
  @Input() size?: 'xs' | 'sm' | 'md' | 'lg';

  /** The color theme of the avatar */
  @Input() color?: 'accent' | 'brand1' | 'brand2' | 'brand3' | 'neutral' | 'danger';
}
