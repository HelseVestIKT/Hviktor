import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-Stop',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconStop extends HviIconBase {
  protected override readonly path =
    'M6.25 7C6.25 6.58579 6.58579 6.25 7 6.25H17C17.4142 6.25 17.75 6.58579 17.75 7V17C17.75 17.4142 17.4142 17.75 17 17.75H7C6.58579 17.75 6.25 17.4142 6.25 17V7ZM7.75 7.75V16.25H16.25V7.75H7.75Z';
}
