import {
  booleanAttribute,
  Component,
  computed,
  EventEmitter,
  Input,
  numberAttribute,
  Output,
  signal,
} from '@angular/core';

/** Type for hvert element i pagineringslisten */
export type PaginationItem =
  | { type: 'page'; page: number }
  | { type: 'ellipsis' }
  | { type: 'previous' }
  | { type: 'next' };

/** Event som emitteres ved sideendring */
export interface PageChangeEvent {
  page: number;
  previousPage: number;
}

/**
 * @summary
 * Pagination er en liste med knapper som brukes for å navigere mellom
 * ulike sider med innhold, for eksempel søkeresultater eller tabeller.
 *
 * @example
 * ```html
 * <hvi-pagination
 *   [totalItems]="100"
 *   [pageSize]="10"
 *   [(currentPage)]="currentPage"
 * />
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/docs/pagination/code}
 */
@Component({
  selector: 'hvi-pagination',
  standalone: true,
  template: `
    <nav [attr.aria-label]="ariaLabel" class="ds-pagination">
      <ul>
        <!-- Forrige -->
        <li>
          <button
            class="ds-button"
            data-variant="tertiary"
            type="button"
            [attr.aria-label]="previousLabel"
            [disabled]="isFirstPage()"
            (click)="goToPrevious()"
          >
            {{ showPreviousNextLabels ? previousLabel : '' }}
          </button>
        </li>

        <!-- Sidetall -->
        @for (item of paginationItems(); track $index) {
          @if (item.type === 'page') {
            <li>
              <button
                class="ds-button"
                [attr.data-variant]="item.page === _currentPage() ? 'primary' : 'tertiary'"
                type="button"
                [attr.aria-label]="'Side ' + item.page"
                [attr.aria-current]="item.page === _currentPage() ? 'page' : null"
                (click)="goToPage(item.page)"
              >
                {{ item.page }}
              </button>
            </li>
          } @else if (item.type === 'ellipsis') {
            <li></li>
          }
        }

        <!-- Neste -->
        <li>
          <button
            class="ds-button"
            data-variant="tertiary"
            type="button"
            [attr.aria-label]="nextLabel"
            [disabled]="isLastPage()"
            (click)="goToNext()"
          >
            {{ showPreviousNextLabels ? nextLabel : '' }}
          </button>
        </li>
      </ul>
    </nav>
  `,
  host: {
    class: 'hvi-pagination',
  },
})
export class HviPagination {
  /** Totalt antall elementer som pagineres */
  @Input({ transform: numberAttribute, required: true })
  set totalItems(value: number) {
    this._totalItems.set(value);
  }

  /** Antall elementer per side */
  @Input({ transform: numberAttribute })
  set pageSize(value: number) {
    this._pageSize.set(value);
  }

  /** Nåværende side (1-indeksert) */
  @Input({ transform: numberAttribute })
  set currentPage(value: number) {
    this._currentPage.set(value);
  }

  /** Antall sider som skal vises rundt nåværende side */
  @Input({ transform: numberAttribute }) siblingCount = 1;

  /** Vis alltid første og siste side */
  @Input({ transform: booleanAttribute }) showEdges = true;

  /** Vis "Forrige" og "Neste" tekst på knappene */
  @Input({ transform: booleanAttribute }) showPreviousNextLabels = true;

  /** Aria-label for hele navigasjonen */
  @Input() ariaLabel = 'Sidenavigering';

  /** Tekst for forrige-knappen */
  @Input() previousLabel = 'Forrige';

  /** Tekst for neste-knappen */
  @Input() nextLabel = 'Neste';

  /** Event som emitteres når siden endres */
  @Output() currentPageChange = new EventEmitter<number>();

  /** Event som emitteres med mer detaljer om sideendring */
  @Output() pageChange = new EventEmitter<PageChangeEvent>();

  // Internal signals
  readonly _totalItems = signal(0);
  readonly _pageSize = signal(10);
  readonly _currentPage = signal(1);

  /** Beregnet totalt antall sider */
  readonly totalPages = computed(() => {
    return Math.max(1, Math.ceil(this._totalItems() / this._pageSize()));
  });

  /** Er vi på første side? */
  readonly isFirstPage = computed(() => this._currentPage() <= 1);

  /** Er vi på siste side? */
  readonly isLastPage = computed(() => this._currentPage() >= this.totalPages());

  /** Beregner hvilke elementer som skal vises i pagineringen */
  readonly paginationItems = computed<PaginationItem[]>(() => {
    const current = this._currentPage();
    const total = this.totalPages();
    const siblings = this.siblingCount;

    if (total <= 1) return [];

    const items: PaginationItem[] = [];

    // Beregn range rundt nåværende side
    const leftSibling = Math.max(current - siblings, 1);
    const rightSibling = Math.min(current + siblings, total);

    const showLeftEllipsis = this.showEdges && leftSibling > 2;
    const showRightEllipsis = this.showEdges && rightSibling < total - 1;

    // Første side (hvis showEdges)
    if (this.showEdges && leftSibling > 1) {
      items.push({ type: 'page', page: 1 });
      if (showLeftEllipsis) {
        items.push({ type: 'ellipsis' });
      }
    }

    // Sider rundt nåværende
    for (let page = leftSibling; page <= rightSibling; page++) {
      items.push({ type: 'page', page });
    }

    // Siste side (hvis showEdges)
    if (this.showEdges && rightSibling < total) {
      if (showRightEllipsis) {
        items.push({ type: 'ellipsis' });
      }
      items.push({ type: 'page', page: total });
    }

    return items;
  });

  /** Gå til en spesifikk side */
  goToPage(page: number): void {
    const previousPage = this._currentPage();
    const newPage = Math.max(1, Math.min(page, this.totalPages()));

    if (newPage !== previousPage) {
      this._currentPage.set(newPage);
      this.currentPageChange.emit(newPage);
      this.pageChange.emit({ page: newPage, previousPage });
    }
  }

  /** Gå til forrige side */
  goToPrevious(): void {
    if (!this.isFirstPage()) {
      this.goToPage(this._currentPage() - 1);
    }
  }

  /** Gå til neste side */
  goToNext(): void {
    if (!this.isLastPage()) {
      this.goToPage(this._currentPage() + 1);
    }
  }

  /** Gå til første side */
  goToFirst(): void {
    this.goToPage(1);
  }

  /** Gå til siste side */
  goToLast(): void {
    this.goToPage(this.totalPages());
  }
}
