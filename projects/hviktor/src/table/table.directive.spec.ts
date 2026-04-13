import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviSortableColumn } from './table-sort.directive';
import { HviTable } from './table.directive';

// ========== Test data ==========

interface Person {
  id: number;
  navn: string;
  epost: string;
  avdeling: string;
}

const TEST_DATA: Person[] = [
  { id: 1, navn: 'Ola Nordmann', epost: 'ola@test.no', avdeling: 'IT' },
  { id: 2, navn: 'Kari Hansen', epost: 'kari@test.no', avdeling: 'HR' },
  { id: 3, navn: 'Per Olsen', epost: 'per@test.no', avdeling: 'IT' },
  { id: 4, navn: 'Anna Lie', epost: 'anna@test.no', avdeling: 'Økonomi' },
  { id: 5, navn: 'Erik Berg', epost: 'erik@test.no', avdeling: 'HR' },
  { id: 6, navn: 'Lise Johansen', epost: 'lise@test.no', avdeling: 'IT' },
  { id: 7, navn: 'Jonas Vik', epost: 'jonas@test.no', avdeling: 'Økonomi' },
];

// ========== Test host components ==========

@Component({
  standalone: true,
  imports: [HviTable],
  template: '<table hviTable></table>',
})
class BasicTableComponent {}

@Component({
  standalone: true,
  imports: [HviTable],
  template: '<table hviTable zebra border hover stickyHeader></table>',
})
class StyledTableComponent {}

@Component({
  standalone: true,
  imports: [HviTable],
  selector: 'test-data-table',
  template: `
    <table hviTable [value]="data" #t="hviTable">
      <tbody>
        @for (item of t.filteredValue(); track item.id) {
          <tr>
            <td>{{ item.navn }}</td>
          </tr>
        }
      </tbody>
    </table>
  `,
})
class DataTableComponent {
  data = TEST_DATA;
}

@Component({
  standalone: true,
  imports: [HviTable, HviSortableColumn],
  template: `
    <table hviTable [value]="data" #t="hviTable">
      <thead>
        <tr>
          <th hviSortableColumn="navn"><button type="button">Navn</button></th>
          <th hviSortableColumn="avdeling"><button type="button">Avdeling</button></th>
        </tr>
      </thead>
      <tbody>
        @for (item of t.filteredValue(); track item.id) {
          <tr>
            <td>{{ item.navn }}</td>
            <td>{{ item.avdeling }}</td>
          </tr>
        }
      </tbody>
    </table>
  `,
})
class SortableTableComponent {
  data = TEST_DATA;
}

@Component({
  standalone: true,
  imports: [HviTable],
  template: `
    <table hviTable [value]="data" [globalFilterFields]="['navn', 'epost']" #t="hviTable">
      <tbody>
        @for (item of t.filteredValue(); track item.id) {
          <tr>
            <td>{{ item.navn }}</td>
          </tr>
        }
      </tbody>
    </table>
  `,
})
class GlobalFilterTableComponent {
  data = TEST_DATA;
}

@Component({
  standalone: true,
  imports: [HviTable],
  template: `
    <table hviTable [value]="data" [columns]="['navn', 'epost', 'avdeling']" #t="hviTable">
      <tbody>
        @for (item of t.filteredValue(); track item.id) {
          <tr>
            <td>{{ item.navn }}</td>
          </tr>
        }
      </tbody>
    </table>
  `,
})
class ColumnFilterTableComponent {
  data = TEST_DATA;
}

@Component({
  standalone: true,
  imports: [HviTable],
  template: `
    <table hviTable [value]="data" paginator [rows]="3" #t="hviTable">
      <tbody>
        @for (item of t.paginatedValue(); track item.id) {
          <tr>
            <td>{{ item.navn }}</td>
          </tr>
        }
      </tbody>
    </table>
  `,
})
class PaginatedTableComponent {
  data = TEST_DATA;
}

@Component({
  standalone: true,
  imports: [HviTable],
  selector: 'test-expandable-table',
  template: `
    <table hviTable [value]="data" #t="hviTable">
      <tbody>
        @for (item of t.filteredValue(); track item.id) {
          <tr>
            <td>{{ item.navn }}</td>
          </tr>
        }
      </tbody>
    </table>
  `,
})
class ExpandableTableComponent {
  data = TEST_DATA;
}

@Component({
  standalone: true,
  imports: [HviTable],
  template: `
    <table hviTable [value]="data" [rowId]="rowIdFn" #t="hviTable">
      <tbody>
        @for (item of t.filteredValue(); track item.epost) {
          <tr>
            <td>{{ item.navn }}</td>
          </tr>
        }
      </tbody>
    </table>
  `,
})
class CustomRowIdTableComponent {
  data: Omit<Person, 'id'>[] = [
    { navn: 'Ola', epost: 'ola@test.no', avdeling: 'IT' },
    { navn: 'Kari', epost: 'kari@test.no', avdeling: 'HR' },
  ];
  rowIdFn = (item: Omit<Person, 'id'>) => item.epost;
}

// ========== Tests ==========

describe('HviTable', () => {
  let fixture: ComponentFixture<BasicTableComponent>;
  let element: HTMLTableElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [BasicTableComponent] });
    fixture = TestBed.createComponent(BasicTableComponent);
    fixture.detectChanges();
    element = fixture.nativeElement.querySelector('table');
  });

  it('should create', () => {
    expect(element).toBeTruthy();
  });

  it('should have ds-table host class', () => {
    expect(element.classList.contains('ds-table')).toBe(true);
  });

  it('should not set data attributes when no inputs are provided', () => {
    expect(element.getAttribute('data-zebra')).toBeNull();
    expect(element.getAttribute('data-border')).toBeNull();
    expect(element.getAttribute('data-hover')).toBeNull();
    expect(element.getAttribute('data-sticky-header')).toBeNull();
  });
});

describe('HviTable styling attributes', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [StyledTableComponent] });
  });

  it('should set data-zebra when zebra is true', () => {
    const f = TestBed.createComponent(StyledTableComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('table');
    expect(el.getAttribute('data-zebra')).not.toBeNull();
  });

  it('should set data-border when border is true', () => {
    const f = TestBed.createComponent(StyledTableComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('table');
    expect(el.getAttribute('data-border')).not.toBeNull();
  });

  it('should set data-hover when hover is true', () => {
    const f = TestBed.createComponent(StyledTableComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('table');
    expect(el.getAttribute('data-hover')).not.toBeNull();
  });

  it('should set data-sticky-header when stickyHeader is true', () => {
    const f = TestBed.createComponent(StyledTableComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('table');
    expect(el.getAttribute('data-sticky-header')).not.toBeNull();
  });
});

describe('HviTable data binding', () => {
  let fixture: ComponentFixture<DataTableComponent>;
  let table: HviTable<Person>;

  beforeEach(async () => {
    await setupTestBed({ imports: [DataTableComponent] });
    fixture = TestBed.createComponent(DataTableComponent);
    fixture.detectChanges();
    table = fixture.debugElement.children[0].injector.get(HviTable<Person>);
  });

  it('should expose all records via totalRecords', () => {
    expect(table.totalRecords()).toBe(7);
  });

  it('should expose all records via filteredValue', () => {
    expect(table.filteredValue().length).toBe(7);
  });

  it('should expose totalFilteredRecords matching data length', () => {
    expect(table.totalFilteredRecords()).toBe(7);
  });
});

describe('HviTable sorting', () => {
  let fixture: ComponentFixture<SortableTableComponent>;
  let table: HviTable<Person>;

  beforeEach(async () => {
    await setupTestBed({ imports: [SortableTableComponent] });
    fixture = TestBed.createComponent(SortableTableComponent);
    fixture.detectChanges();
    table = fixture.debugElement.children[0].injector.get(HviTable<Person>);
  });

  it('should have no sort direction initially', () => {
    expect(table.currentSortField()).toBeNull();
    expect(table.currentSortDirection()).toBe('none');
  });

  it('should sort ascending on first call', () => {
    table.sort('navn');
    fixture.detectChanges();

    expect(table.currentSortField()).toBe('navn');
    expect(table.currentSortDirection()).toBe('ascending');

    const names = table.filteredValue().map((p) => p.navn);
    expect(names[0]).toBe('Anna Lie');
    expect(names[names.length - 1]).toBe('Per Olsen');
  });

  it('should sort descending on second call', () => {
    table.sort('navn');
    table.sort('navn');
    fixture.detectChanges();

    expect(table.currentSortDirection()).toBe('descending');

    const names = table.filteredValue().map((p) => p.navn);
    expect(names[0]).toBe('Per Olsen');
    expect(names[names.length - 1]).toBe('Anna Lie');
  });

  it('should clear sort on third call', () => {
    table.sort('navn');
    table.sort('navn');
    table.sort('navn');
    fixture.detectChanges();

    expect(table.currentSortField()).toBeNull();
    expect(table.currentSortDirection()).toBe('none');
  });

  it('should emit sortChange event', () => {
    const events: unknown[] = [];
    table.sortChange.subscribe((e) => events.push(e));

    table.sort('navn');
    expect(events).toEqual([{ field: 'navn', direction: 'ascending' }]);
  });

  it('should use Norwegian locale for sorting', () => {
    table.sort('avdeling');
    fixture.detectChanges();

    const avdelinger = table.filteredValue().map((p) => p.avdeling);
    // "Økonomi" should sort after "IT" in Norwegian
    expect(avdelinger.indexOf('Økonomi')).toBeGreaterThan(avdelinger.indexOf('IT'));
  });

  it('should report sort direction per field via getSortDirection', () => {
    expect(table.getSortDirection('navn')).toBe('none');
    table.sort('navn');
    expect(table.getSortDirection('navn')).toBe('ascending');
    expect(table.getSortDirection('avdeling')).toBe('none');
  });
});

describe('HviTable sortable column directive', () => {
  let fixture: ComponentFixture<SortableTableComponent>;

  beforeEach(async () => {
    await setupTestBed({ imports: [SortableTableComponent] });
    fixture = TestBed.createComponent(SortableTableComponent);
    fixture.detectChanges();
  });

  it('should set aria-sort to none initially', () => {
    const th = fixture.nativeElement.querySelector('th[hviSortableColumn="navn"]');
    expect(th.getAttribute('aria-sort')).toBe('none');
  });

  it('should update aria-sort when sorted via button click', () => {
    const th = fixture.nativeElement.querySelector('th[hviSortableColumn="navn"]');
    const btn = th.querySelector('button');
    btn.click();
    fixture.detectChanges();
    expect(th.getAttribute('aria-sort')).toBe('ascending');
  });

  it('should cycle through sort directions on repeated clicks', () => {
    const th = fixture.nativeElement.querySelector('th[hviSortableColumn="navn"]');
    const btn = th.querySelector('button');

    btn.click();
    fixture.detectChanges();
    expect(th.getAttribute('aria-sort')).toBe('ascending');

    btn.click();
    fixture.detectChanges();
    expect(th.getAttribute('aria-sort')).toBe('descending');

    btn.click();
    fixture.detectChanges();
    expect(th.getAttribute('aria-sort')).toBe('none');
  });
});

describe('HviTable global filtering', () => {
  let fixture: ComponentFixture<GlobalFilterTableComponent>;
  let table: HviTable<Person>;

  beforeEach(async () => {
    await setupTestBed({ imports: [GlobalFilterTableComponent] });
    fixture = TestBed.createComponent(GlobalFilterTableComponent);
    fixture.detectChanges();
    table = fixture.debugElement.children[0].injector.get(HviTable<Person>);
  });

  it('should show all rows when no filter applied', () => {
    expect(table.totalFilteredRecords()).toBe(7);
  });

  it('should filter by name', () => {
    table.filterGlobal('Ola');
    fixture.detectChanges();
    expect(table.totalFilteredRecords()).toBe(1);
    expect(table.filteredValue()[0].navn).toBe('Ola Nordmann');
  });

  it('should filter by email', () => {
    table.filterGlobal('kari@');
    fixture.detectChanges();
    expect(table.totalFilteredRecords()).toBe(1);
  });

  it('should not filter by avdeling (not in globalFilterFields)', () => {
    table.filterGlobal('Økonomi');
    fixture.detectChanges();
    expect(table.totalFilteredRecords()).toBe(0);
  });

  it('should be case insensitive', () => {
    table.filterGlobal('ola');
    fixture.detectChanges();
    expect(table.totalFilteredRecords()).toBe(1);
  });

  it('should clear filter', () => {
    table.filterGlobal('Ola');
    fixture.detectChanges();
    expect(table.totalFilteredRecords()).toBe(1);

    table.clearFilter();
    fixture.detectChanges();
    expect(table.totalFilteredRecords()).toBe(7);
  });

  it('should expose current global filter value', () => {
    expect(table.currentGlobalFilter()).toBe('');
    table.filterGlobal('test');
    expect(table.currentGlobalFilter()).toBe('test');
  });

  it('should handle null filter value', () => {
    table.filterGlobal(null);
    fixture.detectChanges();
    expect(table.totalFilteredRecords()).toBe(7);
  });
});

describe('HviTable column filtering', () => {
  let fixture: ComponentFixture<ColumnFilterTableComponent>;
  let table: HviTable<Person>;

  beforeEach(async () => {
    await setupTestBed({ imports: [ColumnFilterTableComponent] });
    fixture = TestBed.createComponent(ColumnFilterTableComponent);
    fixture.detectChanges();
    table = fixture.debugElement.children[0].injector.get(HviTable<Person>);
  });

  it('should filter by single column', () => {
    table.setColumnFilter('avdeling', 'IT');
    fixture.detectChanges();
    expect(table.totalFilteredRecords()).toBe(3);
    expect(table.filteredValue().every((p) => p.avdeling === 'IT')).toBe(true);
  });

  it('should return filter value for a column', () => {
    expect(table.getColumnFilterValue('avdeling')).toBeUndefined();
    table.setColumnFilter('avdeling', 'HR');
    expect(table.getColumnFilterValue('avdeling')).toBe('HR');
  });

  it('should clear filter for a specific column', () => {
    table.setColumnFilter('avdeling', 'IT');
    fixture.detectChanges();
    expect(table.totalFilteredRecords()).toBe(3);

    table.clearColumnFilter('avdeling');
    fixture.detectChanges();
    expect(table.totalFilteredRecords()).toBe(7);
  });

  it('should clear all column filters', () => {
    table.setColumnFilter('avdeling', 'IT');
    table.setColumnFilter('navn', 'Ola Nordmann');
    fixture.detectChanges();

    table.clearAllColumnFilters();
    fixture.detectChanges();
    expect(table.totalFilteredRecords()).toBe(7);
  });

  it('should remove filter when value is empty string', () => {
    table.setColumnFilter('avdeling', 'IT');
    fixture.detectChanges();
    expect(table.totalFilteredRecords()).toBe(3);

    table.setColumnFilter('avdeling', '');
    fixture.detectChanges();
    expect(table.totalFilteredRecords()).toBe(7);
  });
});

describe('HviTable pagination', () => {
  let fixture: ComponentFixture<PaginatedTableComponent>;
  let table: HviTable<Person>;

  beforeEach(async () => {
    await setupTestBed({ imports: [PaginatedTableComponent] });
    fixture = TestBed.createComponent(PaginatedTableComponent);
    fixture.detectChanges();
    table = fixture.debugElement.children[0].injector.get(HviTable<Person>);
  });

  it('should show first page with correct row count', () => {
    expect(table.paginatedValue().length).toBe(3);
    expect(table.currentPage()).toBe(1);
  });

  it('should calculate total pages', () => {
    expect(table.pageCount()).toBe(3); // 7 items / 3 per page = 3 pages
  });

  it('should navigate to next page', () => {
    table.goToNextPage();
    fixture.detectChanges();
    expect(table.currentPage()).toBe(2);
    expect(table.paginatedValue().length).toBe(3);
  });

  it('should navigate to last page', () => {
    table.goToLastPage();
    fixture.detectChanges();
    expect(table.currentPage()).toBe(3);
    expect(table.paginatedValue().length).toBe(1); // 7 % 3 = 1
  });

  it('should navigate to specific page', () => {
    table.goToPage(2);
    fixture.detectChanges();
    expect(table.currentPage()).toBe(2);
  });

  it('should clamp page to valid range', () => {
    table.goToPage(100);
    fixture.detectChanges();
    expect(table.currentPage()).toBe(3);

    table.goToPage(0);
    fixture.detectChanges();
    expect(table.currentPage()).toBe(1);
  });

  it('should report isFirstPage and isLastPage', () => {
    expect(table.isFirstPage()).toBe(true);
    expect(table.isLastPage()).toBe(false);

    table.goToLastPage();
    fixture.detectChanges();
    expect(table.isFirstPage()).toBe(false);
    expect(table.isLastPage()).toBe(true);
  });

  it('should navigate to previous page', () => {
    table.goToPage(3);
    table.goToPreviousPage();
    fixture.detectChanges();
    expect(table.currentPage()).toBe(2);
  });

  it('should not go before first page', () => {
    table.goToPreviousPage();
    fixture.detectChanges();
    expect(table.currentPage()).toBe(1);
  });

  it('should not go past last page', () => {
    table.goToLastPage();
    table.goToNextPage();
    fixture.detectChanges();
    expect(table.currentPage()).toBe(3);
  });

  it('should change rows per page', () => {
    table.setRows(5);
    fixture.detectChanges();
    expect(table.paginatedValue().length).toBe(5);
    expect(table.pageCount()).toBe(2);
  });

  it('should emit pageChange and currentPageChange events', () => {
    const pageEvents: unknown[] = [];
    const currentPageEvents: number[] = [];
    table.pageChange.subscribe((e) => pageEvents.push(e));
    table.currentPageChange.subscribe((e) => currentPageEvents.push(e));

    table.goToPage(2);
    expect(pageEvents.length).toBe(1);
    expect(currentPageEvents).toEqual([2]);
  });

  it('should reset to first page on global filter', () => {
    table.goToPage(3);
    fixture.detectChanges();
    expect(table.currentPage()).toBe(3);

    table.filterGlobal('Ola');
    fixture.detectChanges();
    expect(table.currentPage()).toBe(1);
  });
});

describe('HviTable row expansion', () => {
  let fixture: ComponentFixture<ExpandableTableComponent>;
  let table: HviTable<Person>;

  beforeEach(async () => {
    await setupTestBed({ imports: [ExpandableTableComponent] });
    fixture = TestBed.createComponent(ExpandableTableComponent);
    fixture.detectChanges();
    table = fixture.debugElement.children[0].injector.get(HviTable<Person>);
  });

  it('should not have any expanded rows initially', () => {
    expect(table.isExpanded(TEST_DATA[0])).toBe(false);
    expect(table.isExpanded(TEST_DATA[1])).toBe(false);
  });

  it('should expand a row', () => {
    table.toggleExpanded(TEST_DATA[0]);
    fixture.detectChanges();
    expect(table.isExpanded(TEST_DATA[0])).toBe(true);
    expect(table.isExpanded(TEST_DATA[1])).toBe(false);
  });

  it('should collapse an expanded row', () => {
    table.toggleExpanded(TEST_DATA[0]);
    fixture.detectChanges();
    expect(table.isExpanded(TEST_DATA[0])).toBe(true);

    table.toggleExpanded(TEST_DATA[0]);
    fixture.detectChanges();
    expect(table.isExpanded(TEST_DATA[0])).toBe(false);
  });

  it('should expand multiple rows', () => {
    table.toggleExpanded(TEST_DATA[0]);
    table.toggleExpanded(TEST_DATA[2]);
    fixture.detectChanges();
    expect(table.isExpanded(TEST_DATA[0])).toBe(true);
    expect(table.isExpanded(TEST_DATA[1])).toBe(false);
    expect(table.isExpanded(TEST_DATA[2])).toBe(true);
  });

  it('should collapse all rows', () => {
    table.toggleExpanded(TEST_DATA[0]);
    table.toggleExpanded(TEST_DATA[1]);
    fixture.detectChanges();
    expect(table.isExpanded(TEST_DATA[0])).toBe(true);
    expect(table.isExpanded(TEST_DATA[1])).toBe(true);

    table.collapseAll();
    fixture.detectChanges();
    expect(table.isExpanded(TEST_DATA[0])).toBe(false);
    expect(table.isExpanded(TEST_DATA[1])).toBe(false);
  });
});

describe('HviTable custom rowId', () => {
  let fixture: ComponentFixture<CustomRowIdTableComponent>;
  let table: HviTable<Omit<Person, 'id'>>;

  beforeEach(async () => {
    await setupTestBed({ imports: [CustomRowIdTableComponent] });
    fixture = TestBed.createComponent(CustomRowIdTableComponent);
    fixture.detectChanges();
    table = fixture.debugElement.children[0].injector.get(HviTable<Omit<Person, 'id'>>);
  });

  it('should use custom rowId function for expansion', () => {
    const item = fixture.componentInstance.data[0];
    table.toggleExpanded(item);
    fixture.detectChanges();
    expect(table.isExpanded(item)).toBe(true);
  });
});

describe('HviTable clear/reset', () => {
  let fixture: ComponentFixture<PaginatedTableComponent>;
  let table: HviTable<Person>;

  beforeEach(async () => {
    await setupTestBed({ imports: [PaginatedTableComponent] });
    fixture = TestBed.createComponent(PaginatedTableComponent);
    fixture.detectChanges();
    table = fixture.debugElement.children[0].injector.get(HviTable<Person>);
  });

  it('should reset all state', () => {
    table.sort('navn');
    table.filterGlobal('test');
    table.goToPage(2);
    table.toggleExpanded(TEST_DATA[0]);
    fixture.detectChanges();

    table.clear();
    fixture.detectChanges();

    expect(table.currentSortField()).toBeNull();
    expect(table.currentGlobalFilter()).toBe('');
    expect(table.currentPage()).toBe(1);
    expect(table.isExpanded(TEST_DATA[0])).toBe(false);
  });
});
