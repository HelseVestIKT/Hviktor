import { Directive, ElementRef, HostListener, inject } from '@angular/core';

/**
 * @summary
 * SearchClear is a button directive for clearing the search input.
 * It automatically finds the input field inside the parent `hvi-search` component and clears it.
 *
 * @example
 * ```html
 * <hvi-search>
 *   <input hviInput type="search" placeholder="" aria-label="Søk" />
 *   <button hviSearchClear type="reset" aria-label="Tøm"></button>
 *   <button hviButton variant="primary" type="submit">Søk</button>
 * </hvi-search>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/search}
 */
@Directive({
  selector: 'button[hviSearchClear]',
  standalone: true,
  host: {
    class: 'ds-button',
    '[attr.data-icon]': '"true"',
    '[attr.data-variant]': '"tertiary"',
    type: 'reset',
  },
})
export class HviSearchClear {
  private readonly elementRef = inject(ElementRef<HTMLButtonElement>);

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    // Prevent default reset behavior (only works in forms anyway)
    event.preventDefault();

    const searchContainer = this.elementRef.nativeElement.closest('.ds-search');
    if (!searchContainer) return;

    const input = searchContainer.querySelector('input') as HTMLInputElement | null;
    if (input) {
      input.value = '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.focus();
    }
  }
}
