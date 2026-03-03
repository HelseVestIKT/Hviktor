// Auto-generated - do not edit manually
export const SkeletonProfilSkeletonExampleSource = `import { Component } from '@angular/core';
import { HviSkeleton } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-skeleton-profil-skeleton-example',
  standalone: true,
  imports: [HviSkeleton],
  template: \`
    <div class="flex flex-col gap-4">
      <!-- Profile Card 1 -->
      <div class="flex items-center gap-4 rounded-lg p-4">
        <hvi-skeleton variant="circle" width="64px" height="64px" />
        <div class="flex flex-1 flex-col gap-2">
          <hvi-skeleton variant="text" width="150px" height="1.25em" />
          <hvi-skeleton variant="text" width="200px" height="1em" />
        </div>
      </div>
    
      <!-- Profile Card 2 -->
      <div class="flex items-center gap-4 rounded-lg p-4">
        <hvi-skeleton variant="circle" width="64px" height="64px" />
        <div class="flex flex-1 flex-col gap-2">
          <hvi-skeleton variant="text" width="180px" height="1.25em" />
          <hvi-skeleton variant="text" width="220px" height="1em" />
        </div>
      </div>
    </div>
  \`,
})
export class SkeletonProfilSkeletonExampleComponent {
  
}
`;
