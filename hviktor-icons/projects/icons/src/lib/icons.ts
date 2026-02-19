import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'hvi-icons',
  imports: [],
  template: `
    <svg
      [attr.width]="computedSize"
      [attr.height]="computedSize"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <ng-content></ng-content>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ``,
})
export class Icons {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  get computedSize() {
    switch (this.size) {
      case 'sm': return 16;
      case 'lg': return 32;
      default: return 24;
    }
  }

}
