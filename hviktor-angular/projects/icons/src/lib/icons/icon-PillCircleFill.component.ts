import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-PillCircleFill',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconPillCircleFill extends HviIconBase {
  protected override readonly path =
    'M12 5.25C8.27208 5.25 5.25 8.27208 5.25 12C5.25 15.7279 8.27208 18.75 12 18.75C15.7279 18.75 18.75 15.7279 18.75 12C18.75 8.27208 15.7279 5.25 12 5.25ZM16.0155 11.3368C16.4047 11.1951 16.6054 10.7648 16.4637 10.3755C16.3221 9.98629 15.8917 9.7856 15.5024 9.92727L7.9849 12.6634C7.59567 12.8051 7.39498 13.2355 7.53665 13.6247C7.67831 14.0139 8.1087 14.2146 8.49793 14.073L16.0155 11.3368Z';
}
