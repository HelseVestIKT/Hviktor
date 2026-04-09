import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import '@digdir/designsystemet-web';

/**
 * @summary
 * Breadcrumbs help users understand their location within a hierarchy and
 * navigate back to higher levels. Wraps the `<ds-breadcrumbs>` web component,
 * which automatically sets `aria-current="page"` on the last link and renders
 * responsively (back-link on narrow screens, full path on wide screens).
 *
 * Supports three content patterns: back-link + ordered list (responsive),
 * back-link only, or ordered list only (always visible).
 *
 * @example Responsive with back-link and list
 * ```html
 * <hvi-breadcrumbs ariaLabel="You are here:">
 *   <a class="ds-link" href="#" aria-label="Back to Level 3">Level 3</a>
 *   <ol>
 *     <li><a class="ds-link" href="#">Level 1</a></li>
 *     <li><a class="ds-link" href="#">Level 2</a></li>
 *     <li><a class="ds-link" href="#">Level 3</a></li>
 *     <li><a class="ds-link" href="#">Level 4</a></li>
 *   </ol>
 * </hvi-breadcrumbs>
 * ```
 *
 * @example Back-link only
 * ```html
 * <hvi-breadcrumbs ariaLabel="Breadcrumb">
 *   <a class="ds-link" href="#" aria-label="Back to Level 3">Level 3</a>
 * </hvi-breadcrumbs>
 * ```
 *
 * @example List only (always visible)
 * ```html
 * <hvi-breadcrumbs ariaLabel="You are here:">
 *   <ol>
 *     <li><a class="ds-link" href="#">Level 1</a></li>
 *     <li><a class="ds-link" href="#">Level 2</a></li>
 *   </ol>
 * </hvi-breadcrumbs>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/breadcrumbs/code/}
 */
@Component({
  selector: 'hvi-breadcrumbs',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  styles: [':host { display: contents; }'],
  template: `
    <ds-breadcrumbs class="ds-breadcrumbs" [attr.aria-label]="ariaLabel">
      <ng-content />
    </ds-breadcrumbs>
  `,
})
export class HviBreadcrumbs {
  /** Accessible label for the breadcrumb navigation */
  @Input() ariaLabel = 'Du er her:';
}
