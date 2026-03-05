import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-ChatFill',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconChatFill extends HviIconBase {
  protected override readonly path =
    'M3.25 6C3.25 4.48122 4.48122 3.25 6 3.25H18C19.5188 3.25 20.75 4.48122 20.75 6V15C20.75 16.5188 19.5188 17.75 18 17.75H9.20774L4.38587 20.6431C4.15417 20.7821 3.86561 20.7858 3.63048 20.6527C3.39534 20.5195 3.25 20.2702 3.25 20V6Z';
}
