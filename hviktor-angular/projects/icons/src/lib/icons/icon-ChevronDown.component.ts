import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-ChevronDown',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconChevronDown extends HviIconBase {
  protected override readonly path =
    'M5.96967 9.46967C6.26256 9.17678 6.73744 9.17678 7.03033 9.46967L12 14.4393L16.9697 9.46967C17.2626 9.17678 17.7374 9.17678 18.0303 9.46967C18.3232 9.76256 18.3232 10.2374 18.0303 10.5303L12.5303 16.0303C12.2374 16.3232 11.7626 16.3232 11.4697 16.0303L5.96967 10.5303C5.67678 10.2374 5.67678 9.76256 5.96967 9.46967Z';
}
