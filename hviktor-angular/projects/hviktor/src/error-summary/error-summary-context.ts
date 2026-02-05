import { Injectable, Signal, signal } from '@angular/core';

/**
 * Internal context used to share state between error summary container and projected parts.
 */
@Injectable()
export class HviErrorSummaryContext {
  private readonly headingIdSignal = signal<string | null>(null);

  /** Register heading id so the container can reference it in aria-labelledby. */
  registerHeading(id: string) {
    this.headingIdSignal.set(id);
  }

  /** Clear heading reference when heading is destroyed. */
  unregisterHeading(id: string) {
    if (this.headingIdSignal() === id) {
      this.headingIdSignal.set(null);
    }
  }

  /** Read current heading id. */
  headingId(): string | null {
    return this.headingIdSignal();
  }

  /** Expose signal for change detection hooks if needed. */
  headingIdSignalReadOnly(): Signal<string | null> {
    return this.headingIdSignal.asReadonly();
  }
}
