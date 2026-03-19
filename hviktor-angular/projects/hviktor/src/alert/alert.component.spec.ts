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

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have ds-alert host class', () => {
    expect(element.classList.contains('ds-alert')).toBe(true);
  });

  it('should not set data-color when no color is provided', () => {
    expect(element.getAttribute('data-color')).toBeNull();
  });

  it('should set data-color to info', () => {
    fixture.componentRef.setInput('color', 'info');
    fixture.detectChanges();
    expect(element.getAttribute('data-color')).toBe('info');
  });

  it('should set data-color to success', () => {
    fixture.componentRef.setInput('color', 'success');
    fixture.detectChanges();
    expect(element.getAttribute('data-color')).toBe('success');
  });

  it('should set data-color to warning', () => {
    fixture.componentRef.setInput('color', 'warning');
    fixture.detectChanges();
    expect(element.getAttribute('data-color')).toBe('warning');
  });

  it('should set data-color to danger', () => {
    fixture.componentRef.setInput('color', 'danger');
    fixture.detectChanges();
    expect(element.getAttribute('data-color')).toBe('danger');
  });
});

@Component({
  standalone: true,
  imports: [HviAlert],
  template: '<hvi-alert>Testvarsel</hvi-alert>',
})
class AlertHostComponent {}

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
    await setupTestBed({ imports: [HviAlert, AlertHostComponent, AlertRichContentHostComponent] });
  });

  it('should project text content', () => {
    const fixture = TestBed.createComponent(AlertHostComponent);
    fixture.detectChanges();
    const alertEl = fixture.nativeElement.querySelector('hvi-alert');
    expect(alertEl.textContent).toContain('Testvarsel');
  });

  it('should project heading and paragraph content', () => {
    const fixture = TestBed.createComponent(AlertRichContentHostComponent);
    fixture.detectChanges();
    const alertEl = fixture.nativeElement.querySelector('hvi-alert');
    expect(alertEl.querySelector('h2')?.textContent).toContain('Overskrift');
    expect(alertEl.querySelector('p')?.textContent).toContain('Beskrivelse');
  });
});
