import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-SidebarLeft',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconSidebarLeft extends HviIconBase {
  protected override readonly path =
    'M4 3.25C3.58579 3.25 3.25 3.58579 3.25 4V20C3.25 20.4142 3.58579 20.75 4 20.75H20C20.4142 20.75 20.75 20.4142 20.75 20V4C20.75 3.58579 20.4142 3.25 20 3.25H4ZM8.25 19.25L8.25 4.75H4.75V19.25H8.25ZM9.75 19.25L9.75 4.75H19.25V19.25H9.75Z';
}
