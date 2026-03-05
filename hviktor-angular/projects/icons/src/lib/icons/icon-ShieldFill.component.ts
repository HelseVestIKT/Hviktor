import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-ShieldFill',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconShieldFill extends HviIconBase {
  protected override readonly path =
    'M18.8235 3.27084C19.3003 3.16866 19.75 3.53215 19.75 4.01983V13C19.75 17.2802 16.2802 20.75 12 20.75C7.71979 20.75 4.25 17.2802 4.25 13V4.01983C4.25 3.53214 4.69967 3.16866 5.17649 3.27084L5.54282 3.34933C9.79929 4.26144 14.2007 4.26144 18.4572 3.34933L18.8235 3.27084Z';
}
