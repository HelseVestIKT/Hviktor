import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-TagFill',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconTagFill extends HviIconBase {
  protected override readonly path =
    'M14.3242 3.75C13.5949 3.75 12.8954 4.03973 12.3797 4.55546L4.17257 12.7626C3.48915 13.446 3.48915 14.554 4.17257 15.2374L8.75835 19.8232C9.44177 20.5066 10.5498 20.5066 11.2332 19.8232L19.4403 11.6161C19.9561 11.1004 20.2458 10.4009 20.2458 9.67157V5.5C20.2458 4.5335 19.4623 3.75 18.4958 3.75H14.3242ZM15.4958 10C16.3242 10 16.9958 9.32843 16.9958 8.5C16.9958 7.67157 16.3242 7 15.4958 7C14.6674 7 13.9958 7.67157 13.9958 8.5C13.9958 9.32843 14.6674 10 15.4958 10Z';
}
