// Auto-generated - do not edit manually
export const SkeletonVarianterExampleSource = `import { Component } from '@angular/core';
import { HviSkeleton } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-skeleton-varianter-example',
  standalone: true,
  imports: [HviSkeleton],
  template: \`
    <div class="flex flex-wrap items-center gap-4">
      <div class="flex flex-col items-center gap-2">
        <hvi-skeleton variant="rectangle" width="120px" height="80px" />
        <span class="text-sm">Rectangle</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <hvi-skeleton variant="circle" width="80px" height="80px" />
        <span class="text-sm">Circle</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <hvi-skeleton variant="text" width="120px" height="1em" />
        <span class="text-sm">Text</span>
      </div>
    </div>
  \`,
})
export class SkeletonVarianterExampleComponent {
  
}
`;
