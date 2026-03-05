import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-SidebarLeftFill',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconSidebarLeftFill extends HviIconBase {
  protected override readonly path =
    'M8.25 3.75C8.25 3.47386 8.02614 3.25 7.75 3.25H4C3.58579 3.25 3.25 3.58579 3.25 4V20C3.25 20.4142 3.58579 20.75 4 20.75H7.75C8.02614 20.75 8.25 20.5261 8.25 20.25L8.25 3.75ZM9.75 20.25C9.75 20.5261 9.97386 20.75 10.25 20.75H20C20.4142 20.75 20.75 20.4142 20.75 20V4C20.75 3.58579 20.4142 3.25 20 3.25H10.25C9.97386 3.25 9.75 3.47386 9.75 3.75L9.75 20.25Z';
}
