import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-ThumbUpFill',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconThumbUpFill extends HviIconBase {
  protected override readonly path =
    'M9.87596 2.58397C10.0151 2.37533 10.2492 2.25 10.5 2.25H11.7251C13.6022 2.25 14.9276 4.08892 14.334 5.86963L13.5406 8.25H18.8815C20.6948 8.25 22.0117 9.97419 21.5346 11.7236L19.6255 18.7236C19.2992 19.92 18.2125 20.75 16.9724 20.75H11.5C11.4506 20.75 11.4013 20.7451 11.3529 20.7354L6.42574 19.75H3C2.58579 19.75 2.25 19.4142 2.25 19V9C2.25 8.58579 2.58579 8.25 3 8.25H6.09861L9.87596 2.58397Z';
}
