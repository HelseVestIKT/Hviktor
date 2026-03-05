import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-CaretLeft',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconCaretLeft extends HviIconBase {
  protected override readonly path =
    'M14.287 5.8071C14.5673 5.92318 14.75 6.19666 14.75 6.50001L14.75 17.5C14.75 17.8034 14.5673 18.0768 14.287 18.1929C14.0068 18.309 13.6842 18.2448 13.4697 18.0303L7.96967 12.5303C7.67678 12.2374 7.67678 11.7626 7.96967 11.4697L13.4697 5.96968C13.6842 5.75518 14.0068 5.69101 14.287 5.8071ZM9.56066 12L13.25 15.6893L13.25 8.31067L9.56066 12Z';
}
