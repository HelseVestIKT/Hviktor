import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { setupTestBed } from '../../testing/test-utils';
import { HviForm } from '../form/form.directive';
import { HviErrorSummary } from './error-summary.component';

@Component({
  selector: 'hvi-manual-host',
  standalone: true,
  imports: [HviErrorSummary],
  template: `
    <hvi-error-summary
      [errors]="[
        { message: 'Fornavn er ugyldig', href: '#firstName' },
        { message: 'Telefon er ugyldig', href: '#phone' },
      ]"
      showWhen="always"
    />
  `,
})
class ManualHostComponent {}

@Component({
  selector: 'hvi-submitted-host',
  standalone: true,
  imports: [ReactiveFormsModule, HviForm, HviErrorSummary],
  template: `
    <form hviForm [formGroup]="form">
      <hvi-error-summary [form]="form" [messages]="messages" showWhen="submitted" />
    </form>
  `,
})
class SubmittedHostComponent {
  form = new FormGroup({
    firstName: new FormControl(''),
  });

  messages = {
    firstName: {
      required: 'Fornavn er påkrevd',
    },
  };

  constructor() {
    this.form.controls.firstName.setErrors({ required: true });
  }
}

@Component({
  selector: 'hvi-touched-host',
  standalone: true,
  imports: [ReactiveFormsModule, HviErrorSummary],
  template: ` <hvi-error-summary [form]="form" [messages]="messages" showWhen="touched" /> `,
})
class TouchedHostComponent {
  form = new FormGroup({
    firstName: new FormControl(''),
  });

  messages = {
    firstName: {
      required: 'Fornavn er påkrevd',
    },
  };

  constructor() {
    this.form.controls.firstName.setErrors({ required: true });
    this.form.controls.firstName.markAsTouched();
  }
}

@Component({
  selector: 'hvi-manual-overrides-host',
  standalone: true,
  imports: [ReactiveFormsModule, HviErrorSummary],
  template: `
    <hvi-error-summary
      [errors]="manualErrors"
      [form]="form"
      [messages]="messages"
      showWhen="always"
    />
  `,
})
class ManualOverridesAutoHostComponent {
  manualErrors = [{ message: 'Manuell feil', href: '#manual' }];

  form = new FormGroup({
    firstName: new FormControl(''),
  });

  messages = {
    firstName: {
      required: 'Skal ikke vises',
    },
  };

  constructor() {
    this.form.controls.firstName.setErrors({ required: true });
  }
}

@Component({
  selector: 'hvi-priority-host',
  standalone: true,
  imports: [ReactiveFormsModule, HviErrorSummary],
  template: ` <hvi-error-summary [form]="form" [messages]="messages" showWhen="always" /> `,
})
class PriorityHostComponent {
  form = new FormGroup({
    firstName: new FormControl(''),
  });

  messages = {
    firstName: {
      required: 'Mangler verdi',
      pattern: 'Feil format',
    },
  };

  constructor() {
    this.form.controls.firstName.setErrors({ pattern: true, required: true });
  }
}

@Component({
  selector: 'hvi-fallback-message-host',
  standalone: true,
  imports: [ReactiveFormsModule, HviErrorSummary],
  template: ` <hvi-error-summary [form]="form" [messages]="messages" showWhen="always" /> `,
})
class FallbackMessageHostComponent {
  form = new FormGroup({
    firstName: new FormControl(''),
  });

  messages = {
    firstName: {},
  };

  constructor() {
    this.form.controls.firstName.setErrors({ customError: true });
  }
}

describe('HviErrorSummary', () => {
  beforeEach(async () => {
    await setupTestBed({
      imports: [
        HviErrorSummary,
        ManualHostComponent,
        SubmittedHostComponent,
        TouchedHostComponent,
        ManualOverridesAutoHostComponent,
        PriorityHostComponent,
        FallbackMessageHostComponent,
      ],
    });
  });

  it('renders manual errors as ds-link anchors with matching href', () => {
    const fixture = TestBed.createComponent(ManualHostComponent);
    fixture.detectChanges();

    const links: NodeListOf<HTMLAnchorElement> =
      fixture.nativeElement.querySelectorAll('a.ds-link');
    expect(links.length).toBe(2);
    expect(links[0].getAttribute('href')).toBe('#firstName');
    expect(links[0].textContent?.trim()).toBe('Fornavn er ugyldig');
    expect(links[0].getAttribute('data-color')).toBe('neutral');
  });

  it('keeps submitted mode hidden when form has not been submitted', () => {
    const fixture = TestBed.createComponent(SubmittedHostComponent);
    fixture.detectChanges();

    const summary: HTMLElement = fixture.nativeElement.querySelector('ds-error-summary');
    expect(summary.hidden).toBe(true);
  });

  it('shows touched mode when an invalid control is already touched', () => {
    const fixture = TestBed.createComponent(TouchedHostComponent);
    fixture.detectChanges();

    const summary: HTMLElement = fixture.nativeElement.querySelector('ds-error-summary');
    expect(summary.hidden).toBe(false);
  });

  it('uses manual errors when both manual and auto mode inputs are provided', () => {
    const fixture = TestBed.createComponent(ManualOverridesAutoHostComponent);
    fixture.detectChanges();

    const links: NodeListOf<HTMLAnchorElement> =
      fixture.nativeElement.querySelectorAll('a.ds-link');
    expect(links.length).toBe(1);
    expect(links[0].textContent?.trim()).toBe('Manuell feil');
    expect(links[0].getAttribute('href')).toBe('#manual');
  });

  it('uses error priority when multiple validation keys are present', () => {
    const fixture = TestBed.createComponent(PriorityHostComponent);
    fixture.detectChanges();

    const firstLink: HTMLAnchorElement = fixture.nativeElement.querySelector('a.ds-link');
    expect(firstLink.textContent?.trim()).toBe('Mangler verdi');
  });

  it('falls back to default message when no mapped error message exists', () => {
    const fixture = TestBed.createComponent(FallbackMessageHostComponent);
    fixture.detectChanges();

    const firstLink: HTMLAnchorElement = fixture.nativeElement.querySelector('a.ds-link');
    expect(firstLink.textContent?.trim()).toBe('Ugyldig verdi');
  });

  it('focuses target field and prevents default navigation when clicking error link', () => {
    const fixture = TestBed.createComponent(ManualHostComponent);
    fixture.detectChanges();

    const target = document.createElement('input');
    target.id = 'firstName';
    const scrollSpy = vi.fn();
    Object.defineProperty(target, 'scrollIntoView', { value: scrollSpy, configurable: true });
    document.body.appendChild(target);

    const link: HTMLAnchorElement = fixture.nativeElement.querySelector('a.ds-link');
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    const dispatchResult = link.dispatchEvent(clickEvent);

    expect(dispatchResult).toBe(false);
    expect(document.activeElement).toBe(target);
    expect(scrollSpy).toHaveBeenCalled();

    target.remove();
  });
});
