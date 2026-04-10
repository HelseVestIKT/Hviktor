import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviCard } from './card.component';

@Component({
  standalone: true,
  imports: [HviCard],
  template: '<hvi-card>Simple card</hvi-card>',
})
class BasicCardComponent {}

@Component({
  standalone: true,
  imports: [HviCard],
  template: '<hvi-card [variant]="variant">Card</hvi-card>',
})
class VariantHostComponent {
  variant: 'default' | 'tinted' = 'default';
}

@Component({
  standalone: true,
  imports: [HviCard],
  template: '<hvi-card [color]="color">Card</hvi-card>',
})
class ColorHostComponent {
  color: 'accent' | 'brand1' | 'brand2' | 'brand3' | 'neutral' = 'accent';
}

@Component({
  standalone: true,
  imports: [HviCard],
  template: '<hvi-card maxWidth="320px">Card</hvi-card>',
})
class MaxWidthCardComponent {}

@Component({
  standalone: true,
  imports: [HviCard],
  template: '<hvi-card clickDelegateFor="my-link"><a id="my-link" href="#">Link</a></hvi-card>',
})
class ClickDelegateCardComponent {}

@Component({
  standalone: true,
  imports: [HviCard],
  template:
    '<hvi-card variant="tinted" color="brand1" maxWidth="400px" clickDelegateFor="link1">Full</hvi-card>',
})
class FullCardComponent {}

@Component({
  standalone: true,
  imports: [HviCard],
  template: `<hvi-card>
    <h2>Title</h2>
    <p>Description</p>
  </hvi-card>`,
})
class RichContentCardComponent {}

describe('HviCard', () => {
  let fixture: ComponentFixture<BasicCardComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [BasicCardComponent] });
    fixture = TestBed.createComponent(BasicCardComponent);
    fixture.detectChanges();
    element = fixture.nativeElement.querySelector('hvi-card');
  });

  it('should create', () => {
    expect(element).toBeTruthy();
  });

  it('should have ds-card host class', () => {
    expect(element.classList.contains('ds-card')).toBe(true);
  });

  it('should not set data attributes when no inputs are provided', () => {
    expect(element.getAttribute('data-variant')).toBeNull();
    expect(element.getAttribute('data-color')).toBeNull();
    expect(element.getAttribute('data-clickdelegatefor')).toBeNull();
    expect(element.style.maxWidth).toBe('');
  });
});

describe('HviCard variant', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [VariantHostComponent] });
  });

  it('should set data-variant to default', () => {
    const f = TestBed.createComponent(VariantHostComponent);
    f.componentInstance.variant = 'default';
    f.detectChanges();
    expect(f.nativeElement.querySelector('hvi-card').getAttribute('data-variant')).toBe('default');
  });

  it('should set data-variant to tinted', () => {
    const f = TestBed.createComponent(VariantHostComponent);
    f.componentInstance.variant = 'tinted';
    f.detectChanges();
    expect(f.nativeElement.querySelector('hvi-card').getAttribute('data-variant')).toBe('tinted');
  });
});

describe('HviCard color', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [ColorHostComponent] });
  });

  it('should set data-color to accent', () => {
    const f = TestBed.createComponent(ColorHostComponent);
    f.componentInstance.color = 'accent';
    f.detectChanges();
    expect(f.nativeElement.querySelector('hvi-card').getAttribute('data-color')).toBe('accent');
  });

  it('should set data-color to brand1', () => {
    const f = TestBed.createComponent(ColorHostComponent);
    f.componentInstance.color = 'brand1';
    f.detectChanges();
    expect(f.nativeElement.querySelector('hvi-card').getAttribute('data-color')).toBe('brand1');
  });

  it('should set data-color to brand2', () => {
    const f = TestBed.createComponent(ColorHostComponent);
    f.componentInstance.color = 'brand2';
    f.detectChanges();
    expect(f.nativeElement.querySelector('hvi-card').getAttribute('data-color')).toBe('brand2');
  });

  it('should set data-color to brand3', () => {
    const f = TestBed.createComponent(ColorHostComponent);
    f.componentInstance.color = 'brand3';
    f.detectChanges();
    expect(f.nativeElement.querySelector('hvi-card').getAttribute('data-color')).toBe('brand3');
  });

  it('should set data-color to neutral', () => {
    const f = TestBed.createComponent(ColorHostComponent);
    f.componentInstance.color = 'neutral';
    f.detectChanges();
    expect(f.nativeElement.querySelector('hvi-card').getAttribute('data-color')).toBe('neutral');
  });
});

describe('HviCard maxWidth', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [MaxWidthCardComponent] });
  });

  it('should set max-width style', () => {
    const f = TestBed.createComponent(MaxWidthCardComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('hvi-card');
    expect(el.style.maxWidth).toBe('320px');
  });
});

describe('HviCard clickDelegateFor', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [ClickDelegateCardComponent] });
  });

  it('should set data-clickdelegatefor attribute', () => {
    const f = TestBed.createComponent(ClickDelegateCardComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('hvi-card');
    expect(el.getAttribute('data-clickdelegatefor')).toBe('my-link');
  });
});

describe('HviCard combined attributes', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [FullCardComponent] });
  });

  it('should support all attributes set together', () => {
    const f = TestBed.createComponent(FullCardComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('hvi-card');

    expect(el.classList.contains('ds-card')).toBe(true);
    expect(el.getAttribute('data-variant')).toBe('tinted');
    expect(el.getAttribute('data-color')).toBe('brand1');
    expect(el.getAttribute('data-clickdelegatefor')).toBe('link1');
    expect(el.style.maxWidth).toBe('400px');
  });
});

describe('HviCard content projection', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [BasicCardComponent, RichContentCardComponent] });
  });

  it('should project text content', () => {
    const f = TestBed.createComponent(BasicCardComponent);
    f.detectChanges();
    expect(f.nativeElement.querySelector('hvi-card').textContent).toContain('Simple card');
  });

  it('should project heading and paragraph content', () => {
    const f = TestBed.createComponent(RichContentCardComponent);
    f.detectChanges();
    const card = f.nativeElement.querySelector('hvi-card');
    expect(card.querySelector('h2')?.textContent).toContain('Title');
    expect(card.querySelector('p')?.textContent).toContain('Description');
  });
});
