import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-MagnifyingGlassFill',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconMagnifyingGlassFill extends HviIconBase {
  protected override readonly path =
    'M10.5 3.25C6.49594 3.25 3.25 6.49594 3.25 10.5C3.25 14.5041 6.49594 17.75 10.5 17.75C12.2321 17.75 13.8224 17.1426 15.0694 16.1291L20.481 21.5407C20.7739 21.8336 21.2488 21.8336 21.5416 21.5407C21.8345 21.2478 21.8345 20.773 21.5416 20.4801L16.1299 15.0684C17.1429 13.8215 17.75 12.2317 17.75 10.5C17.75 6.49594 14.5041 3.25 10.5 3.25Z';
}
