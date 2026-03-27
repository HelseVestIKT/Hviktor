import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
    <figure hviAvatarStack>
      <hvi-avatar ariaLabel="Ola Nordmann" initials="ON"></hvi-avatar>
      <hvi-avatar ariaLabel="Kari Nordmann" initials="KN"></hvi-avatar>
      <hvi-avatar ariaLabel="Per Hansen" initials="PH"></hvi-avatar>
    </figure>
  `,
})
class StackWithAvatarsComponent {}

@Component({
  standalone: true,
  imports: [HviAvatarStack, HviAvatar],
  template: `
    <figure hviAvatarStack suffix="+4">
      <hvi-avatar ariaLabel="Ola Nordmann" initials="ON"></hvi-avatar>
      <hvi-avatar ariaLabel="Kari Nordmann" initials="KN"></hvi-avatar>
    </figure>
  `,
})
class StackWithSuffixComponent {}

@Component({
  standalone: true,
  imports: [HviAvatarStack, HviAvatar],
  template: `
    <figure hviAvatarStack expandable="true">
      <hvi-avatar ariaLabel="Ola Nordmann" initials="ON"></hvi-avatar>
      <hvi-avatar ariaLabel="Kari Nordmann" initials="KN"></hvi-avatar>
    </figure>
  `,
})
class StackExpandableComponent {}

@Component({
  standalone: true,
  imports: [HviAvatarStack, HviAvatar],
  template: `
    <figure hviAvatarStack expandable="fixed">
      <hvi-avatar ariaLabel="Ola Nordmann" initials="ON"></hvi-avatar>
      <hvi-avatar ariaLabel="Kari Nordmann" initials="KN"></hvi-avatar>
    </figure>
  `,
})
class StackExpandableFixedComponent {}

@Component({
  standalone: true,
  imports: [HviAvatarStack, HviAvatar],
  template: `
    <figure hviAvatarStack variant="square">
      <hvi-avatar ariaLabel="Ola Nordmann" variant="square" initials="ON"></hvi-avatar>
      <hvi-avatar ariaLabel="Kari Nordmann" variant="square" initials="KN"></hvi-avatar>
    </figure>
  `,
})
class StackSquareVariantComponent {}

describe('HviAvatarStack', () => {
  let fixture: ComponentFixture<BasicStackComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await setupTestBed({ imports: [BasicStackComponent] });
    fixture = TestBed.createComponent(BasicStackComponent);
    fixture.detectChanges();
    element = fixture.nativeElement.querySelector('figure');
  });

  it('should create', () => {
    expect(element).toBeTruthy();
  });

  it('should have ds-avatar-stack host class', () => {
    expect(element.classList.contains('ds-avatar-stack')).toBe(true);
  });

  it('should not set data attributes when no inputs are provided', () => {
    expect(element.getAttribute('data-variant')).toBeNull();
    expect(element.getAttribute('data-expandable')).toBeNull();
    expect(element.getAttribute('data-suffix')).toBeNull();
    expect(element.getAttribute('data-avatar-stack-gap')).toBeNull();
  });
});

describe('HviAvatarStack variant', () => {
  it('should set data-variant to square', async () => {
    await setupTestBed({ imports: [StackSquareVariantComponent] });
    const f = TestBed.createComponent(StackSquareVariantComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('figure');
    expect(el.getAttribute('data-variant')).toBe('square');
  });
});

describe('HviAvatarStack suffix', () => {
  it('should set data-suffix', async () => {
    await setupTestBed({ imports: [StackWithSuffixComponent] });
    const f = TestBed.createComponent(StackWithSuffixComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('figure');
    expect(el.getAttribute('data-suffix')).toBe('+4');
  });
});

describe('HviAvatarStack expandable', () => {
  it('should set data-expandable to true', async () => {
    await setupTestBed({ imports: [StackExpandableComponent] });
    const f = TestBed.createComponent(StackExpandableComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('figure');
    expect(el.getAttribute('data-expandable')).toBe('true');
  });
});

describe('HviAvatarStack expandable fixed', () => {
  it('should set data-expandable to fixed', async () => {
    await setupTestBed({ imports: [StackExpandableFixedComponent] });
    const f = TestBed.createComponent(StackExpandableFixedComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('figure');
    expect(el.getAttribute('data-expandable')).toBe('fixed');
  });
});

describe('HviAvatarStack content projection', () => {
  beforeEach(async () => {
    await setupTestBed({
      imports: [StackWithAvatarsComponent, StackWithSuffixComponent],
    });
  });

  it('should project avatar children', () => {
    const fixture = TestBed.createComponent(StackWithAvatarsComponent);
    fixture.detectChanges();
    const stackEl = fixture.nativeElement.querySelector('figure');
    const avatars = stackEl.querySelectorAll('hvi-avatar');
    expect(avatars.length).toBe(3);
  });

  it('should have avatars with correct attributes inside stack', () => {
    const fixture = TestBed.createComponent(StackWithAvatarsComponent);
    fixture.detectChanges();
    const avatars = fixture.nativeElement.querySelectorAll('hvi-avatar');
    expect(avatars[0].getAttribute('aria-label')).toBe('Ola Nordmann');
    expect(avatars[1].getAttribute('data-initials')).toBe('KN');
    expect(avatars[2].getAttribute('data-initials')).toBe('PH');
  });

  it('should render suffix alongside avatars', () => {
    const fixture = TestBed.createComponent(StackWithSuffixComponent);
    fixture.detectChanges();
    const stackEl = fixture.nativeElement.querySelector('figure');
    expect(stackEl.getAttribute('data-suffix')).toBe('+4');
    const avatars = stackEl.querySelectorAll('hvi-avatar');
    expect(avatars.length).toBe(2);
  });
});
