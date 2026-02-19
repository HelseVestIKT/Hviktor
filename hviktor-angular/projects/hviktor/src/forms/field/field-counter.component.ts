import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';

/**
 * Counter component that displays remaining/exceeded character count for a field.
 *
 * @remarks
 * Shows a visual counter and provides accessible announcements via aria-live.
 * Must be used inside a `hvi-field` component alongside a textarea or input.
 *
 * The component automatically finds and tracks the input/textarea in the same field,
 * so you only need to provide the `limit` property.
 *
 * @example
 * Simple usage (auto-tracking):
 * ```html
 * <hvi-field>
 *   <label hviLabel for="description" weight="medium">Beskrivelse</label>
 *   <textarea hviInput id="description" rows="3" maxlength="100"></textarea>
 *   <hvi-field-counter [limit]="100" />
 * </hvi-field>
 * ```
 *
 * @example
 * Manual tracking (for custom scenarios):
 * ```html
 * <hvi-field>
 *   <label hviLabel for="description" weight="medium">Beskrivelse</label>
 *   <textarea hviInput id="description" rows="3" #textarea></textarea>
 *   <hvi-field-counter [limit]="100" [count]="textarea.value.length" />
 * </hvi-field>
 * ```
 *
 * Documentation: https://designsystemet.no/en/components/docs/field/code
 */
@Component({
  selector: 'hvi-field-counter',
  standalone: true,
  template: `
    <!-- Screen reader live region for dynamic updates -->
    <div class="ds-sr-only" aria-live="polite">{{ message() }}</div>

    <!-- Visible counter text -->
    <p class="ds-paragraph" data-variant="default" aria-hidden="true">{{ message() }}</p>

    <!-- Screen reader hint (read when entering field) -->
    <div class="ds-sr-only" aria-hidden="true" data-field="description">
      {{ formattedHint() }}
    </div>
  `,
})
export class HviFieldCounter implements AfterViewInit {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  /** Auto-tracked character count from the input/textarea in the same field */
  private readonly autoCount = signal(0);

  /**
   * Current character count. If not provided, the component will
   * automatically track the input/textarea in the same hvi-field.
   */
  count = input<number>();

  /** Maximum allowed characters */
  limit = input.required<number>();

  /** Label template when limit is exceeded. Use %d for the count. */
  over = input<string>('%d tegn for mye');

  /** Label template for remaining characters. Use %d for the count. */
  under = input<string>('%d tegn igjen');

  /** Hint text for screen readers about max characters. Use %d for the limit. */
  hint = input<string>('Maks %d tegn tillatt.');

  /** Effective count - uses manual count if provided, otherwise auto-tracked */
  private readonly effectiveCount = computed(() => this.count() ?? this.autoCount());

  /** Computed difference between limit and current count */
  remaining = computed(() => this.limit() - this.effectiveCount());

  /** Whether the limit has been exceeded */
  isOver = computed(() => this.remaining() < 0);

  /** The formatted message to display */
  message = computed(() => {
    const diff = Math.abs(this.remaining());
    const template = this.isOver() ? this.over() : this.under();
    return template.replace('%d', String(diff));
  });

  /** The formatted hint for screen readers */
  formattedHint = computed(() => this.hint().replace('%d', String(this.limit())));

  ngAfterViewInit(): void {
    // Only auto-track if count is not manually provided
    if (this.count() !== undefined) return;

    // Find the parent hvi-field
    const field = this.el.nativeElement.closest('.ds-field');
    if (!field) return;

    // Find input or textarea in the field
    const inputEl = field.querySelector('input, textarea') as
      | HTMLInputElement
      | HTMLTextAreaElement
      | null;
    if (!inputEl) return;

    // Set initial count
    this.autoCount.set(inputEl.value.length);

    // Listen for input events
    const onInput = () => this.autoCount.set(inputEl.value.length);
    inputEl.addEventListener('input', onInput);

    this.destroyRef.onDestroy(() => {
      inputEl.removeEventListener('input', onInput);
    });
  }
}
