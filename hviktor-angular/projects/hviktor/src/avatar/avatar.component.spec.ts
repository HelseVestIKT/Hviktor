import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviAvatar } from './avatar.component';

describe('HviAvatar', () => {
  let fixture: ComponentFixture<HviAvatar>;
  let element: HTMLElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [HviAvatar] });
    fixture = TestBed.createComponent(HviAvatar);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have ds-avatar host class', () => {
    expect(element.classList.contains('ds-avatar')).toBe(true);
  });

  it('should have role="img"', () => {
    expect(element.getAttribute('role')).toBe('img');
  });

  it('should not set data attributes when no inputs are provided', () => {
    expect(element.getAttribute('data-variant')).toBeNull();
    expect(element.getAttribute('data-initials')).toBeNull();
    expect(element.getAttribute('data-size')).toBeNull();
    expect(element.getAttribute('data-color')).toBeNull();
    expect(element.getAttribute('aria-label')).toBeNull();
  });

  it('should set aria-label', () => {
    fixture.componentRef.setInput('ariaLabel', 'Ola Nordmann');
    fixture.detectChanges();
    expect(element.getAttribute('aria-label')).toBe('Ola Nordmann');
  });

  it('should set data-variant', () => {
    fixture.componentRef.setInput('variant', 'circle');
    fixture.detectChanges();
    expect(element.getAttribute('data-variant')).toBe('circle');
  });

  it('should set data-initials', () => {
    fixture.componentRef.setInput('initials', 'ON');
    fixture.detectChanges();
    expect(element.getAttribute('data-initials')).toBe('ON');
  });

  it('should set data-size', () => {
    fixture.componentRef.setInput('size', 'md');
    fixture.detectChanges();
    expect(element.getAttribute('data-size')).toBe('md');
  });

  it('should set data-color', () => {
    fixture.componentRef.setInput('color', 'brand1');
    fixture.detectChanges();
    expect(element.getAttribute('data-color')).toBe('brand1');
  });
});
