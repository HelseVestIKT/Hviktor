import { Directive, effect, ElementRef, inject, input } from '@angular/core';

// This directive provides Angular-style property bindings for the web component
@Directive({
  selector: 'hvi-icon-airplane',
  standalone: true,
})
export class HviIconAirplaneDirective {
  size = input<'sm' | 'md' | 'lg'>('md');
  private el = inject(ElementRef<HTMLElement>);

  constructor() {
    effect(() => {
      this.el.nativeElement.setAttribute('size', this.size());
    });
  }
}

// This allows: <hvi-icon-airplane [size]="mySize"></hvi-icon-airplane>
// Instead of: <hvi-icon-airplane [attr.size]="mySize"></hvi-icon-airplane>
