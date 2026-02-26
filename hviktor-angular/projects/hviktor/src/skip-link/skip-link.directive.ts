import { Directive, ElementRef, HostListener, inject } from '@angular/core';

/**
 * @summary
 * SkipLink hjelper folk som bruker tastaturnavigasjon til å navigere,
 * slik at de enkelt kan gå til det viktigste innholdet på en side.
 *
 * @example
 * ```html
 * <a hviSkipLink href="#main-content">Hopp til hovedinnhold</a>
 *
 * <main id="main-content" tabindex="-1">
 *   Hovedinnhold her
 * </main>
 * ```
 *
 * @see {@link https://designsystemet.no/komponenter/skip-link}
 */
@Directive({
  selector: 'a[hviSkipLink]',
  standalone: true,
  host: {
    class: 'ds-skip-link',
  },
})
export class HviSkipLink {
  private el = inject(ElementRef<HTMLAnchorElement>);

  /**
   * Handles click to prevent Angular Router navigation
   * and instead focus/scroll to the target element.
   */
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const href = this.el.nativeElement.getAttribute('href');
    if (!href?.startsWith('#')) return;

    event.preventDefault();

    const id = href.slice(1);
    const target = document.getElementById(id);

    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
