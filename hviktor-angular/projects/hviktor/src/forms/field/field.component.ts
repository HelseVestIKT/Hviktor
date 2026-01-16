import { AfterViewInit, Component, DestroyRef, ElementRef, inject, Input } from '@angular/core';
import { fieldObserver } from './helpers/field-observer';

/**
 * Field is a helper component to automatically associate a field with hviLabel, hviFieldDescription and hviFieldValidation.
 * 
 * @example
 * ```html
 * <hvi-field>
 *  <label hviLabel>Name</label>
 *  <span hviFieldDescription>Fill in your full name.</span>
 *  <input type="text" />
 *  <span hviFieldValidation>This field is required.</span>
 * </hvi-field>
 * ```
 * 
 * Documentation: https://designsystemet.no/en/components/docs/field/overview
*/
@Component({
  selector: 'hvi-field',
  standalone: true,
  template: '<ng-content />',
  host: {
    class: 'ds-field',
    '[attr.data-position]': 'position ?? null',
  },
})
export class HviField implements AfterViewInit {
  /** Position of toggle inputs (radio, checkbox, switch) in field */
  @Input() position?: 'start' | 'end';

    private readonly el = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    const stop = fieldObserver(this.el.nativeElement);
    this.destroyRef.onDestroy(() => stop?.());
  }
}
