import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-SquareFill',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconSquareFill extends HviIconBase {
  protected override readonly path =
    'M3.25 4C3.25 3.58579 3.58579 3.25 4 3.25H20C20.4142 3.25 20.75 3.58579 20.75 4V20C20.75 20.4142 20.4142 20.75 20 20.75H4C3.58579 20.75 3.25 20.4142 3.25 20V4Z';
}
