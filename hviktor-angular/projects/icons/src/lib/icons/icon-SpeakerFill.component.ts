import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-SpeakerFill',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconSpeakerFill extends HviIconBase {
  protected override readonly path =
    'M15.8249 4.32403C16.0847 4.44892 16.25 4.7117 16.25 5.00001V19C16.25 19.2883 16.0847 19.5511 15.8249 19.676C15.565 19.8009 15.2566 19.7658 15.0315 19.5857L10.2369 15.75H6.5C6.08579 15.75 5.75 15.4142 5.75 15V9.00001C5.75 8.58579 6.08579 8.25001 6.5 8.25001H10.2369L15.0315 4.41436C15.2566 4.23425 15.565 4.19914 15.8249 4.32403Z';
}
