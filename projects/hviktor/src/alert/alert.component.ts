import { Component, Input } from '@angular/core';

/**
 * @summary
 * Alert displays important information that users need to see and understand.
 * Designed to capture attention, it supports color variants for different severity levels.
 * Supports projecting plain text or rich content (headings, paragraphs).
 *
 * @example
 * ```html
 * <hvi-alert color="warning">
 *   This is a warning alert!
 * </hvi-alert>
 * ```
 *
 * @example Rich content
 * ```html
 * <hvi-alert color="danger">
 *   <h2>Error</h2>
 *   <p>Something went wrong. Please try again.</p>
 * </hvi-alert>
 * ```
 *
 * @see {@link https://designsystemet.no/en/components/docs/alert/code/}
 */
@Component({
  selector: 'hvi-alert',
  standalone: true,
  template: `<ng-content />`,
  host: {
    class: 'ds-alert',
    style: 'display: block; height: fit-content; align-self: flex-start;',
    '[attr.data-color]': 'color',
  },
})
export class HviAlert {
  /** Sets the color and visual style of the alert to indicate severity. */
  @Input() color?: 'info' | 'success' | 'warning' | 'danger';
}
