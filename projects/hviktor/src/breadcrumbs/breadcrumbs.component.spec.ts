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

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render a ds-breadcrumbs element', () => {
    const dsBreadcrumbs = element.querySelector('ds-breadcrumbs');
    expect(dsBreadcrumbs).toBeTruthy();
  });

  it('should apply ds-breadcrumbs class to the web component', () => {
    const dsBreadcrumbs = element.querySelector('ds-breadcrumbs');
    expect(dsBreadcrumbs?.classList.contains('ds-breadcrumbs')).toBe(true);
  });

  it('should set default aria-label to "Du er her:"', () => {
    const dsBreadcrumbs = element.querySelector('ds-breadcrumbs');
    expect(dsBreadcrumbs?.getAttribute('aria-label')).toBe('Du er her:');
  });

  it('should update aria-label when input changes', () => {
    fixture.componentRef.setInput('ariaLabel', 'Brødsmulesti');
    fixture.detectChanges();
    const dsBreadcrumbs = element.querySelector('ds-breadcrumbs');
    expect(dsBreadcrumbs?.getAttribute('aria-label')).toBe('Brødsmulesti');
  });

  it('should have display: contents on host', () => {
    expect(getComputedStyle(element).display).toBe('contents');
  });
});

@Component({
  standalone: true,
  imports: [HviBreadcrumbs],
  template: `
    <hvi-breadcrumbs ariaLabel="Du er her:">
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
    <hvi-breadcrumbs ariaLabel="Brødsmulesti">
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
        HviBreadcrumbs,
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
    expect(backLink.textContent.trim()).toBe('Nivå 3');
    expect(backLink.getAttribute('aria-label')).toBe('Tilbake til Nivå 3');

    const listItems = dsBreadcrumbs.querySelectorAll('ol > li');
    expect(listItems.length).toBe(4);
    expect(listItems[0].textContent.trim()).toBe('Nivå 1');
    expect(listItems[3].textContent.trim()).toBe('Nivå 4');
  });

  it('should project back link only', () => {
    const fixture = TestBed.createComponent(BreadcrumbsBackLinkOnlyComponent);
    fixture.detectChanges();

    const dsBreadcrumbs = fixture.nativeElement.querySelector('ds-breadcrumbs');
    const backLink = dsBreadcrumbs.querySelector(':scope > a');
    expect(backLink).toBeTruthy();
    expect(backLink.textContent.trim()).toBe('Nivå 3');

    const ol = dsBreadcrumbs.querySelector('ol');
    expect(ol).toBeNull();
  });

  it('should project list only', () => {
    const fixture = TestBed.createComponent(BreadcrumbsListOnlyComponent);
    fixture.detectChanges();

    const dsBreadcrumbs = fixture.nativeElement.querySelector('ds-breadcrumbs');
    const backLink = dsBreadcrumbs.querySelector(':scope > a');
    expect(backLink).toBeNull();

    const listItems = dsBreadcrumbs.querySelectorAll('ol > li');
    expect(listItems.length).toBe(2);
  });

  it('should set custom aria-label on back link only variant', () => {
    const fixture = TestBed.createComponent(BreadcrumbsBackLinkOnlyComponent);
    fixture.detectChanges();

    const dsBreadcrumbs = fixture.nativeElement.querySelector('ds-breadcrumbs');
    expect(dsBreadcrumbs.getAttribute('aria-label')).toBe('Brødsmulesti');
  });
});
