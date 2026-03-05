import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-ChevronUpCircleFill',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconChevronUpCircleFill extends HviIconBase {
  protected override readonly path =
    'M12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 17.3848 6.61522 21.75 12 21.75C17.3848 21.75 21.75 17.3848 21.75 12C21.75 6.61522 17.3848 2.25 12 2.25ZM16.0303 12.4697L12.5303 8.96967C12.2374 8.67678 11.7626 8.67678 11.4697 8.96967L7.96967 12.4697C7.67678 12.7626 7.67678 13.2374 7.96967 13.5303C8.26256 13.8232 8.73744 13.8232 9.03033 13.5303L12 10.5607L14.9697 13.5303C15.2626 13.8232 15.7374 13.8232 16.0303 13.5303C16.3232 13.2374 16.3232 12.7626 16.0303 12.4697Z';
}
