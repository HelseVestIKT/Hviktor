import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-Knife',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconKnife extends HviIconBase {
  protected override readonly path =
    'M13.9385 3.39157C14.1341 3.53254 14.25 3.75892 14.25 4.00001V20C14.25 20.4142 13.9142 20.75 13.5 20.75C13.0858 20.75 12.75 20.4142 12.75 20V13.75H12.5C10.9812 13.75 9.75 12.5188 9.75 11V7.88304C9.75 5.8385 11.0583 4.02334 12.9979 3.3768L13.2628 3.28849C13.4915 3.21226 13.743 3.25061 13.9385 3.39157ZM12.75 12.25V5.14417C11.8307 5.73149 11.25 6.75636 11.25 7.88304V11C11.25 11.6904 11.8096 12.25 12.5 12.25H12.75Z';
}
