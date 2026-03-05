import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-HeadFill',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconHeadFill extends HviIconBase {
  protected override readonly path =
    'M10.25 20.75H8.00001C6.48122 20.75 5.25001 19.5188 5.25001 18V16.75H3.50001C3.26293 16.75 3.03981 16.6379 2.89829 16.4477C2.75677 16.2575 2.71351 16.0116 2.78164 15.7845L4.25071 10.8876C4.31092 6.10689 8.20505 2.25 13 2.25C17.8325 2.25 21.75 6.16751 21.75 11C21.75 13.1147 20.999 15.0556 19.75 16.5681V21.5C19.75 21.9142 19.4142 22.25 19 22.25H11C10.5858 22.25 10.25 21.9142 10.25 21.5V20.75Z';
}
