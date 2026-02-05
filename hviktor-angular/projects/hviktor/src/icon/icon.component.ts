import { HttpClient } from '@angular/common/http';
import {
  booleanAttribute,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewEncapsulation,
} from '@angular/core';
import { IconColor, IconName, IconSize } from './icon.types';

@Component({
  selector: 'hvi-icon',
  standalone: true,
  template: '',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'hvi-icon',
    '[attr.data-size]': 'size',
    '[attr.data-color]': 'color',
    '[attr.aria-hidden]': 'ariaHidden',
  },
  styles: [
    `
      hvi-icon {
        display: inline-block;
      }
      svg {
        display: inline-block;
      }

      hvi-icon[data-size='sm'] svg {
        width: 16px;
        height: 16px;
      }
      hvi-icon[data-size='md'] svg {
        width: 24px;
        height: 24px;
      }
      hvi-icon[data-size='lg'] svg {
        width: 32px;
        height: 32px;
      }
      hvi-icon[data-size='xl'] svg {
        width: 40px;
        height: 40px;
      }

      hvi-icon svg path {
        fill: currentColor;
      }
      hvi-icon[data-color='danger'] svg path {
        fill: var(--ds-color-danger-base-default);
      }
    `,
  ],
})
export class HviIcon implements OnChanges {
  @Input({ required: true }) icon!: IconName;
  @Input() color?: IconColor;
  @Input() size: IconSize = 'md';
  @Input({ transform: booleanAttribute }) ariaHidden = false;

  constructor(
    private http: HttpClient,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnChanges(): void {
    this.loadIcon();
  }

  private loadIcon() {
    this.http
      .get(`/assets/icons/${this.icon}.svg`, {
        responseType: 'text',
      })
      .subscribe({
        next: (svg) => {
          this.elementRef.nativeElement.innerHTML = svg;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Failed to load icon:', this.icon, err);
        },
      });
  }
}
