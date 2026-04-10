import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { setupTestBed } from '../../testing/test-utils';
import { HviInput } from './input.directive';

@Component({
  standalone: true,
  imports: [HviInput],
  template: '<input hviInput type="checkbox" />',
})
class BasicCheckboxComponent {}

@Component({
  standalone: true,
  imports: [HviInput],
  template: '<input hviInput type="checkbox" readonly />',
})
class ReadonlyCheckboxComponent {}

@Component({
  standalone: true,
  imports: [HviInput],
  template: '<input hviInput type="checkbox" disabled />',
})
class DisabledCheckboxComponent {}

@Component({
  standalone: true,
  imports: [HviInput],
  template: '<input hviInput type="checkbox" checked />',
})
class CheckedCheckboxComponent {}

@Component({
  standalone: true,
  imports: [HviInput],
  template: '<input hviInput type="text" />',
})
class TextInputComponent {}

@Component({
  standalone: true,
  imports: [HviInput],
  template: '<input hviInput type="radio" />',
})
class RadioInputComponent {}

@Component({
  standalone: true,
  imports: [HviInput],
  template: '<input hviInput type="checkbox" [readonly]="isReadonly" />',
})
class ToggleReadonlyComponent {
  isReadonly = false;
}

describe('HviInput', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [BasicCheckboxComponent] });
  });

  it('should create', () => {
    const f = TestBed.createComponent(BasicCheckboxComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('input');
    expect(el).toBeTruthy();
  });

  it('should have ds-input class', () => {
    const f = TestBed.createComponent(BasicCheckboxComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('input');
    expect(el.classList.contains('ds-input')).toBe(true);
  });

  it('should set type attribute to checkbox', () => {
    const f = TestBed.createComponent(BasicCheckboxComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('input');
    expect(el.getAttribute('type')).toBe('checkbox');
  });

  it('should not set disabled when not provided', () => {
    const f = TestBed.createComponent(BasicCheckboxComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('input');
    expect(el.hasAttribute('disabled')).toBe(false);
  });

  it('should not set readonly when not provided', () => {
    const f = TestBed.createComponent(BasicCheckboxComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('input');
    expect(el.hasAttribute('readonly')).toBe(false);
  });
});

describe('HviInput type="text"', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [TextInputComponent] });
  });

  it('should set type to text', () => {
    const f = TestBed.createComponent(TextInputComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('input');
    expect(el.getAttribute('type')).toBe('text');
  });

  it('should have ds-input class', () => {
    const f = TestBed.createComponent(TextInputComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('input');
    expect(el.classList.contains('ds-input')).toBe(true);
  });
});

describe('HviInput checkbox checked', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [CheckedCheckboxComponent] });
  });

  it('should be checked when checked attribute is set', () => {
    const f = TestBed.createComponent(CheckedCheckboxComponent);
    f.detectChanges();
    const el: HTMLInputElement = f.nativeElement.querySelector('input');
    expect(el.checked).toBe(true);
  });
});

describe('HviInput checkbox disabled', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [DisabledCheckboxComponent] });
  });

  it('should set disabled attribute', () => {
    const f = TestBed.createComponent(DisabledCheckboxComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('input');
    expect(el.hasAttribute('disabled')).toBe(true);
  });
});

describe('HviInput checkbox readonly', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [ReadonlyCheckboxComponent] });
  });

  it('should set readonly attribute', () => {
    const f = TestBed.createComponent(ReadonlyCheckboxComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('input');
    expect(el.hasAttribute('readonly')).toBe(true);
  });

  it('should prevent click on readonly checkbox', () => {
    const f = TestBed.createComponent(ReadonlyCheckboxComponent);
    f.detectChanges();
    const el: HTMLInputElement = f.nativeElement.querySelector('input');

    expect(el.checked).toBe(false);
    el.click();
    f.detectChanges();
    expect(el.checked).toBe(false);
  });
});

describe('HviInput checkbox readonly toggle', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [ToggleReadonlyComponent] });
  });

  it('should allow click when not readonly', () => {
    const f = TestBed.createComponent(ToggleReadonlyComponent);
    f.componentInstance.isReadonly = false;
    f.detectChanges();
    const el: HTMLInputElement = f.nativeElement.querySelector('input');

    expect(el.checked).toBe(false);
    el.click();
    f.detectChanges();
    expect(el.checked).toBe(true);
  });

  it('should prevent click when readonly is set', () => {
    const f = TestBed.createComponent(ToggleReadonlyComponent);
    f.componentInstance.isReadonly = true;
    f.detectChanges();
    const el: HTMLInputElement = f.nativeElement.querySelector('input');

    expect(el.checked).toBe(false);
    el.click();
    f.detectChanges();
    expect(el.checked).toBe(false);
  });
});

describe('HviInput radio readonly', () => {
  beforeEach(async () => {
    await setupTestBed({
      imports: [RadioInputComponent],
    });
  });

  it('should set type to radio', () => {
    const f = TestBed.createComponent(RadioInputComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('input');
    expect(el.getAttribute('type')).toBe('radio');
  });
});
