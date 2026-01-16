import { Component, Input,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@u-elements/u-details';

/**
 * Info
 *
 * Eksempel på bruk:
 * ```html
 * <hvi-details>
 *   <hvi-details-summary>
 *     <p size="md">Detaljer</p>
 *   </hvi-details-summary>
 *   <hvi-details-content>
 *     <p>Her er innholdet i detaljene.</p>
 *   </hvi-details-content>
 * </hvi-details>
 * ```
 *
 * Dokumentasjon: https://designsystemet.no/no/components/docs/details/overview
 */

@Component({
  selector: 'hvi-details',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  template: ` <u-details
      #detailsRef
      class="ds-details"
       [attr.data-variant]="variant"
       [attr.defaultOpen]="defaultOpen || undefined"
      [attr.open]="(open) || undefined"
      (toggle)="onToggle($event)"
    >
      <u-summary>
        <ng-content select="hvi-details-summary" />
      </u-summary>
      <div>
        <ng-content select="hvi-details-content" />
      </div>
    </u-details>`,
  host: {
  },
})
export class HviDetails {
    /** Variant of the details component */
    @Input() variant: 'default' | 'tinted' = 'default';

    /** Control open state of the details component */
    @Input() open: true | false = false;

    /** Set default open state of the details component */
    @Input() defaultOpen: true | false = false;

    /** Event handler for toggle event */
    @Input() onToggle: (event: Event) => void = () => {};

    handleToggle(event: Event) {
  console.log('Toggled!', event);
}
}
