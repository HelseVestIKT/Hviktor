import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

@Component({
  selector: 'hvi-suggestion-option',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: ` <u-option [attr.data-label]="label" [attr.data-value]="value">
    <ng-content />
  </u-option>`,
  host: {},
})
export class HviSuggestionOption {
  @Input() label!: string;

  @Input() value!: string;
}
