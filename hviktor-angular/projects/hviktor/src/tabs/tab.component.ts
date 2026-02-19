import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import '@u-elements/u-tabs';

/**
 * Tab er en enkelt fane som kan klikkes for å vise tilhørende TabPanel.
 *
 * @example
 * ```html
 * <hvi-tab value="tab1">Tab 1</hvi-tab>
 * ```
 */
@Component({
  selector: 'hvi-tab',
  standalone: true,
  template: `
    <ng-template #content>
      <ng-content />
    </ng-template>
  `,
})
export class HviTab {
  @ViewChild('content', { static: true }) templateRef!: TemplateRef<unknown>;

  /** Unique value that will be set in the Tabs components state when the tab is activated */
  @Input({ required: true }) value!: string;
}
