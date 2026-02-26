import { Directive, HostListener, inject, Input } from '@angular/core';
import { HviTable, SortDirection } from './table.directive';

/**
 * @summary
 * Directive for sorterbare tabell-header celler.
 * Kommuniserer automatisk med parent HviTable for å håndtere sortering.
 *
 * @example
 * ```html
 * <table hviTable [value]="persons" #table>
 *   <thead>
 *     <tr>
 *       <th hviSortableColumn="navn">
 *         <button>Navn</button>
 *       </th>
 *       <th>Epost</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     @for (person of table.sortedValue(); track person.id) {
 *       <tr>
 *         <td>{{ person.navn }}</td>
 *         <td>{{ person.epost }}</td>
 *       </tr>
 *     }
 *   </tbody>
 * </table>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/docs/table/code}
 */
@Directive({
  selector: 'th[hviSortableColumn]',
  standalone: true,
  host: {
    '[attr.aria-sort]': 'sortDirection',
  },
})
export class HviSortableColumn {
  private table = inject(HviTable, { optional: true });

  /**
   * Feltet som denne kolonnen sorterer etter.
   * Må matche property-navn i data-objektene.
   */
  @Input({ required: true, alias: 'hviSortableColumn' }) field!: string;

  /**
   * Henter sorteringsretning fra parent table.
   */
  get sortDirection(): SortDirection {
    return this.table?.getSortDirection(this.field) ?? 'none';
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    // Bare håndter klikk på button inne i th
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      this.table?.sort(this.field);
    }
  }
}

// Re-export SortDirection for convenience
export type { SortDirection } from './table.directive';
