import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import '@digdir/designsystemet-web';

/**
 * @summary
 * Breadcrumbs hjelper brukarane med å forstå kvar dei er i ei struktur,
 * og gjer det mogleg å navigere tilbake til høgare nivå.
 *
 * Webkomponenten `<ds-breadcrumbs>` handterer automatisk `aria-current="page"`
 * på siste lenke og responsive visning (tilbake-knapp på smale skjermar,
 * full sti på breie skjermar).
 *
 * @example
 * Sti med tilbake-knapp (responsiv):
 * ```html
 * <hvi-breadcrumbs ariaLabel="Du er her:">
 *   <a class="ds-link" href="#" aria-label="Tilbake til Nivå 3">Nivå 3</a>
 *   <ol>
 *     <li><a class="ds-link" href="#">Nivå 1</a></li>
 *     <li><a class="ds-link" href="#">Nivå 2</a></li>
 *     <li><a class="ds-link" href="#">Nivå 3</a></li>
 *     <li><a class="ds-link" href="#">Nivå 4</a></li>
 *   </ol>
 * </hvi-breadcrumbs>
 * ```
 *
 * @example
 * Kun tilbake-knapp:
 * ```html
 * <hvi-breadcrumbs ariaLabel="Brødsmulesti">
 *   <a class="ds-link" href="#" aria-label="Tilbake til Nivå 3">Nivå 3</a>
 * </hvi-breadcrumbs>
 * ```
 *
 * @example
 * Kun sti (alltid synleg):
 * ```html
 * <hvi-breadcrumbs ariaLabel="Du er her:">
 *   <ol>
 *     <li><a class="ds-link" href="#">Nivå 1</a></li>
 *     <li><a class="ds-link" href="#">Nivå 2</a></li>
 *   </ol>
 * </hvi-breadcrumbs>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/docs/breadcrumbs/overview}
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
