import { Directive, inject, Input } from '@angular/core';
import { HviTable, type SortDirection } from './table.directive';

/**
 * @summary
 * Directive for sorterbare tabell-header celler.
 * Kommuniserer automatisk med parent HviTable for å håndtere sortering.
 * Bruker Designsystemets innebygde sorterings-UI (aria-sort + button-ikon).
 *
 * @example
 * ```html
 * <table hviTable [value]="persons" #table="hviTable">
 *   <thead>
 *     <tr>
 *       <th hviSortableColumn="navn">
 *         <button type="button">Navn</button>
 *       </th>
 *       <th>Epost</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     @for (person of table.filteredValue(); track person.id) {
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
    '(click)': 'onClick($event)',
  },
})
export class HviSortableColumn {
  private table = inject(HviTable, { optional: true });

  /**
   * Feltet som denne kolonnen sorterer etter.
   * Må matche property-navn i data-objektene.
   */
  @Input({ required: true, alias: 'hviSortableColumn' }) field!: string;

  /** Henter sorteringsretning fra parent table */
  get sortDirection(): SortDirection {
    return this.table?.getSortDirection(this.field) ?? 'none';
  }

  protected onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      this.table?.sort(this.field);
    }
  }
}
