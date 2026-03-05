import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-Escalator',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconEscalator extends HviIconBase {
  protected override readonly path =
    'M16.4238 5.51986C16.5663 5.34887 16.7774 5.25 17 5.25H21C21.4142 5.25 21.75 5.58579 21.75 6C21.75 6.41421 21.4142 6.75 21 6.75H17.3513L7.57617 18.4801C7.43367 18.6511 7.22258 18.75 7 18.75H3C2.58579 18.75 2.25 18.4142 2.25 18C2.25 17.5858 2.58579 17.25 3 17.25H6.64872L16.4238 5.51986Z';
}
