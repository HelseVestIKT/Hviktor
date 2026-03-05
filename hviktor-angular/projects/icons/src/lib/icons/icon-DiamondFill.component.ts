import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-DiamondFill',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconDiamondFill extends HviIconBase {
  protected override readonly path =
    'M1.57026 12.5303C1.27736 12.2374 1.27736 11.7625 1.57026 11.4696L11.4698 1.57013C11.7626 1.27724 12.2375 1.27724 12.5304 1.57013L22.4299 11.4696C22.7228 11.7625 22.7228 12.2374 22.4299 12.5303L12.5304 22.4298C12.2375 22.7227 11.7626 22.7227 11.4698 22.4298L1.57026 12.5303Z';
}
