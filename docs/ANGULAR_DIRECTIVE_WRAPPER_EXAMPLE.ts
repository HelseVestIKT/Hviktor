import { Directive, effect, ElementRef, input } from '@angular/core';

// This directive provides Angular-style property bindings for the web component
@Directive({
  selector: 'hvi-icon-airplane',
  standalone: true,
})
export class HviIconAirplaneDirective {
  size = input<'sm' | 'md' | 'lg'>('md');

  constructor(private el: ElementRef<HTMLElement>) {
    effect(() => {
      this.el.nativeElement.setAttribute('size', this.size());
    });
  }
}

// This allows: <hvi-icon-airplane [size]="mySize"></hvi-icon-airplane>
// Instead of: <hvi-icon-airplane [attr.size]="mySize"></hvi-icon-airplane>
