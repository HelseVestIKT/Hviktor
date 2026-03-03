import { Component } from '@angular/core';
import { HviSkeleton } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-skeleton-storrelser-example',
  standalone: true,
  imports: [HviSkeleton],
  template: `
    <div class="flex flex-wrap items-end gap-4">
      <hvi-skeleton variant="rectangle" width="50px" height="50px" />
      <hvi-skeleton variant="rectangle" width="100px" height="75px" />
      <hvi-skeleton variant="rectangle" width="150px" height="100px" />
      <hvi-skeleton variant="rectangle" width="200px" height="125px" />
    </div>
  `,
})
export class SkeletonStorrelserExampleComponent {}
