import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import '@u-elements/u-tabs';
import { HviTabPanel } from './tab-panel.component';
import { HviTab } from './tab.component';

/**
 * Tabs lar brukerne navigere mellom relaterte deler av innholdet,
 * der én del vises om gangen.
 *
 * @example
 * ```html
 * <hvi-tabs defaultValue="tab1">
 *   <hvi-tab value="tab1">Tab 1</hvi-tab>
 *   <hvi-tab value="tab2">Tab 2</hvi-tab>
 *   <hvi-tab-panel value="tab1">Content 1</hvi-tab-panel>
 *   <hvi-tab-panel value="tab2">Content 2</hvi-tab-panel>
 * </hvi-tabs>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/docs/tabs/overview}
 */
@Component({
  selector: 'hvi-tabs',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <u-tabs #uTabsRef class="ds-tabs">
      <u-tablist>
        @for (tab of tabs; track tab.value) {
          <u-tab [attr.data-value]="tab.value">
            <ng-container [ngTemplateOutlet]="tab.templateRef" />
          </u-tab>
        }
      </u-tablist>
      @for (panel of panels; track panel.value) {
        <u-tabpanel [attr.data-value]="panel.value">
          <ng-container [ngTemplateOutlet]="panel.templateRef" />
        </u-tabpanel>
      }
    </u-tabs>
    <!-- Hidden slot to capture content -->
    <div style="display: none">
      <ng-content />
    </div>
  `,
  host: {},
})
export class HviTabs implements AfterContentInit {
  @ViewChild('uTabsRef') uTabsRef!: ElementRef;
  @ContentChildren(HviTab) tabs!: QueryList<HviTab>;
  @ContentChildren(HviTabPanel) panels!: QueryList<HviTabPanel>;

  /** Controlled state for Tabs component */
  @Input() value?: string;

  /** Default selected tab value */
  @Input() defaultValue?: string;

  /** Callback when selected tab changes */
  @Output() valueChange = new EventEmitter<string>();

  ngAfterContentInit() {
    // Wait for view to be ready
    setTimeout(() => {
      this.setupTabs();
    });
  }

  private setupTabs() {
    const uTabs = this.uTabsRef?.nativeElement;
    if (!uTabs) return;

    if (this.defaultValue) {
      const tabsArray = this.tabs.toArray();
      const index = tabsArray.findIndex((t) => t.value === this.defaultValue);
      if (index >= 0) {
        uTabs.selectedIndex = index;
      }
    }

    // Listen for tab clicks
    uTabs.addEventListener('click', (event: Event) => {
      const target = event.target as Element;
      const tab = target.closest('u-tab');
      if (tab) {
        const value = tab.getAttribute('data-value');
        if (value) {
          this.valueChange.emit(value);
        }
      }
    });
  }
}
