import { Directive, Input } from '@angular/core';

/**
 * Input is a form element used to collect user data.
 * It offers basic functionality and is ideal when you need full control over the component's layout and validation,
 * making it suitable for building custom elements.
 *
 * @example
 * ```html
 * <input hviInput type="text" placeholder="Type something here..." />
 * ```
 *
 * Documentation: https://designsystemet.no/en/components/docs/input/overview
 */
@Directive({
  selector: 'input[hviInput]',
  standalone: true,
  host: {
    class: 'ds-input',
    '[attr.type]': 'type',
  },
})
export class HviInput {
  /** Supported input types */
  @Input() type?:
    | 'number'
    | 'hidden'
    | 'color'
    | 'checkbox'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'month'
    | 'password'
    | 'radio'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';
}
