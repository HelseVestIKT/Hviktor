import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-PauseFill',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconPauseFill extends HviIconBase {
  protected override readonly path =
    'M7 6.25C6.58579 6.25 6.25 6.58579 6.25 7V17C6.25 17.4142 6.58579 17.75 7 17.75H10C10.4142 17.75 10.75 17.4142 10.75 17V7C10.75 6.58579 10.4142 6.25 10 6.25H7ZM14 6.25C13.5858 6.25 13.25 6.58579 13.25 7V17C13.25 17.4142 13.5858 17.75 14 17.75H17C17.4142 17.75 17.75 17.4142 17.75 17V7C17.75 6.58579 17.4142 6.25 17 6.25H14Z';
}
