import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { HviErrorSummaryContext } from './error-summary-context';

let headingIdCounter = 0;

/**
 * Marks an element as the ErrorSummary heading and ensures it has an id.
 */
@Directive({
  selector: '[hviErrorSummaryHeading]',
  standalone: true,
  host: {
    class: 'ds-heading',
  },
})
export class HviErrorSummaryHeadingDirective implements OnInit, OnDestroy {
  private readonly context = inject(HviErrorSummaryContext);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private registeredId: string | null = null;

  /** Optionally provide a custom id for the heading. */
  @Input('hviErrorSummaryHeading') headingId?: string;

  ngOnInit() {
    const element = this.elementRef.nativeElement;
    const id = this.headingId || element.id || this.createId();
    element.id = id;
    this.registeredId = id;
    this.context.registerHeading(id);
  }

  ngOnDestroy() {
    if (this.registeredId) this.context.unregisterHeading(this.registeredId);
  }

  private createId() {
    headingIdCounter += 1;
    return `hvi-error-summary-heading-${headingIdCounter}`;
  }
}
