import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviDivider } from './divider.directive';

@Component({
  standalone: true,
  imports: [HviDivider],
  template: `
    <section>
      <hr id="with-divider" hviDivider />
      <hr id="without-divider" />
    </section>
  `,
})
class DividerHostComponent {}

describe('HviDivider', () => {
  beforeEach(async () => {
    await setupTestBed({
      imports: [DividerHostComponent],
    });
  });

  it('adds ds-divider class and aria-hidden=true on hr with hviDivider', () => {
    const fixture = TestBed.createComponent(DividerHostComponent);
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('#with-divider');
    expect(el.classList.contains('ds-divider')).toBe(true);
    expect(el.getAttribute('aria-hidden')).toBe('true');
  });

  it('does not affect hr elements without hviDivider', () => {
    const fixture = TestBed.createComponent(DividerHostComponent);
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('#without-divider');
    expect(el.classList.contains('ds-divider')).toBe(false);
    expect(el.getAttribute('aria-hidden')).toBeNull();
  });
});
