import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviDetails } from './details.component';

describe('HviDetails', () => {
  let fixture: ComponentFixture<HviDetails>;
  let inner: HTMLElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [HviDetails] });
    fixture = TestBed.createComponent(HviDetails);
    fixture.detectChanges();
    inner = fixture.nativeElement.querySelector('u-details');
  });

  it('should set data-variant to "default" by default', () => {
    expect(inner.getAttribute('data-variant')).toBe('default');
  });

  it('should not set open or defaultOpen attributes by default', () => {
    expect(inner.getAttribute('open')).toBeNull();
    expect(inner.hasAttribute('defaultOpen') || inner.hasAttribute('defaultopen')).toBe(false);
  });

  it('should reflect variant input as data-variant attribute', () => {
    fixture.componentRef.setInput('variant', 'tinted');
    fixture.detectChanges();
    expect(inner.getAttribute('data-variant')).toBe('tinted');
  });

  it('should set open attribute when open input is true', () => {
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();
    expect(inner.getAttribute('open')).not.toBeNull();
  });

  it('should set defaultOpen attribute when defaultOpen input is true', () => {
    fixture.componentRef.setInput('defaultOpen', true);
    fixture.detectChanges();
    expect(inner.hasAttribute('defaultOpen') || inner.hasAttribute('defaultopen')).toBe(true);
  });

  it('should emit toggle event when native toggle fires on u-details', () => {
    let emitted: Event | undefined;
    fixture.componentInstance.toggled.subscribe((e: Event) => (emitted = e));

    const event = new Event('toggle');
    inner.dispatchEvent(event);

    expect(emitted).toBe(event);
  });
});
