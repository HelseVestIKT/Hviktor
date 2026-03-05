import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-CheckmarkHeavy',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconCheckmarkHeavy extends HviIconBase {
  protected override readonly path =
    'M9.53512 13.4148L15.975 7.40467C16.5791 6.83965 17.5289 6.86933 18.0953 7.47478C18.6619 8.08027 18.6294 9.03007 18.0243 9.59621L10.521 16.5993C10.2409 16.859 9.87547 17 9.50013 17C9.10639 17 8.72705 16.8462 8.43902 16.5611L5.93902 14.0611C5.3535 13.4756 5.3535 12.5254 5.93902 11.9399C6.52455 11.3544 7.47471 11.3544 8.06023 11.9399L9.53512 13.4148Z';
}
