import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-Plus',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconPlus extends HviIconBase {
  protected override readonly path =
    'M12.75 5.5C12.75 5.08579 12.4142 4.75 12 4.75C11.5858 4.75 11.25 5.08579 11.25 5.5V11.25H5.5C5.08579 11.25 4.75 11.5858 4.75 12C4.75 12.4142 5.08579 12.75 5.5 12.75H11.25V18.5C11.25 18.9142 11.5858 19.25 12 19.25C12.4142 19.25 12.75 18.9142 12.75 18.5V12.75H18.5C18.9142 12.75 19.25 12.4142 19.25 12C19.25 11.5858 18.9142 11.25 18.5 11.25H12.75V5.5Z';
}
