import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviPagination } from './pagination.component';

describe('HviPagination', () => {
  let fixture: ComponentFixture<HviPagination>;
  let el: HTMLElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [HviPagination] });
    fixture = TestBed.createComponent(HviPagination);
    fixture.componentRef.setInput('totalItems', 100);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.componentRef.setInput('currentPage', 3);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should mark the current page with aria-current while keeping tertiary styling', () => {
    const currentPageButton = el.querySelector('button[aria-label="Side 3"]');
    const otherPageButton = el.querySelector('button[aria-label="Side 2"]');

    expect(currentPageButton?.getAttribute('data-variant')).toBe('tertiary');
    expect(currentPageButton?.getAttribute('aria-current')).toBe('true');
    expect(otherPageButton?.getAttribute('data-variant')).toBe('tertiary');
    expect(otherPageButton?.getAttribute('aria-current')).toBeNull();
  });

  it('should keep previous and next buttons tertiary', () => {
    const previousButton = el.querySelector('button[aria-label="Forrige side"]');
    const nextButton = el.querySelector('button[aria-label="Neste side"]');

    expect(previousButton?.getAttribute('data-variant')).toBe('tertiary');
    expect(nextButton?.getAttribute('data-variant')).toBe('tertiary');
  });
});
