import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviButton } from './button.directive';

@Component({
  standalone: true,
  imports: [HviButton],
  template: '<button hviButton>Click me</button>',
})
class BasicButtonComponent {}

@Component({
  standalone: true,
  imports: [HviButton],
  template: '<button hviButton [variant]="variant">Btn</button>',
})
class VariantHostComponent {
  variant: 'primary' | 'secondary' | 'tertiary' = 'secondary';
}

@Component({
  standalone: true,
  imports: [HviButton],
  template: '<button hviButton [size]="size">Btn</button>',
})
class SizeHostComponent {
  size: 'sm' | 'md' | 'lg' = 'lg';
}

@Component({
  standalone: true,
  imports: [HviButton],
  template: '<button hviButton [type]="type">Btn</button>',
})
class TypeHostComponent {
  type: 'button' | 'submit' | 'reset' = 'submit';
}

@Component({
  standalone: true,
  imports: [HviButton],
  template: '<button hviButton [color]="color">Btn</button>',
})
class ColorHostComponent {
  color: 'accent' | 'brand1' | 'brand2' | 'brand3' | 'neutral' | 'danger' = 'danger';
}

@Component({
  standalone: true,
  imports: [HviButton],
  template: '<button hviButton icon aria-label="Edit"><svg></svg></button>',
})
class IconOnlyButtonComponent {}

@Component({
  standalone: true,
  imports: [HviButton],
  template: '<button hviButton loading>Loading…</button>',
})
class LoadingButtonComponent {}

@Component({
  standalone: true,
  imports: [HviButton],
  template: '<button hviButton fullWidth>Full width</button>',
})
class FullWidthButtonComponent {}

@Component({
  standalone: true,
  imports: [HviButton],
  template: '<a hviButton variant="primary" href="https://example.com">Go to example</a>',
})
class LinkAsButtonComponent {}

@Component({
  standalone: true,
  imports: [HviButton],
  template: '<button hviButton><svg></svg> Edit</button>',
})
class IconWithTextButtonComponent {}

describe('HviButton', () => {
  beforeEach(async () => {
    await setupTestBed({
      imports: [
        BasicButtonComponent,
        VariantHostComponent,
        SizeHostComponent,
        TypeHostComponent,
        ColorHostComponent,
        IconOnlyButtonComponent,
        LoadingButtonComponent,
        FullWidthButtonComponent,
        LinkAsButtonComponent,
        IconWithTextButtonComponent,
      ],
    });
  });

  it('should not set data attributes when no inputs are provided', () => {
    const f = TestBed.createComponent(BasicButtonComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('button');
    expect(el.getAttribute('data-size')).toBeNull();
    expect(el.getAttribute('data-variant')).toBeNull();
    expect(el.getAttribute('data-color')).toBeNull();
    expect(el.getAttribute('type')).toBeNull();
  });

  it('should not set boolean attributes when defaults are false', () => {
    const f = TestBed.createComponent(BasicButtonComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('button');
    expect(el.getAttribute('data-fullwidth')).toBeNull();
    expect(el.getAttribute('data-icon')).toBeNull();
    expect(el.getAttribute('aria-busy')).toBeNull();
  });

  it('should reflect variant input as data-variant attribute', () => {
    const f = TestBed.createComponent(VariantHostComponent);
    f.detectChanges();
    expect(f.nativeElement.querySelector('button').getAttribute('data-variant')).toBe('secondary');
  });

  it('should reflect size input as data-size attribute', () => {
    const f = TestBed.createComponent(SizeHostComponent);
    f.detectChanges();
    expect(f.nativeElement.querySelector('button').getAttribute('data-size')).toBe('lg');
  });

  it('should reflect type input as type attribute', () => {
    const f = TestBed.createComponent(TypeHostComponent);
    f.detectChanges();
    expect(f.nativeElement.querySelector('button').getAttribute('type')).toBe('submit');
  });

  it('should reflect color input as data-color attribute', () => {
    const f = TestBed.createComponent(ColorHostComponent);
    f.detectChanges();
    expect(f.nativeElement.querySelector('button').getAttribute('data-color')).toBe('danger');
  });

  it('should set data-icon as empty string when icon is true', () => {
    const f = TestBed.createComponent(IconOnlyButtonComponent);
    f.detectChanges();
    expect(f.nativeElement.querySelector('button').getAttribute('data-icon')).toBe('');
  });

  it('should set aria-busy to true when loading', () => {
    const f = TestBed.createComponent(LoadingButtonComponent);
    f.detectChanges();
    expect(f.nativeElement.querySelector('button').getAttribute('aria-busy')).toBe('true');
  });

  it('should set data-fullwidth as empty string when fullWidth is true', () => {
    const f = TestBed.createComponent(FullWidthButtonComponent);
    f.detectChanges();
    expect(f.nativeElement.querySelector('button').getAttribute('data-fullwidth')).toBe('');
  });

  it('should preserve href when used on anchor element', () => {
    const f = TestBed.createComponent(LinkAsButtonComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('a');
    expect(el.getAttribute('href')).toBe('https://example.com');
    expect(el.getAttribute('data-variant')).toBe('primary');
  });

  it('should project svg and text together', () => {
    const f = TestBed.createComponent(IconWithTextButtonComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('button');
    expect(el.querySelector('svg')).toBeTruthy();
    expect(el.textContent).toContain('Edit');
  });
});
