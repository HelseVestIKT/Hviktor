import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviBadgePosition } from './badge-position.component';
import { HviBadge } from './badge.component';

describe('HviBadgePosition', () => {
  let fixture: ComponentFixture<HviBadgePosition>;
  let element: HTMLElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [HviBadgePosition] });
    fixture = TestBed.createComponent(HviBadgePosition);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have ds-badge--position host class', () => {
    expect(element.classList.contains('ds-badge--position')).toBe(true);
  });

  it('should have default data-overlap of rectangle', () => {
    expect(element.getAttribute('data-overlap')).toBe('rectangle');
  });

  it('should have default data-placement of top-right', () => {
    expect(element.getAttribute('data-placement')).toBe('top-right');
  });

  describe('placement', () => {
    it('should set data-placement to top-left', () => {
      fixture.componentRef.setInput('placement', 'top-left');
      fixture.detectChanges();
      expect(element.getAttribute('data-placement')).toBe('top-left');
    });

    it('should set data-placement to bottom-right', () => {
      fixture.componentRef.setInput('placement', 'bottom-right');
      fixture.detectChanges();
      expect(element.getAttribute('data-placement')).toBe('bottom-right');
    });

    it('should set data-placement to bottom-left', () => {
      fixture.componentRef.setInput('placement', 'bottom-left');
      fixture.detectChanges();
      expect(element.getAttribute('data-placement')).toBe('bottom-left');
    });
  });

  describe('overlap', () => {
    it('should set data-overlap to circle', () => {
      fixture.componentRef.setInput('overlap', 'circle');
      fixture.detectChanges();
      expect(element.getAttribute('data-overlap')).toBe('circle');
    });
  });
});

@Component({
  standalone: true,
  imports: [HviBadgePosition, HviBadge],
  template: `
    <hvi-badge-position placement="top-left">
      <hvi-badge color="danger" count="3"></hvi-badge>
      <span>Innhold</span>
    </hvi-badge-position>
  `,
})
class BadgePositionHostComponent {}

describe('HviBadgePosition content projection', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [BadgePositionHostComponent] });
  });

  it('should project badge and child content', () => {
    const fixture = TestBed.createComponent(BadgePositionHostComponent);
    fixture.detectChanges();
    const positionEl = fixture.nativeElement.querySelector('hvi-badge-position');
    const badge = positionEl.querySelector('hvi-badge');
    const span = positionEl.querySelector('span');

    expect(badge).toBeTruthy();
    expect(badge.getAttribute('data-count')).toBe('3');
    expect(span?.textContent).toBe('Innhold');
  });
});
