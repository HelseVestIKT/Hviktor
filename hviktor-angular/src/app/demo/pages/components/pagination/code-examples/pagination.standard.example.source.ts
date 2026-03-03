// Auto-generated - do not edit manually
export const PaginationStandardExampleSource = `import { Component, signal } from '@angular/core';
import { HviPagination } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-pagination-standard-example',
  standalone: true,
  imports: [HviPagination],
  template: \`
    <hvi-pagination [totalItems]="100" [pageSize]="10" [(currentPage)]="currentPage" />
    <p>Nåværende side: {{ currentPage() }}</p>
  \`,
})
export class PaginationStandardExampleComponent {
  currentPage = signal(1);
}
`;
