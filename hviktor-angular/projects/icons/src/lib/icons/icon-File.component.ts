import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-File',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconFile extends HviIconBase {
  protected override readonly path =
    'M6.5 3.25C5.80964 3.25 5.25 3.80964 5.25 4.5V19.5C5.25 20.1904 5.80964 20.75 6.5 20.75H17.5C18.1904 20.75 18.75 20.1904 18.75 19.5V8C18.75 7.80109 18.671 7.61032 18.5303 7.46967L14.5303 3.46967C14.3897 3.32902 14.1989 3.25 14 3.25H6.5ZM13.25 7.5C13.25 8.19036 13.8096 8.75 14.5 8.75H17.25V19.25H6.75V4.75H13.25V7.5ZM16.1893 7.25L14.75 5.81066V7.25H16.1893Z';
}
