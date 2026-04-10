import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviChipLabel } from './chip-label.directive';

@Component({
  standalone: true,
  imports: [HviChipLabel],
  template: `<label hviChip>Nynorsk</label>`,
})
class HostComponent {}

describe('HviChipLabel', () => {
  beforeEach(() => setupTestBed({ imports: [HostComponent] }));

  it('should apply ds-chip class', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label') as HTMLLabelElement;
    expect(label.classList.contains('ds-chip')).toBe(true);
  });

  it('should render text content', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label') as HTMLLabelElement;
    expect(label.textContent?.trim()).toBe('Nynorsk');
  });
});
