import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-MagnifyingGlass',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconMagnifyingGlass extends HviIconBase {
  protected override readonly path =
    'M10.5 3.25C6.49594 3.25 3.25 6.49594 3.25 10.5C3.25 14.5041 6.49594 17.75 10.5 17.75C12.2319 17.75 13.8219 17.1427 15.0689 16.1295L20.4801 21.5407C20.773 21.8336 21.2478 21.8336 21.5407 21.5407C21.8336 21.2478 21.8336 20.773 21.5407 20.4801L16.1295 15.0689C17.1427 13.8219 17.75 12.2319 17.75 10.5C17.75 6.49594 14.5041 3.25 10.5 3.25ZM4.75 10.5C4.75 7.32436 7.32436 4.75 10.5 4.75C13.6756 4.75 16.25 7.32436 16.25 10.5C16.25 13.6756 13.6756 16.25 10.5 16.25C7.32436 16.25 4.75 13.6756 4.75 10.5Z';
}
