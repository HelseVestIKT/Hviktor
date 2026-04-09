import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
  template:
    '<button hviButton variant="primary" color="accent" size="md" type="submit">Save</button>',
})
class FullButtonComponent {}

@Component({
  standalone: true,
  imports: [HviButton],
  template: '<button hviButton icon aria-label="Edit"><svg></svg></button>',
})
class IconOnlyButtonComponent {}

@Component({
  standalone: true,
  imports: [HviButton],
  template: '<button hviButton><svg></svg> Edit</button>',
})
class IconWithTextButtonComponent {}

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
  template: '<button hviButton [variant]="variant">Btn</button>',
})
class VariantHostComponent {
  variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
}

@Component({
  standalone: true,
  imports: [HviButton],
  template: '<button hviButton [size]="size">Btn</button>',
})
class SizeHostComponent {
  size: 'sm' | 'md' | 'lg' = 'sm';
}

@Component({
  standalone: true,
  imports: [HviButton],
  template: '<button hviButton [type]="type">Btn</button>',
})
class TypeHostComponent {
  type: 'button' | 'submit' | 'reset' = 'button';
}

@Component({
  standalone: true,
  imports: [HviButton],
  template: '<button hviButton [color]="color">Btn</button>',
})
class ColorHostComponent {
  color: 'accent' | 'brand1' | 'brand2' | 'brand3' | 'neutral' | 'danger' = 'accent';
}

describe('HviButton', () => {
  let fixture: ComponentFixture<BasicButtonComponent>;
  let element: HTMLButtonElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [BasicButtonComponent] });
    fixture = TestBed.createComponent(BasicButtonComponent);
    fixture.detectChanges();
    element = fixture.nativeElement.querySelector('button');
  });

  it('should create', () => {
    expect(element).toBeTruthy();
  });

  it('should have ds-button host class', () => {
    expect(element.classList.contains('ds-button')).toBe(true);
  });

  it('should not set data attributes when no inputs are provided', () => {
    expect(element.getAttribute('data-size')).toBeNull();
    expect(element.getAttribute('data-variant')).toBeNull();
    expect(element.getAttribute('data-color')).toBeNull();
    expect(element.getAttribute('type')).toBeNull();
  });

  it('should not set boolean attributes when defaults are false', () => {
    expect(element.getAttribute('data-fullwidth')).toBeNull();
    expect(element.getAttribute('data-icon')).toBeNull();
    expect(element.getAttribute('aria-busy')).toBeNull();
  });
});

describe('HviButton variant', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [VariantHostComponent] });
  });

  it('should set data-variant to primary', () => {
    const f = TestBed.createComponent(VariantHostComponent);
    f.componentInstance.variant = 'primary';
    f.detectChanges();
    expect(f.nativeElement.querySelector('button').getAttribute('data-variant')).toBe('primary');
  });

  it('should set data-variant to secondary', () => {
    const f = TestBed.createComponent(VariantHostComponent);
    f.componentInstance.variant = 'secondary';
    f.detectChanges();
    expect(f.nativeElement.querySelector('button').getAttribute('data-variant')).toBe('secondary');
  });

  it('should set data-variant to tertiary', () => {
    const f = TestBed.createComponent(VariantHostComponent);
    f.componentInstance.variant = 'tertiary';
    f.detectChanges();
    expect(f.nativeElement.querySelector('button').getAttribute('data-variant')).toBe('tertiary');
  });
});

describe('HviButton size', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [SizeHostComponent] });
  });

  it('should set data-size to sm', () => {
    const f = TestBed.createComponent(SizeHostComponent);
    f.componentInstance.size = 'sm';
    f.detectChanges();
    expect(f.nativeElement.querySelector('button').getAttribute('data-size')).toBe('sm');
  });

  it('should set data-size to md', () => {
    const f = TestBed.createComponent(SizeHostComponent);
    f.componentInstance.size = 'md';
    f.detectChanges();
    expect(f.nativeElement.querySelector('button').getAttribute('data-size')).toBe('md');
  });

  it('should set data-size to lg', () => {
    const f = TestBed.createComponent(SizeHostComponent);
    f.componentInstance.size = 'lg';
    f.detectChanges();
    expect(f.nativeElement.querySelector('button').getAttribute('data-size')).toBe('lg');
  });
});

describe('HviButton type', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [TypeHostComponent] });
  });

  it('should set type to button', () => {
    const f = TestBed.createComponent(TypeHostComponent);
    f.componentInstance.type = 'button';
    f.detectChanges();
    expect(f.nativeElement.querySelector('button').getAttribute('type')).toBe('button');
  });

  it('should set type to submit', () => {
    const f = TestBed.createComponent(TypeHostComponent);
    f.componentInstance.type = 'submit';
    f.detectChanges();
    expect(f.nativeElement.querySelector('button').getAttribute('type')).toBe('submit');
  });

  it('should set type to reset', () => {
    const f = TestBed.createComponent(TypeHostComponent);
    f.componentInstance.type = 'reset';
    f.detectChanges();
    expect(f.nativeElement.querySelector('button').getAttribute('type')).toBe('reset');
  });
});

describe('HviButton color', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [ColorHostComponent] });
  });

  it('should set data-color to accent', () => {
    const f = TestBed.createComponent(ColorHostComponent);
    f.componentInstance.color = 'accent';
    f.detectChanges();
    expect(f.nativeElement.querySelector('button').getAttribute('data-color')).toBe('accent');
  });

  it('should set data-color to brand1', () => {
    const f = TestBed.createComponent(ColorHostComponent);
    f.componentInstance.color = 'brand1';
    f.detectChanges();
    expect(f.nativeElement.querySelector('button').getAttribute('data-color')).toBe('brand1');
  });

  it('should set data-color to brand2', () => {
    const f = TestBed.createComponent(ColorHostComponent);
    f.componentInstance.color = 'brand2';
    f.detectChanges();
    expect(f.nativeElement.querySelector('button').getAttribute('data-color')).toBe('brand2');
  });

  it('should set data-color to brand3', () => {
    const f = TestBed.createComponent(ColorHostComponent);
    f.componentInstance.color = 'brand3';
    f.detectChanges();
    expect(f.nativeElement.querySelector('button').getAttribute('data-color')).toBe('brand3');
  });

  it('should set data-color to neutral', () => {
    const f = TestBed.createComponent(ColorHostComponent);
    f.componentInstance.color = 'neutral';
    f.detectChanges();
    expect(f.nativeElement.querySelector('button').getAttribute('data-color')).toBe('neutral');
  });

  it('should set data-color to danger', () => {
    const f = TestBed.createComponent(ColorHostComponent);
    f.componentInstance.color = 'danger';
    f.detectChanges();
    expect(f.nativeElement.querySelector('button').getAttribute('data-color')).toBe('danger');
  });
});

describe('HviButton icon', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [IconOnlyButtonComponent] });
  });

  it('should set data-icon as empty string when icon is true', () => {
    const f = TestBed.createComponent(IconOnlyButtonComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('button');
    expect(el.getAttribute('data-icon')).toBe('');
  });

  it('should project svg element inside icon-only button', () => {
    const f = TestBed.createComponent(IconOnlyButtonComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('button');
    expect(el.querySelector('svg')).toBeTruthy();
  });
});

describe('HviButton loading', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [LoadingButtonComponent] });
  });

  it('should set aria-busy to true when loading', () => {
    const f = TestBed.createComponent(LoadingButtonComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('button');
    expect(el.getAttribute('aria-busy')).toBe('true');
  });

  it('should project loading text', () => {
    const f = TestBed.createComponent(LoadingButtonComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('button');
    expect(el.textContent).toContain('Loading…');
  });
});

describe('HviButton fullWidth', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [FullWidthButtonComponent] });
  });

  it('should set data-fullwidth as empty string when fullWidth is true', () => {
    const f = TestBed.createComponent(FullWidthButtonComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('button');
    expect(el.getAttribute('data-fullwidth')).toBe('');
  });
});

describe('HviButton as link', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [LinkAsButtonComponent] });
  });

  it('should apply ds-button class to anchor element', () => {
    const f = TestBed.createComponent(LinkAsButtonComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('a');
    expect(el.classList.contains('ds-button')).toBe(true);
  });

  it('should set data-variant on anchor element', () => {
    const f = TestBed.createComponent(LinkAsButtonComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('a');
    expect(el.getAttribute('data-variant')).toBe('primary');
  });

  it('should preserve href on anchor element', () => {
    const f = TestBed.createComponent(LinkAsButtonComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('a');
    expect(el.getAttribute('href')).toBe('https://example.com');
  });

  it('should project text content in anchor', () => {
    const f = TestBed.createComponent(LinkAsButtonComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('a');
    expect(el.textContent).toContain('Go to example');
  });
});

describe('HviButton content projection', () => {
  beforeEach(async () => {
    await setupTestBed({
      imports: [BasicButtonComponent, IconWithTextButtonComponent, FullButtonComponent],
    });
  });

  it('should project text content', () => {
    const f = TestBed.createComponent(BasicButtonComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('button');
    expect(el.textContent).toContain('Click me');
  });

  it('should project svg and text together', () => {
    const f = TestBed.createComponent(IconWithTextButtonComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('button');
    expect(el.querySelector('svg')).toBeTruthy();
    expect(el.textContent).toContain('Edit');
  });

  it('should support all attributes set together', () => {
    const f = TestBed.createComponent(FullButtonComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('button');
    expect(el.classList.contains('ds-button')).toBe(true);
    expect(el.getAttribute('data-variant')).toBe('primary');
    expect(el.getAttribute('data-color')).toBe('accent');
    expect(el.getAttribute('data-size')).toBe('md');
    expect(el.getAttribute('type')).toBe('submit');
    expect(el.textContent).toContain('Save');
  });
});
