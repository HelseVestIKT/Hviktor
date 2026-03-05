import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-ChevronLeft',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconChevronLeft extends HviIconBase {
  protected override readonly path =
    'M14.5303 5.96967C14.8232 6.26256 14.8232 6.73744 14.5303 7.03033L9.56066 12L14.5303 16.9697C14.8232 17.2626 14.8232 17.7374 14.5303 18.0303C14.2374 18.3232 13.7626 18.3232 13.4697 18.0303L7.96967 12.5303C7.82902 12.3897 7.75 12.1989 7.75 12C7.75 11.8011 7.82902 11.6103 7.96967 11.4697L13.4697 5.96967C13.7626 5.67678 14.2374 5.67678 14.5303 5.96967Z';
}
