import { Component, computed, input } from '@angular/core';
import { LogoCompany, LOGOS } from './logo-paths';
import { LogoDefinition, LogoSize } from './logo-types';

/**
 * Logo displays a Helse Vest company logo with automatic light/dark mode support.
 *
 * The themed paths (text and dark dot) use `currentColor` so they respond to the
 * CSS `color` property, while accent paths (blue dots) keep a fixed color.
 *
 * The component automatically responds to `data-color-scheme` set by the application
 * (via Designsystemet), so no manual mode switching is needed.
 *
 * @example
 * ```html
 * <hvi-logo company="hve" />
 * <hvi-logo company="hve" size="lg" />
 * ```
 */
@Component({
  selector: 'hvi-logo',
  standalone: true,
  template: `
    <svg
      [attr.viewBox]="logo().viewBox"
      [attr.aria-label]="ariaLabel() ?? logo().label"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
    >
      @for (path of logo().paths; track $index) {
        <path [attr.d]="path.d" [attr.fill]="path.fill === 'accent' ? '#6CACE4' : 'currentColor'" />
      }
    </svg>
  `,
  host: {
    class: 'hvi-logo',
    '[attr.data-size]': 'size()',
  },
  styles: [
    `
      :host {
        display: inline-block;
        color: #003087;
      }

      :host-context([data-color-scheme='dark']) {
        color: white;
      }

      svg {
        display: block;
        height: 100%;
        width: auto;
      }

      :host([data-size='sm']) {
        height: 40px;
      }

      :host([data-size='md']) {
        height: 65px;
      }

      :host([data-size='lg']) {
        height: 82px;
      }
    `,
  ],
})
export class HviLogo {
  /** Which company logo to display */
  readonly company = input.required<LogoCompany>();

  /** Logo size — sm (40px), md (65px, default), lg (82px) height */
  readonly size = input<LogoSize>('md');

  /** Override the default accessible label */
  readonly ariaLabel = input<string | undefined>(undefined);

  protected readonly logo = computed<LogoDefinition>(() => LOGOS[this.company()]);
}
