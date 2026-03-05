import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-ChevronRight',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconChevronRight extends HviIconBase {
  protected override readonly path =
    'M9.46967 5.96967C9.76256 5.67678 10.2374 5.67678 10.5303 5.96967L16.0303 11.4697C16.3232 11.7626 16.3232 12.2374 16.0303 12.5303L10.5303 18.0303C10.2374 18.3232 9.76256 18.3232 9.46967 18.0303C9.17678 17.7374 9.17678 17.2626 9.46967 16.9697L14.4393 12L9.46967 7.03033C9.17678 6.73744 9.17678 6.26256 9.46967 5.96967Z';
}
