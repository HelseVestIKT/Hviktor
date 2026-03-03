// Auto-generated - do not edit manually
export const PaginationKompaktMobilExampleSource = `import { Component, signal } from '@angular/core';
import { HviPagination } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-pagination-kompakt-mobil-example',
  standalone: true,
  imports: [HviPagination],
  template: \`
    <hvi-pagination
      [totalItems]="100"
      [pageSize]="10"
      [siblingCount]="0"
      [showPreviousNextLabels]="false"
      [(currentPage)]="currentPage"
    />
  \`,
})
export class PaginationKompaktMobilExampleComponent {
  currentPage = signal(3);
}
`;
