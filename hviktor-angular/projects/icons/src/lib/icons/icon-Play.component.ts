import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-Play',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconPlay extends HviIconBase {
  protected override readonly path =
    'M8.61965 6.3536C8.84869 6.21883 9.13193 6.21533 9.36423 6.34438L18.3642 11.3444C18.6023 11.4767 18.75 11.7276 18.75 12C18.75 12.2724 18.6023 12.5233 18.3642 12.6556L9.36423 17.6556C9.13193 17.7847 8.84869 17.7812 8.61965 17.6464C8.39062 17.5116 8.25 17.2657 8.25 17V7C8.25 6.73426 8.39062 6.48836 8.61965 6.3536ZM9.75 8.27464V15.7254L16.4557 12L9.75 8.27464Z';
}
