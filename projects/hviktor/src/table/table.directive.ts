import {
  booleanAttribute,
  computed,
  Directive,
  EventEmitter,
  Input,
  numberAttribute,
  Output,
  signal,
} from '@angular/core';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingFn,
  type SortingState,
  type Updater,
  createAngularTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/angular-table';

/** Sorteringsretninger for tabell-kolonner */
export type SortDirection = 'none' | 'ascending' | 'descending';

/** Event som emitteres ved sorteringsendring */
export interface TableSortEvent {
  field: string;
  direction: SortDirection;
}

/** Event som emitteres ved sideendring */
export interface TablePageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

/**
 * @summary
 * Table brukes for å vise strukturert informasjon på en ryddig og oversiktlig måte.
 * Tabeller kan gjøre det enklere for brukerne å skanne og sammenligne informasjon.
 *
 * Bruker TanStack Table for sortering, filtrering og paginering under panseret,
 * men eksponerer et enkelt API som skjuler denne kompleksiteten.
 *
 * @example
 * ```html
 * <!-- Enkel tabell med styling -->
 * <table hviTable zebra border>
 *   <thead><tr><th>Navn</th></tr></thead>
 *   <tbody><tr><td>Ola</td></tr></tbody>
 * </table>
 *
 * <!-- Tabell med data, sortering, søk og paginering -->
 * <table hviTable [value]="personer" [globalFilterFields]="['navn', 'epost']"
 *   paginator [rows]="5" #table="hviTable">
 *   <caption>
 *     <input type="search" (input)="table.filterGlobal($any($event.target).value)" />
 *   </caption>
 *   <thead>
 *     <tr>
 *       <th hviSortableColumn="navn"><button type="button">Navn</button></th>
 *       <th>Epost</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     @for (person of table.paginatedValue(); track person.id) {
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
  selector: '[hviTable]',
  standalone: true,
  exportAs: 'hviTable',
  host: {
    class: 'ds-table',
    '[attr.data-zebra]': 'zebra || null',
    '[attr.data-border]': 'border || null',
    '[attr.data-hover]': 'hover || null',
    '[attr.data-sticky-header]': 'stickyHeader || null',
  },
})
export class HviTable<T = unknown> {
  /** Gir tabellen zebrastriper (annenhver rad har alternativ bakgrunn) */
  @Input({ transform: booleanAttribute }) zebra = false;

  /** Gir tabellen en avrundet kant rundt */
  @Input({ transform: booleanAttribute }) border = false;

  /** Gir tabellen hover-effekt på rader */
  @Input({ transform: booleanAttribute }) hover = false;

  /** Gjør tabellens header sticky (fester seg til toppen ved scrolling) */
  @Input({ transform: booleanAttribute }) stickyHeader = false;

  /** Aktiver paginering */
  @Input({ transform: booleanAttribute }) paginator = false;

  /** Data som skal vises i tabellen */
  @Input()
  set value(data: T[] | null | undefined) {
    this._data.set(data ?? []);
  }

  /**
   * Felt som global søk skal søke i.
   * Om ikke satt, søkes det i alle auto-detekterte felter.
   */
  @Input()
  set globalFilterFields(fields: string[] | null | undefined) {
    this._globalFilterFields.set(fields ?? []);
  }

  /**
   * Eksplisitte kolonner. Om ikke satt, auto-detekteres fra data.
   * Nødvendig for nested felt (f.eks. 'adresse.by').
   */
  @Input()
  set columns(cols: string[] | null | undefined) {
    this._explicitColumns.set(cols ?? []);
  }

  /**
   * Felt eller funksjon som gir unik ID for hver rad.
   * Brukes for row expansion. Standard: 'id'.
   */
  @Input() rowId: string | ((item: T) => unknown) = 'id';

  /** Antall rader per side (når paginator er aktivert) */
  @Input({ transform: numberAttribute })
  set rows(v: number) {
    this._pageSize.set(v);
  }

  /** Felt som data skal sorteres etter (valgfri initial verdi) */
  @Input()
  set sortField(field: string | null | undefined) {
    if (field) {
      const current = this._sorting();
      this._sorting.set([{ id: field, desc: current[0]?.desc ?? false }]);
    }
  }

  /** Sorteringsretning: 1 = ascending, -1 = descending */
  @Input()
  set sortOrder(order: number) {
    const current = this._sorting();
    if (current.length > 0) {
      this._sorting.set([{ ...current[0], desc: order === -1 }]);
    }
  }

  /** Event som emitteres når sortering endres */
  @Output() sortChange = new EventEmitter<TableSortEvent>();

  /** Event som emitteres når side endres */
  @Output() pageChange = new EventEmitter<TablePageEvent>();

  /** Event som emitteres med nåværende side (1-basert, for two-way binding) */
  @Output() currentPageChange = new EventEmitter<number>();

  // ========== Intern state ==========

  private _data = signal<T[]>([]);
  private _globalFilterFields = signal<string[]>([]);
  private _explicitColumns = signal<string[]>([]);
  private _sorting = signal<SortingState>([]);
  private _columnFilters = signal<ColumnFiltersState>([]);
  private _globalFilter = signal('');
  private _pageSize = signal(10);
  private _pageIndex = signal(0);
  private _expandedRows = signal(new Set<unknown>());

  /** Norsk sorteringsfunksjon med localeCompare('nb') */
  private norwegianSortFn: SortingFn<T> = (
    rowA: Row<T>,
    rowB: Row<T>,
    columnId: string,
  ): number => {
    const a = rowA.getValue(columnId);
    const b = rowB.getValue(columnId);
    if (a == null && b == null) return 0;
    if (a == null) return -1;
    if (b == null) return 1;
    if (typeof a === 'number' && typeof b === 'number') return a - b;
    if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
    return String(a).localeCompare(String(b), 'nb');
  };

  /** Auto-detekterte eller eksplisitte feltnavn */
  private _fields = computed(() => {
    const explicit = this._explicitColumns();
    if (explicit.length > 0) return explicit;

    const data = this._data();
    const globalFields = this._globalFilterFields();
    const detected = data.length > 0 ? Object.keys(data[0] as object) : [];
    return [...new Set([...detected, ...globalFields])];
  });

  /** TanStack kolonne-definisjoner generert fra felter */
  private _columnDefs = computed<ColumnDef<T, unknown>[]>(() => {
    const fields = this._fields();
    const globalFields = this._globalFilterFields();
    const hasGlobalFields = globalFields.length > 0;

    return fields.map((field) => ({
      id: field,
      accessorFn: (row: T) => this.getFieldValue(row, field),
      enableGlobalFilter: !hasGlobalFields || globalFields.includes(field),
      sortingFn: this.norwegianSortFn,
    }));
  });

  /** TanStack Table — all state management delegert hit */
  private _table = createAngularTable<T>(() => ({
    data: this._data(),
    columns: this._columnDefs(),
    state: {
      sorting: this._sorting(),
      columnFilters: this._columnFilters(),
      globalFilter: this._globalFilter(),
      pagination: {
        pageIndex: this._pageIndex(),
        pageSize: this._pageSize(),
      },
    },
    onSortingChange: (updater: Updater<SortingState>) => {
      this._sorting.update((prev) => (typeof updater === 'function' ? updater(prev) : updater));
    },
    onColumnFiltersChange: (updater: Updater<ColumnFiltersState>) => {
      this._columnFilters.update((prev) =>
        typeof updater === 'function' ? updater(prev) : updater,
      );
    },
    onGlobalFilterChange: (updater: Updater<string>) => {
      this._globalFilter.update((prev) =>
        typeof updater === 'function' ? updater(prev) : updater,
      );
    },
    onPaginationChange: (updater: Updater<{ pageIndex: number; pageSize: number }>) => {
      const prev = {
        pageIndex: this._pageIndex(),
        pageSize: this._pageSize(),
      };
      const next = typeof updater === 'function' ? updater(prev) : updater;
      this._pageIndex.set(next.pageIndex);
      this._pageSize.set(next.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
  }));

  // ========== Offentlig API — computed verdier ==========

  /** Filtrert og sortert data (uten paginering) */
  readonly filteredValue = computed<T[]>(() =>
    this._table.getSortedRowModel().rows.map((r) => r.original),
  );

  /** Paginert, filtrert og sortert data — bruk denne når paginator er aktivert */
  readonly paginatedValue = computed<T[]>(() => {
    if (!this.paginator) return this.filteredValue();
    return this._table.getPaginationRowModel().rows.map((r) => r.original);
  });

  /** Antall rader etter filtrering */
  readonly totalFilteredRecords = computed(() => this._table.getFilteredRowModel().rows.length);

  /** Antall rader totalt (før filtrering) */
  readonly totalRecords = computed(() => this._data().length);

  /** Totalt antall sider */
  readonly pageCount = computed(() => {
    if (!this.paginator) return 1;
    return this._table.getPageCount();
  });

  /** Nåværende side (1-basert) */
  readonly currentPage = computed(() => this._pageIndex() + 1);

  /** Er vi på første side? */
  readonly isFirstPage = computed(() => this._pageIndex() === 0);

  /** Er vi på siste side? */
  readonly isLastPage = computed(() => {
    const pages = this.pageCount();
    return this._pageIndex() >= pages - 1;
  });

  /** Nåværende sorteringsfelt */
  readonly currentSortField = computed(() => this._sorting()[0]?.id ?? null);

  /** Nåværende sorteringsretning */
  readonly currentSortDirection = computed<SortDirection>(() => {
    const sort = this._sorting()[0];
    if (!sort) return 'none';
    return sort.desc ? 'descending' : 'ascending';
  });

  /** Nåværende søkeverdi */
  readonly currentGlobalFilter = computed(() => this._globalFilter());

  // ========== Global søk ==========

  /**
   * Global søk — søker på tvers av alle felt i globalFilterFields.
   * @param value Søkeverdi
   */
  filterGlobal(value: string | null): void {
    this._globalFilter.set(value?.trim() ?? '');
    this._pageIndex.set(0);
  }

  /** Nullstiller global søk */
  clearFilter(): void {
    this._globalFilter.set('');
    this._pageIndex.set(0);
  }

  // ========== Column filtering ==========

  /** Sett filter for en spesifikk kolonne */
  setColumnFilter(field: string, value: unknown): void {
    this._columnFilters.update((prev) => {
      const next = prev.filter((f) => f.id !== field);
      if (value !== undefined && value !== null && value !== '') {
        next.push({ id: field, value });
      }
      return next;
    });
    this._pageIndex.set(0);
  }

  /** Fjern filter for en spesifikk kolonne */
  clearColumnFilter(field: string): void {
    this._columnFilters.update((prev) => prev.filter((f) => f.id !== field));
    this._pageIndex.set(0);
  }

  /** Fjern alle kolonnefiltre */
  clearAllColumnFilters(): void {
    this._columnFilters.set([]);
    this._pageIndex.set(0);
  }

  /** Hent nåværende filterverdi for en kolonne */
  getColumnFilterValue(field: string): unknown {
    return this._columnFilters().find((f) => f.id === field)?.value;
  }

  // ========== Sortering ==========

  /**
   * Sorterer tabellen etter et felt.
   * Sykler gjennom: none → ascending → descending → none.
   * Kalles av HviSortableColumn.
   */
  sort(field: string): void {
    const current = this._sorting();
    const existing = current.find((s) => s.id === field);

    let newSorting: SortingState;
    if (!existing) {
      newSorting = [{ id: field, desc: false }];
    } else if (!existing.desc) {
      newSorting = [{ id: field, desc: true }];
    } else {
      newSorting = [];
    }

    this._sorting.set(newSorting);

    const direction: SortDirection = !newSorting.length
      ? 'none'
      : newSorting[0].desc
        ? 'descending'
        : 'ascending';
    this.sortChange.emit({ field, direction });
  }

  /**
   * Henter sorteringsretning for et spesifikt felt.
   * Brukes av HviSortableColumn for å vise riktig aria-sort.
   */
  getSortDirection(field: string): SortDirection {
    const sort = this._sorting().find((s) => s.id === field);
    if (!sort) return 'none';
    return sort.desc ? 'descending' : 'ascending';
  }

  // ========== Row expansion ==========

  /** Åpne eller lukk utvidet innhold for en rad */
  toggleExpanded(item: T): void {
    const id = this.getRowId(item);
    const next = new Set(this._expandedRows());
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    this._expandedRows.set(next);
  }

  /** Sjekk om en rad har utvidet innhold åpent */
  isExpanded(item: T): boolean {
    return this._expandedRows().has(this.getRowId(item));
  }

  /** Lukk alle utviddede rader */
  collapseAll(): void {
    this._expandedRows.set(new Set());
  }

  // ========== Paginering ==========

  /** Gå til en spesifikk side (1-basert) */
  goToPage(page: number): void {
    const totalPages = this.pageCount();
    const validPage = Math.max(1, Math.min(page, totalPages));
    if (validPage !== this.currentPage()) {
      this._pageIndex.set(validPage - 1);
      this.emitPageEvent();
    }
  }

  /** Gå til første side */
  goToFirstPage(): void {
    this.goToPage(1);
  }

  /** Gå til siste side */
  goToLastPage(): void {
    this.goToPage(this.pageCount());
  }

  /** Gå til forrige side */
  goToPreviousPage(): void {
    if (!this.isFirstPage()) {
      this.goToPage(this.currentPage() - 1);
    }
  }

  /** Gå til neste side */
  goToNextPage(): void {
    if (!this.isLastPage()) {
      this.goToPage(this.currentPage() + 1);
    }
  }

  /** Endre antall rader per side */
  setRows(rows: number): void {
    this._pageSize.set(rows);
    this._pageIndex.set(0);
    this.emitPageEvent();
  }

  // ========== Reset ==========

  /** Nullstiller hele tabellen (sortering, filtre, søk, paginering og expansion) */
  clear(): void {
    this._sorting.set([]);
    this._columnFilters.set([]);
    this._globalFilter.set('');
    this._pageIndex.set(0);
    this._expandedRows.set(new Set());
  }

  // ========== Private ==========

  private emitPageEvent(): void {
    this.pageChange.emit({
      first: this._pageIndex() * this._pageSize(),
      rows: this._pageSize(),
      page: this.currentPage(),
      pageCount: this.pageCount(),
    });
    this.currentPageChange.emit(this.currentPage());
  }

  /** Henter verdi fra et objekt basert på felt-path (støtter nested: "user.name") */
  private getFieldValue(obj: T, field: string): unknown {
    const keys = field.split('.');
    let value: unknown = obj;
    for (const key of keys) {
      if (value == null) return null;
      value = (value as Record<string, unknown>)[key];
    }
    return value;
  }

  private getRowId(item: T): unknown {
    if (typeof this.rowId === 'function') return this.rowId(item);
    return this.getFieldValue(item, this.rowId);
  }
}
