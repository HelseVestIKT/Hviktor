import { AfterViewInit, Component, DestroyRef, ElementRef, inject, Input } from '@angular/core';
import { fieldObserver } from './helpers/field-observer';

@Component({
  selector: 'hvi-field',
  standalone: true,
  template: '<ng-content />',
  host: {
    class: 'ds-field',
    '[attr.data-position]': 'position ?? null',
  },
})
export class HviFieldComponent implements AfterViewInit {
  @Input() position?: 'start' | 'end';

    private readonly el = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    const stop = fieldObserver(this.el.nativeElement);
    this.destroyRef.onDestroy(() => stop?.());
  }
}
