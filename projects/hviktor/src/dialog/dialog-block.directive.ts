import { Directive } from '@angular/core';

/**
 * @summary
 * Wraps a section inside a `dialog[hviDialog]` with padding and a dividing border above it.
 * Use multiple blocks to divide the dialog into header, body, and footer areas.
 *
 * @example Dialog with blocks
 * ```html
 * <dialog hviDialog>
 *   <div hviDialogBlock>Header</div>
 *   <div hviDialogBlock>Body content</div>
 *   <div hviDialogBlock>Footer</div>
 * </dialog>
 * ```
 *
 * @see {@link https://designsystemet.no/no/components/docs/dialog/code}
 */
@Directive({
  selector: '[hviDialogBlock]',
  standalone: true,
  host: {
    class: 'ds-dialog__block',
  },
})
export class HviDialogBlock {}
