import { Component, Input } from '@angular/core';

/**
 * Avatar displays an image, initials, or icon for a person, entity, or profile.
 *
 * @example
 * ```html
 * <hvi-avatar
 *  ariaLabel="Ola Nordmann"
 *  variant="circle"
 *  initials="ON"
 *  size="md"
 *  color="brand1">
 * </hvi-avatar>
 * ```
 *
 * Documentation: https://designsystemet.no/en/components/docs/avatar/code/
 */
@Component({
  selector: 'hvi-avatar',
  standalone: true,
  template: '<ng-content />',
  host: {
    class: 'ds-avatar',
    role: 'img',
    '[attr.aria-label]': 'ariaLabel ?? null',
    '[attr.data-variant]': 'variant ?? null',
    '[attr.data-initials]': 'initials ?? null',
    '[attr.data-size]': 'size ?? null',
    '[attr.data-color]': 'color ?? null',
  },
})
export class HviAvatar {
  /** The name of the person the avatar represents */
  @Input() ariaLabel?: string;

  /** The shape of the avatar */
  @Input() variant?: 'circle' | 'square';

  /** Initials displayed inside the avatar */
  @Input() initials?: string;

  /** The size of the avatar */
  @Input() size?: 'xs' | 'sm' | 'md' | 'lg';

  /** The color theme of the avatar */
  @Input() color?: 'accent' | 'brand1' | 'brand2' | 'brand3' | 'neutral' | 'danger';
}
