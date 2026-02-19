import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import '@u-elements/u-tabs';

/**
 * TabPanel inneholder innholdet som vises når en tilhørende Tab er aktiv.
 *
 * @example
 * ```html
 * <hvi-tab-panel value="tab1">
 *   Innhold for tab 1
 * </hvi-tab-panel>
 * ```
 */
@Component({
  selector: 'hvi-tab-panel',
  standalone: true,
  template: `
    <ng-template #content>
      <ng-content />
    </ng-template>
  `,
})
export class HviTabPanel {
  @ViewChild('content', { static: true }) templateRef!: TemplateRef<unknown>;

  /** When this value is selected, render this TabPanel. Must match the value of a Tab. */
  @Input({ required: true }) value!: string;
}
