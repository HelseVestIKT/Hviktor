import { input, computed, Directive } from '@angular/core';

export const ICON_TEMPLATE = `
   <svg
      [attr.width]="sizePx()"
      [attr.height]="sizePx()"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" [attr.d]="path" />
  </svg>`;

export const ICON_STYLES = `
  :host {
    display: inline-block;
    line-height: 0;
  }
`;

@Directive()
export abstract class HviIconBase {
  size = input<'sm' | 'md' | 'lg'>('md');

  protected readonly sizePx = computed(() => {
    const sizeMap = { sm: 16, md: 24, lg: 32 };
    return sizeMap[this.size()];
  });

  protected abstract readonly path: string;
}