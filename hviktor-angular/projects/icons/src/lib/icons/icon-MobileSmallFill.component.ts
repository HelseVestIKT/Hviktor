import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-MobileSmallFill',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconMobileSmallFill extends HviIconBase {
  protected override readonly path =
    'M8.66667 3.25C7.28712 3.25 6.25 4.42806 6.25 5.77778V18.2222C6.25 19.5719 7.28712 20.75 8.66667 20.75H15.3333C16.7129 20.75 17.75 19.5719 17.75 18.2222V5.77778C17.75 4.42806 16.7129 3.25 15.3333 3.25H8.66667ZM12 16.75C11.5858 16.75 11.25 17.0858 11.25 17.5C11.25 17.9142 11.5858 18.25 12 18.25H12.01C12.4242 18.25 12.76 17.9142 12.76 17.5C12.76 17.0858 12.4242 16.75 12.01 16.75H12Z';
}
