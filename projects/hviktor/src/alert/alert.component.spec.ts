import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviAlert } from './alert.component';

describe('HviAlert', () => {
  let fixture: ComponentFixture<HviAlert>;
  let element: HTMLElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [HviAlert] });
    fixture = TestBed.createComponent(HviAlert);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should not set data-color when no color is provided', () => {
    expect(element.getAttribute('data-color')).toBeNull();
  });

  it('should set status role and polite aria-live by default', () => {
    expect(element.getAttribute('role')).toBe('status');
    expect(element.getAttribute('aria-live')).toBe('polite');
  });

  it('should reflect color input as data-color attribute', () => {
    fixture.componentRef.setInput('color', 'danger');
    fixture.detectChanges();
    expect(element.getAttribute('data-color')).toBe('danger');
  });

  it('should map danger color to role alert and omit aria-live', () => {
    fixture.componentRef.setInput('color', 'danger');
    fixture.detectChanges();
    expect(element.getAttribute('role')).toBe('alert');
    expect(element.getAttribute('aria-live')).toBeNull();
  });

  it('should respect explicit role override', () => {
    fixture.componentRef.setInput('color', 'danger');
    fixture.componentRef.setInput('role', 'status');
    fixture.detectChanges();
    expect(element.getAttribute('role')).toBe('status');
    expect(element.getAttribute('aria-live')).toBe('polite');
  });

  it('should respect explicit aria-live override', () => {
    fixture.componentRef.setInput('color', 'danger');
    fixture.componentRef.setInput('aria-live', 'assertive');
    fixture.detectChanges();
    expect(element.getAttribute('role')).toBe('alert');
    expect(element.getAttribute('aria-live')).toBe('assertive');
  });
});

@Component({
  standalone: true,
  imports: [HviAlert],
  template: `<hvi-alert>
    <h2>Overskrift</h2>
    <p>Beskrivelse</p>
  </hvi-alert>`,
})
class AlertRichContentHostComponent {}

describe('HviAlert content projection', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [AlertRichContentHostComponent] });
  });

  it('should project rich content', () => {
    const fixture = TestBed.createComponent(AlertRichContentHostComponent);
    fixture.detectChanges();
    const alertEl = fixture.nativeElement.querySelector('hvi-alert');
    expect(alertEl.querySelector('h2')?.textContent).toContain('Overskrift');
    expect(alertEl.querySelector('p')?.textContent).toContain('Beskrivelse');
  });
});
