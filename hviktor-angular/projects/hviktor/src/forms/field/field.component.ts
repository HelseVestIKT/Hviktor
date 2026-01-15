import { AfterViewInit, Component, DestroyRef, ElementRef, inject, Input } from '@angular/core';
import { fieldObserver } from './helpers/field-observer';

/**
 * Field er et hjelpemiddel for å automatisk koble et felt sammen med hviLabel, hviFieldDescription og hviFieldValidation.
 * 
 * Eksempel på bruk:
 * ```html
 * <hvi-field>
 *  <label hviLabel>Namn</label>
 *  <span hviFieldDescription>Fyll inn ditt fulle namn.</span>
 *  <input type="text" />
 *  <span hviFieldValidation>Dette feltet er påkrevd.</span>
 * </hvi-field>
 * ```
 * 
 * Dokumentasjon: https://designsystemet.no/no/components/docs/field/overview
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
  @Input() position?: 'start' | 'end';

    private readonly el = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    const stop = fieldObserver(this.el.nativeElement);
    this.destroyRef.onDestroy(() => stop?.());
  }
}
