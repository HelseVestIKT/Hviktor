import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviChipButton } from './chip-button.directive';

@Component({
  standalone: true,
  imports: [HviChipButton],
  template: `<button hviChip>Chip</button>`,
})
class DefaultHost {}

@Component({
  standalone: true,
  imports: [HviChipButton],
  template: `<button hviChip removable>Removable</button>`,
})
class RemovableHost {}

describe('HviChipButton', () => {
  beforeEach(() => setupTestBed({ imports: [DefaultHost, RemovableHost] }));

  it('should apply ds-chip class', () => {
    const fixture = TestBed.createComponent(DefaultHost);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.classList.contains('ds-chip')).toBe(true);
  });

  it('should not set data-removable by default', () => {
    const fixture = TestBed.createComponent(DefaultHost);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.getAttribute('data-removable')).toBeNull();
  });

  it('should set data-removable when removable is true', () => {
    const fixture = TestBed.createComponent(RemovableHost);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.getAttribute('data-removable')).toBe('true');
  });

  it('should render text content', () => {
    const fixture = TestBed.createComponent(DefaultHost);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.textContent?.trim()).toBe('Chip');
  });
});
