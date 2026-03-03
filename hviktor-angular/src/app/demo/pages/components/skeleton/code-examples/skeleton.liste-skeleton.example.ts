import { Component } from '@angular/core';
import { HviSkeleton } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-skeleton-liste-skeleton-example',
  standalone: true,
  imports: [HviSkeleton],
  template: `
    <div class="flex max-w-lg flex-col gap-3">
      @for (item of [1, 2, 3, 4, 5]; track item) {
        <div class="flex items-center gap-3 rounded p-3">
          <hvi-skeleton variant="rectangle" width="48px" height="48px" />
          <div class="flex flex-1 flex-col gap-1">
            <hvi-skeleton variant="text" width="60%" height="1em" />
            <hvi-skeleton variant="text" width="40%" height="0.875em" />
          </div>
          <hvi-skeleton variant="rectangle" width="80px" height="32px" />
        </div>
      }
    </div>
  `,
})
export class SkeletonListeSkeletonExampleComponent {}
