import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviBreadcrumbs } from './breadcrumbs.component';

describe('HviBreadcrumbs', () => {
  let fixture: ComponentFixture<HviBreadcrumbs>;
  let element: HTMLElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [HviBreadcrumbs] });
    fixture = TestBed.createComponent(HviBreadcrumbs);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should render a ds-breadcrumbs element', () => {
    expect(element.querySelector('ds-breadcrumbs')).toBeTruthy();
  });
});

@Component({
  standalone: true,
  imports: [HviBreadcrumbs],
  template: `
    <hvi-breadcrumbs>
      <a class="ds-link" href="#" aria-label="Tilbake til Nivå 3">Nivå 3</a>
      <ol>
        <li><a class="ds-link" href="#">Nivå 1</a></li>
        <li><a class="ds-link" href="#">Nivå 2</a></li>
        <li><a class="ds-link" href="#">Nivå 3</a></li>
        <li><a class="ds-link" href="#">Nivå 4</a></li>
      </ol>
    </hvi-breadcrumbs>
  `,
})
class BreadcrumbsWithBackLinkAndListComponent {}

@Component({
  standalone: true,
  imports: [HviBreadcrumbs],
  template: `
    <hvi-breadcrumbs>
      <a class="ds-link" href="#" aria-label="Tilbake til Nivå 3">Nivå 3</a>
    </hvi-breadcrumbs>
  `,
})
class BreadcrumbsBackLinkOnlyComponent {}

@Component({
  standalone: true,
  imports: [HviBreadcrumbs],
  template: `
    <hvi-breadcrumbs>
      <ol>
        <li><a class="ds-link" href="#">Nivå 1</a></li>
        <li><a class="ds-link" href="#">Nivå 2</a></li>
      </ol>
    </hvi-breadcrumbs>
  `,
})
class BreadcrumbsListOnlyComponent {}

describe('HviBreadcrumbs content projection', () => {
  beforeEach(async () => {
    await setupTestBed({
      imports: [
        BreadcrumbsWithBackLinkAndListComponent,
        BreadcrumbsBackLinkOnlyComponent,
        BreadcrumbsListOnlyComponent,
      ],
    });
  });

  it('should project back link and list', () => {
    const fixture = TestBed.createComponent(BreadcrumbsWithBackLinkAndListComponent);
    fixture.detectChanges();

    const dsBreadcrumbs = fixture.nativeElement.querySelector('ds-breadcrumbs');
    const backLink = dsBreadcrumbs.querySelector(':scope > a');
    expect(backLink).toBeTruthy();
    expect(backLink.getAttribute('aria-label')).toBe('Tilbake til Nivå 3');

    const listItems = dsBreadcrumbs.querySelectorAll('ol > li');
    expect(listItems.length).toBe(4);
  });

  it('should project back link only (no list)', () => {
    const fixture = TestBed.createComponent(BreadcrumbsBackLinkOnlyComponent);
    fixture.detectChanges();

    const dsBreadcrumbs = fixture.nativeElement.querySelector('ds-breadcrumbs');
    expect(dsBreadcrumbs.querySelector(':scope > a')).toBeTruthy();
    expect(dsBreadcrumbs.querySelector('ol')).toBeNull();
  });

  it('should project list only (no back link)', () => {
    const fixture = TestBed.createComponent(BreadcrumbsListOnlyComponent);
    fixture.detectChanges();

    const dsBreadcrumbs = fixture.nativeElement.querySelector('ds-breadcrumbs');
    expect(dsBreadcrumbs.querySelector(':scope > a')).toBeNull();
    expect(dsBreadcrumbs.querySelectorAll('ol > li').length).toBe(2);
  });
});
