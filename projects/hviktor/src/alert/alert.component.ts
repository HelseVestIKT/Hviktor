import { Component, Input } from '@angular/core';

type HviAlertColor = 'info' | 'success' | 'warning' | 'danger';
type HviAlertRole = 'status' | 'alert' | string;
type HviAlertAriaLive = 'off' | 'polite' | 'assertive';

/**
 * @summary
 * Alert displays important information that users need to see and understand.
 * Designed to capture attention, it supports color variants for different severity levels.
 * Supports projecting plain text or rich content (headings, paragraphs).
 * The component also provides accessibility defaults:
 * `status` + `polite` for non-critical variants, and `alert` for danger.
 *
 * @example Warning alert with default accessibility
 * ```html
 * <hvi-alert color="warning">
 *   This is a warning alert!
 * </hvi-alert>
 * ```
 *
 * @example Danger alert with automatic critical announcement
 * ```html
 * <hvi-alert color="danger">
 *   Something went wrong. Please try again.
 * </hvi-alert>
 * ```
 *
 * @example Explicit role override for special cases
 * ```html
 * <hvi-alert color="warning" role="alert">
 *   This warning alert is intentionally announced as an alert message.
 * </hvi-alert>
 * ```
 *
 * @example Rich content
 * ```html
 * <hvi-alert color="warning">
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
    '[attr.role]': 'role ?? (color === "danger" ? "alert" : "status")',
    '[attr.aria-live]':
      'ariaLive ?? ((role ?? (color === "danger" ? "alert" : "status")) === "alert" ? null : "polite")',
  },
})
export class HviAlert {
  /** Sets the color and visual style of the alert to indicate severity. */
  @Input() color?: HviAlertColor;

  /**
   * Overrides the default semantic role.
   * Defaults to `status` for info/success/warning and `alert` for danger.
   */
  @Input() role?: HviAlertRole;

  /**
   * Overrides the default live region politeness.
   * Defaults to `polite` for status alerts and is omitted for alert role.
   */
  @Input('aria-live') ariaLive?: HviAlertAriaLive;
}
