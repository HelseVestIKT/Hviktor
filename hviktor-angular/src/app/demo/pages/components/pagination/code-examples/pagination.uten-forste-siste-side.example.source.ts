// Auto-generated - do not edit manually
export const PaginationUtenForsteSisteSideExampleSource = `import { Component, signal } from '@angular/core';
import { HviPagination } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-pagination-uten-forste-siste-side-example',
  standalone: true,
  imports: [HviPagination],
  template: \`
    <hvi-pagination
      [totalItems]="200"
      [pageSize]="10"
      [showEdges]="false"
      [siblingCount]="2"
      [(currentPage)]="currentPage"
    />
  \`,
})
export class PaginationUtenForsteSisteSideExampleComponent {
  currentPage = signal(10);
}
`;
