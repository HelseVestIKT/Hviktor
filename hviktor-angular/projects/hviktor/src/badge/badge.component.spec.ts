import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviBadge } from './badge.component';

describe('HviBadge', () => {
  let fixture: ComponentFixture<HviBadge>;
  let element: HTMLElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [HviBadge] });
    fixture = TestBed.createComponent(HviBadge);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have ds-badge host class', () => {
    expect(element.classList.contains('ds-badge')).toBe(true);
  });

  it('should not set data attributes when no inputs are provided', () => {
    expect(element.getAttribute('data-variant')).toBeNull();
    expect(element.getAttribute('data-count')).toBeNull();
    expect(element.getAttribute('data-color')).toBeNull();
  });

  describe('variant', () => {
    it('should set data-variant to base', () => {
      fixture.componentRef.setInput('variant', 'base');
      fixture.detectChanges();
      expect(element.getAttribute('data-variant')).toBe('base');
    });

    it('should set data-variant to tinted', () => {
      fixture.componentRef.setInput('variant', 'tinted');
      fixture.detectChanges();
      expect(element.getAttribute('data-variant')).toBe('tinted');
    });
  });

  describe('count', () => {
    it('should set data-count', () => {
      fixture.componentRef.setInput('count', '9+');
      fixture.detectChanges();
      expect(element.getAttribute('data-count')).toBe('9+');
    });

    it('should set data-count to a number string', () => {
      fixture.componentRef.setInput('count', '3');
      fixture.detectChanges();
      expect(element.getAttribute('data-count')).toBe('3');
    });
  });

  describe('color', () => {
    it('should set data-color to neutral', () => {
      fixture.componentRef.setInput('color', 'neutral');
      fixture.detectChanges();
      expect(element.getAttribute('data-color')).toBe('neutral');
    });

    it('should set data-color to danger', () => {
      fixture.componentRef.setInput('color', 'danger');
      fixture.detectChanges();
      expect(element.getAttribute('data-color')).toBe('danger');
    });

    it('should set data-color to info', () => {
      fixture.componentRef.setInput('color', 'info');
      fixture.detectChanges();
      expect(element.getAttribute('data-color')).toBe('info');
    });

    it('should set data-color to warning', () => {
      fixture.componentRef.setInput('color', 'warning');
      fixture.detectChanges();
      expect(element.getAttribute('data-color')).toBe('warning');
    });

    it('should set data-color to success', () => {
      fixture.componentRef.setInput('color', 'success');
      fixture.detectChanges();
      expect(element.getAttribute('data-color')).toBe('success');
    });

    it('should set data-color to accent', () => {
      fixture.componentRef.setInput('color', 'accent');
      fixture.detectChanges();
      expect(element.getAttribute('data-color')).toBe('accent');
    });
  });

  describe('combined attributes', () => {
    it('should support all attributes set together', () => {
      fixture.componentRef.setInput('variant', 'base');
      fixture.componentRef.setInput('count', '10+');
      fixture.componentRef.setInput('color', 'danger');
      fixture.detectChanges();

      expect(element.getAttribute('data-variant')).toBe('base');
      expect(element.getAttribute('data-count')).toBe('10+');
      expect(element.getAttribute('data-color')).toBe('danger');
      expect(element.classList.contains('ds-badge')).toBe(true);
    });
  });
});
