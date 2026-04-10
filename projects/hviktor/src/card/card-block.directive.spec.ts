import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviCardBlock } from './card-block.directive';
import { HviCard } from './card.component';

@Component({
  standalone: true,
  imports: [HviCard, HviCardBlock],
  template: `
    <hvi-card>
      <div hviCardBlock>Block 1</div>
      <div hviCardBlock>Block 2</div>
      <div hviCardBlock>Block 3</div>
    </hvi-card>
  `,
})
class CardWithBlocksComponent {}

@Component({
  standalone: true,
  imports: [HviCardBlock],
  template: '<div hviCardBlock>Single block</div>',
})
class SingleBlockComponent {}

describe('HviCardBlock', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [SingleBlockComponent] });
  });

  it('should create', () => {
    const f = TestBed.createComponent(SingleBlockComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('div');
    expect(el).toBeTruthy();
  });

  it('should have ds-card__block class', () => {
    const f = TestBed.createComponent(SingleBlockComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('div');
    expect(el.classList.contains('ds-card__block')).toBe(true);
  });

  it('should project content', () => {
    const f = TestBed.createComponent(SingleBlockComponent);
    f.detectChanges();
    const el = f.nativeElement.querySelector('div');
    expect(el.textContent).toContain('Single block');
  });
});

describe('HviCardBlock inside HviCard', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [CardWithBlocksComponent] });
  });

  it('should render multiple blocks inside a card', () => {
    const f = TestBed.createComponent(CardWithBlocksComponent);
    f.detectChanges();
    const card = f.nativeElement.querySelector('hvi-card');
    const blocks = card.querySelectorAll('.ds-card__block');
    expect(blocks.length).toBe(3);
  });

  it('should project content inside each block', () => {
    const f = TestBed.createComponent(CardWithBlocksComponent);
    f.detectChanges();
    const blocks = f.nativeElement.querySelectorAll('.ds-card__block');
    expect(blocks[0].textContent).toContain('Block 1');
    expect(blocks[1].textContent).toContain('Block 2');
    expect(blocks[2].textContent).toContain('Block 3');
  });

  it('should have ds-card class on parent card', () => {
    const f = TestBed.createComponent(CardWithBlocksComponent);
    f.detectChanges();
    const card = f.nativeElement.querySelector('hvi-card');
    expect(card.classList.contains('ds-card')).toBe(true);
  });
});
