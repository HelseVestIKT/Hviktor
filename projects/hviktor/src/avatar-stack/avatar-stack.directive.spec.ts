import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HviAvatar } from '../avatar/avatar.component';
import { setupTestBed } from '../testing/test-utils';
import { HviAvatarStack } from './avatar-stack.directive';

@Component({
  standalone: true,
  imports: [HviAvatarStack],
  template: '<figure hviAvatarStack></figure>',
})
class BasicStackComponent {}

@Component({
  standalone: true,
  imports: [HviAvatarStack, HviAvatar],
  template: `
    <figure hviAvatarStack suffix="+4">
      <hvi-avatar aria-label="Ola Nordmann" initials="ON"></hvi-avatar>
      <hvi-avatar aria-label="Kari Nordmann" initials="KN"></hvi-avatar>
    </figure>
  `,
})
class StackWithSuffixComponent {}

@Component({
  standalone: true,
  imports: [HviAvatarStack, HviAvatar],
  template: `
    <figure hviAvatarStack expandable="true">
      <hvi-avatar aria-label="Ola Nordmann" initials="ON"></hvi-avatar>
    </figure>
  `,
})
class StackExpandableComponent {}

@Component({
  standalone: true,
  imports: [HviAvatarStack, HviAvatar],
  template: `
    <figure hviAvatarStack variant="square">
      <hvi-avatar aria-label="Ola" variant="square" initials="ON"></hvi-avatar>
    </figure>
  `,
})
class StackSquareVariantComponent {}

describe('HviAvatarStack', () => {
  beforeEach(async () => {
    await setupTestBed({
      imports: [
        BasicStackComponent,
        StackSquareVariantComponent,
        StackWithSuffixComponent,
        StackExpandableComponent,
      ],
    });
  });

  it('should not set data attributes when no inputs are provided', () => {
    const fixture = TestBed.createComponent(BasicStackComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('figure');
    expect(element.getAttribute('data-variant')).toBeNull();
    expect(element.getAttribute('data-expandable')).toBeNull();
    expect(element.getAttribute('data-suffix')).toBeNull();
    expect(element.getAttribute('data-avatar-stack-gap')).toBeNull();
  });

  it('should reflect variant input as data-variant attribute', () => {
    const f = TestBed.createComponent(StackSquareVariantComponent);
    f.detectChanges();
    expect(f.nativeElement.querySelector('figure').getAttribute('data-variant')).toBe('square');
  });

  it('should reflect suffix input as data-suffix attribute', () => {
    const f = TestBed.createComponent(StackWithSuffixComponent);
    f.detectChanges();
    expect(f.nativeElement.querySelector('figure').getAttribute('data-suffix')).toBe('+4');
  });

  it('should reflect expandable input as data-expandable attribute', () => {
    const f = TestBed.createComponent(StackExpandableComponent);
    f.detectChanges();
    expect(f.nativeElement.querySelector('figure').getAttribute('data-expandable')).toBe('true');
  });

  it('should project avatar children', () => {
    const f = TestBed.createComponent(StackWithSuffixComponent);
    f.detectChanges();
    const avatars = f.nativeElement.querySelectorAll('hvi-avatar');
    expect(avatars.length).toBeGreaterThan(0);
  });
});
