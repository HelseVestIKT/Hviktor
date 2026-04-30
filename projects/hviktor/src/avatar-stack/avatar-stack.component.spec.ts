import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HviAvatar } from '../avatar/avatar.component';
import { setupTestBed } from '../testing/test-utils';
import { HviAvatarStack } from './avatar-stack.component';

@Component({
  standalone: true,
  imports: [HviAvatarStack],
  template: '<hvi-avatar-stack></hvi-avatar-stack>',
})
class BasicStackComponent {}

@Component({
  standalone: true,
  imports: [HviAvatarStack, HviAvatar],
  template: `
    <hvi-avatar-stack suffix="+4">
      <hvi-avatar aria-label="Ola Nordmann" initials="ON"></hvi-avatar>
      <hvi-avatar aria-label="Kari Nordmann" initials="KN"></hvi-avatar>
    </hvi-avatar-stack>
  `,
})
class StackWithSuffixComponent {}

@Component({
  standalone: true,
  imports: [HviAvatarStack, HviAvatar],
  template: `
    <hvi-avatar-stack expandable="true">
      <hvi-avatar aria-label="Ola Nordmann" initials="ON"></hvi-avatar>
    </hvi-avatar-stack>
  `,
})
class StackExpandableComponent {}

@Component({
  standalone: true,
  imports: [HviAvatarStack, HviAvatar],
  template: `
    <hvi-avatar-stack variant="square">
      <hvi-avatar aria-label="Ola" variant="square" initials="ON"></hvi-avatar>
    </hvi-avatar-stack>
  `,
})
class StackSquareVariantComponent {}

@Component({
  standalone: true,
  imports: [HviAvatarStack, HviAvatar],
  template: `
    <hvi-avatar-stack aria-label="Teammedlemmer">
      <hvi-avatar aria-label="Ola" initials="ON"></hvi-avatar>
    </hvi-avatar-stack>
  `,
})
class StackCustomAriaLabelComponent {}

describe('HviAvatarStack', () => {
  beforeEach(async () => {
    await setupTestBed({
      imports: [
        BasicStackComponent,
        StackSquareVariantComponent,
        StackWithSuffixComponent,
        StackExpandableComponent,
        StackCustomAriaLabelComponent,
      ],
    });
  });

  it('should not set data attributes when no inputs are provided', () => {
    const fixture = TestBed.createComponent(BasicStackComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('hvi-avatar-stack');
    expect(element.getAttribute('data-variant')).toBeNull();
    expect(element.getAttribute('data-expandable')).toBeNull();
    expect(element.getAttribute('data-suffix')).toBeNull();
    expect(element.getAttribute('data-avatar-stack-gap')).toBeNull();
  });

  it('should reflect variant input as data-variant attribute', () => {
    const f = TestBed.createComponent(StackSquareVariantComponent);
    f.detectChanges();
    expect(f.nativeElement.querySelector('hvi-avatar-stack').getAttribute('data-variant')).toBe(
      'square',
    );
  });

  it('should reflect suffix input as data-suffix attribute', () => {
    const f = TestBed.createComponent(StackWithSuffixComponent);
    f.detectChanges();
    expect(f.nativeElement.querySelector('hvi-avatar-stack').getAttribute('data-suffix')).toBe(
      '+4',
    );
  });

  it('should reflect expandable input as data-expandable attribute', () => {
    const f = TestBed.createComponent(StackExpandableComponent);
    f.detectChanges();
    expect(f.nativeElement.querySelector('hvi-avatar-stack').getAttribute('data-expandable')).toBe(
      'true',
    );
  });

  it('should set tabindex="0" when expandable is set', () => {
    const f = TestBed.createComponent(StackExpandableComponent);
    f.detectChanges();
    expect(f.nativeElement.querySelector('hvi-avatar-stack').getAttribute('tabindex')).toBe('0');
  });

  it('should not set tabindex when expandable is not set', () => {
    const f = TestBed.createComponent(BasicStackComponent);
    f.detectChanges();
    expect(f.nativeElement.querySelector('hvi-avatar-stack').getAttribute('tabindex')).toBeNull();
  });

  it('should have default aria-label "Gruppe med avatarer"', () => {
    const f = TestBed.createComponent(BasicStackComponent);
    f.detectChanges();
    expect(f.nativeElement.querySelector('hvi-avatar-stack').getAttribute('aria-label')).toBe(
      'Gruppe med avatarer',
    );
  });

  it('should allow overriding aria-label', () => {
    const f = TestBed.createComponent(StackCustomAriaLabelComponent);
    f.detectChanges();
    expect(f.nativeElement.querySelector('hvi-avatar-stack').getAttribute('aria-label')).toBe(
      'Teammedlemmer',
    );
  });

  it('should project avatar children', () => {
    const f = TestBed.createComponent(StackWithSuffixComponent);
    f.detectChanges();
    const avatars = f.nativeElement.querySelectorAll('hvi-avatar');
    expect(avatars.length).toBeGreaterThan(0);
  });
});
