import {
  booleanAttribute,
  computed,
  Directive,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormGroup, FormGroupDirective, Validators } from '@angular/forms';

/** Resultatet av required-analysen av en FormGroup. */
export type FormRequiredMode = 'all-required' | 'mixed' | 'none';

/**
 * Analyserer en FormGroup og returnerer required-modus.
 *
 * Alle controls telles – også de uten validators (de regnes som optional).
 *
 * - `'all-required'` – alle controls har required/requiredTrue
 * - `'mixed'` – noen controls er required, noen ikke
 * - `'none'` – ingen controls har required
 */
export function analyzeFormRequired(formGroup: FormGroup): FormRequiredMode {
  const controls = Object.values(formGroup.controls);
  if (controls.length === 0) return 'none';

  let requiredCount = 0;

  for (const control of controls) {
    if (
      control.hasValidator(Validators.required) ||
      control.hasValidator(Validators.requiredTrue)
    ) {
      requiredCount++;
    }
  }

  if (requiredCount === 0) return 'none';
  if (requiredCount === controls.length) return 'all-required';
  return 'mixed';
}

/**
 * Legges på `<form>` for å gi submit-håndtering og automatisk required-tag-analyse
 * for Angular reactive forms.
 *
 * - Tracker submitted-state
 * - Marker alle controls som touched ved submit
 * - Analyserer FormGroup og eksponerer `requiredMode()` som child-komponenter
 *   (f.eks. `HviTextfield`) kan injisere for automatisk required/optional-tagging
 * - Sett `[showRequiredTags]="false"` for å skru av automatisk tagging
 *
 * @example
 * ```html
 * <form hviForm [formGroup]="myForm">
 *   @if (myHviForm.requiredMode() === 'all-required') {
 *     <hvi-required-tag mode="all-required" />
 *   }
 *   <hvi-textfield label="Navn" formControlName="name" />
 * </form>
 * ```
 */
@Directive({
  selector: 'form[hviForm]',
  standalone: true,
  exportAs: 'hviForm',
})
export class HviForm implements OnInit {
  /** Emits when the form has been submitted */
  @Output() hviSubmitted = new EventEmitter<void>();

  /** True after first submit attempt */
  submitted = false;

  /** Optional focus target (e.g. HviErrorSummaryComponent) */
  @Input() focusOnInvalid?: { focus?: () => void } | null;

  /**
   * Skru av/på automatisk required-tag-visning for child-komponenter.
   * Default `true`. Sett til `false` for manuell kontroll.
   */
  @Input({ transform: booleanAttribute }) showRequiredTags = true;

  // Optional injection: present when the form uses [formGroup] and ReactiveFormsModule is in scope
  private readonly formGroupDir = inject(FormGroupDirective, { optional: true });

  /** Internal signal som oppdateres ved submit og init */
  private readonly _requiredMode = signal<FormRequiredMode>('none');

  /**
   * Analysert required-modus for FormGroup-en.
   * - `'all-required'` – alle validerte controls er required
   * - `'mixed'` – blanding av required og optional
   * - `'none'` – ingen required-validering
   */
  readonly requiredMode = computed(() => this._requiredMode());

  /** Oppdater required-analyse. Kalles automatisk ved submit, men kan kalles manuelt. */
  refreshRequiredMode(): void {
    const form = this.formGroupDir?.form;
    if (!form) {
      this._requiredMode.set('none');
      return;
    }
    this._requiredMode.set(analyzeFormRequired(form));
  }

  @HostListener('submit', ['$event'])
  onSubmit(event: Event): void {
    this.submitted = true;
    this.hviSubmitted.emit();

    const form = this.formGroupDir?.form;
    if (!form) return;

    form.markAllAsTouched();

    if (form.invalid) {
      event.preventDefault();
      queueMicrotask(() => this.focusOnInvalid?.focus?.());
    }
  }

  ngOnInit(): void {
    this.refreshRequiredMode();
  }
}
