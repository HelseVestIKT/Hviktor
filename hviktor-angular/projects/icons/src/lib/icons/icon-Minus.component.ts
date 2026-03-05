import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-Minus',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconMinus extends HviIconBase {
  protected override readonly path =
    'M4.75 12.0001C4.75 11.5858 5.08579 11.2501 5.5 11.2501L18.5 11.2501C18.9142 11.2501 19.25 11.5858 19.25 12.0001C19.25 12.4143 18.9142 12.7501 18.5 12.7501L5.5 12.7501C5.08579 12.7501 4.75 12.4143 4.75 12.0001Z';
}
