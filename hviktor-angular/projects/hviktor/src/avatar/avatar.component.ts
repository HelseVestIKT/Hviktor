import { Component, Input } from "@angular/core";


/**
 * Avatar viser et bilde, initialer eller ikon for en person, enhet eller profil.
 * 
 * Eksempel på bruk:
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
 * Dokumentasjon: https://designsystemet.no/no/components/docs/avatar/overview
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
    /** Navnet på personen avataren representerer */
    @Input() ariaLabel?: string;

    /** Formen på avataren */
    @Input() variant?: 'circle' | 'square';

    /** Initialer som vises inne i avataren */
    @Input() initials?: string;

    /** Størrelsen på avataren */
    @Input() size?: 'xs' | 'sm' | 'md' | 'lg';

    /** Fargetemaet på avataren */
    @Input() color?: 'accent' | 'brand1' | 'brand2' | 'brand3' | 'neutral' | 'danger';
}