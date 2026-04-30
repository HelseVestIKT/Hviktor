import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviDropdown } from './dropdown.component';

@Component({
  standalone: true,
  imports: [HviDropdown],
  template: `
    <hvi-dropdown id="default-dropdown"></hvi-dropdown>
    <hvi-dropdown
      id="configured-dropdown"
      dropdownPlacement="left"
      floating="top"
      overscroll="contain"
      [autoPlacement]="false"
    ></hvi-dropdown>
  `,
})
class DropdownAttributesHostComponent {}

@Component({
  standalone: true,
  imports: [HviDropdown],
  template: `
    <hvi-dropdown id="event-dropdown" (opened)="onOpened()" (closed)="onClosed()"></hvi-dropdown>
  `,
})
class DropdownEventsHostComponent {
  openedCount = 0;
  closedCount = 0;

  onOpened() {
    this.openedCount += 1;
  }

  onClosed() {
    this.closedCount += 1;
  }
}

describe('HviDropdown', () => {
  beforeEach(async () => {
    await setupTestBed({
      imports: [DropdownAttributesHostComponent, DropdownEventsHostComponent],
    });
  });

  it('keeps optional floating and overscroll attributes unset by default', () => {
    const fixture = TestBed.createComponent(DropdownAttributesHostComponent);
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('#default-dropdown');
    expect(el.classList.contains('ds-popover')).toBe(true);
    expect(el.classList.contains('ds-dropdown')).toBe(true);
    expect(el.getAttribute('data-floating')).toBeNull();
    expect(el.getAttribute('data-overscroll')).toBeNull();
    expect(el.getAttribute('data-autoplacement')).toBe('');
  });

  it('maps placement, floating, overscroll and autoPlacement to data attributes', () => {
    const fixture = TestBed.createComponent(DropdownAttributesHostComponent);
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('#configured-dropdown');
    expect(el.getAttribute('data-placement')).toBe('left');
    expect(el.getAttribute('data-floating')).toBe('top');
    expect(el.getAttribute('data-overscroll')).toBe('contain');
    expect(el.getAttribute('data-autoplacement')).toBeNull();
  });

  it('emits opened and closed outputs from toggle events', () => {
    const fixture = TestBed.createComponent(DropdownEventsHostComponent);
    fixture.detectChanges();

    const host = fixture.componentInstance;
    const el = fixture.nativeElement.querySelector('#event-dropdown');

    const openEvent = new Event('toggle') as Event & { newState: 'open' | 'closed' };
    Object.defineProperty(openEvent, 'newState', { value: 'open' });

    const closedEvent = new Event('toggle') as Event & { newState: 'open' | 'closed' };
    Object.defineProperty(closedEvent, 'newState', { value: 'closed' });

    el.dispatchEvent(openEvent);
    el.dispatchEvent(closedEvent);

    expect(host.openedCount).toBe(1);
    expect(host.closedCount).toBe(1);
  });
});
