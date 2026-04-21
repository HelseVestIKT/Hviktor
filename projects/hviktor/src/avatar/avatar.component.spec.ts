import { Component } from '@angular/core';
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

  it('should have role="img"', () => {
    expect(element.getAttribute('role')).toBe('img');
  });

  it('should not set data attributes when no inputs are provided', () => {
    expect(element.getAttribute('aria-label')).toBeNull();
    expect(element.getAttribute('data-variant')).toBeNull();
    expect(element.getAttribute('data-initials')).toBeNull();
    expect(element.getAttribute('data-size')).toBeNull();
    expect(element.getAttribute('data-color')).toBeNull();
  });

  it('should reflect variant input as data-variant attribute', () => {
    fixture.componentRef.setInput('variant', 'square');
    fixture.detectChanges();
    expect(element.getAttribute('data-variant')).toBe('square');
  });

  it('should reflect initials input as data-initials attribute', () => {
    fixture.componentRef.setInput('initials', 'ON');
    fixture.detectChanges();
    expect(element.getAttribute('data-initials')).toBe('ON');
  });

  it('should reflect size input as data-size attribute', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    expect(element.getAttribute('data-size')).toBe('lg');
  });

  it('should reflect color input as data-color attribute', () => {
    fixture.componentRef.setInput('color', 'brand1');
    fixture.detectChanges();
    expect(element.getAttribute('data-color')).toBe('brand1');
  });
});

@Component({
  standalone: true,
  imports: [HviAvatar],
  template: '<hvi-avatar aria-label="Ola Nordmann"><img src="avatar.jpg" alt="" /></hvi-avatar>',
})
class AvatarWithImageComponent {}

@Component({
  standalone: true,
  imports: [HviAvatar],
  template: `<hvi-avatar aria-hidden="true">ON</hvi-avatar><span>Ola Nordmann</span>`,
})
class AvatarWithVisibleTextComponent {}

describe('HviAvatar content projection', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [AvatarWithImageComponent, AvatarWithVisibleTextComponent] });
  });

  it('should project an image as child', () => {
    const fixture = TestBed.createComponent(AvatarWithImageComponent);
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('hvi-avatar img');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('avatar.jpg');
  });

  it('should support aria-hidden when used alongside visible text', () => {
    const fixture = TestBed.createComponent(AvatarWithVisibleTextComponent);
    fixture.detectChanges();
    const avatarEl = fixture.nativeElement.querySelector('hvi-avatar');
    expect(avatarEl.getAttribute('aria-hidden')).toBe('true');
    expect(fixture.nativeElement.querySelector('span').textContent).toBe('Ola Nordmann');
  });
});
