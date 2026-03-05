import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase, ICON_STYLES, ICON_TEMPLATE } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-TriangleFill',
  template: ICON_TEMPLATE,
  styles: ICON_STYLES,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HviIconTriangleFill extends HviIconBase {
  protected override readonly path =
    'M11.9999 2.25C12.273 2.25 12.5244 2.3984 12.6565 2.63743L22.1827 19.8874C22.311 20.1198 22.307 20.4026 22.1721 20.6312C22.0372 20.8597 21.7916 21 21.5262 21H2.47363C2.20823 21 1.96259 20.8597 1.82771 20.6312C1.69283 20.4026 1.68879 20.1198 1.8171 19.8874L11.3434 2.63743C11.4754 2.3984 11.7269 2.25 11.9999 2.25Z';
}
