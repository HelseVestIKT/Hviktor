import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-BowlFill',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconBowlFill extends HviIconBase {
  protected override readonly path =
    'M4 7.25C3.58579 7.25 3.25 7.58579 3.25 8V11C3.25 13.939 5.12832 16.4393 7.75 17.3659V18C7.75 18.4142 8.08579 18.75 8.5 18.75H15.5C15.9142 18.75 16.25 18.4142 16.25 18V17.3659C18.8717 16.4393 20.75 13.939 20.75 11V8C20.75 7.58579 20.4142 7.25 20 7.25H4Z';
}
