import { Component } from '@angular/core';
import { HviCard, HviCardBlock, HviSkeleton } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-skeleton-kort-skeleton-example',
  standalone: true,
  imports: [HviCard, HviCardBlock, HviSkeleton],
  template: `
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <hvi-card>
        <hvi-skeleton variant="rectangle" width="100%" height="160px" />
        <div hviCardBlock class="flex flex-col gap-2">
          <hvi-skeleton variant="text" width="70%" height="1.5em" />
          <hvi-skeleton variant="text" width="100%" height="1em" />
          <hvi-skeleton variant="text" width="90%" height="1em" />
        </div>
      </hvi-card>

      <hvi-card>
        <hvi-skeleton variant="rectangle" width="100%" height="160px" />
        <div hviCardBlock class="flex flex-col gap-2">
          <hvi-skeleton variant="text" width="60%" height="1.5em" />
          <hvi-skeleton variant="text" width="100%" height="1em" />
          <hvi-skeleton variant="text" width="85%" height="1em" />
        </div>
      </hvi-card>

      <hvi-card>
        <hvi-skeleton variant="rectangle" width="100%" height="160px" />
        <div hviCardBlock class="flex flex-col gap-2">
          <hvi-skeleton variant="text" width="80%" height="1.5em" />
          <hvi-skeleton variant="text" width="100%" height="1em" />
          <hvi-skeleton variant="text" width="75%" height="1em" />
        </div>
      </hvi-card>
    </div>
  `,
})
export class SkeletonKortSkeletonExampleComponent {}
