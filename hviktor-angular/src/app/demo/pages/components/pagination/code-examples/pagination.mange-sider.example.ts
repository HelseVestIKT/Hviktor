import { Component, signal } from '@angular/core';
import { HviPagination } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-pagination-mange-sider-example',
  standalone: true,
  imports: [HviPagination],
  template: `
    <hvi-pagination [totalItems]="500" [pageSize]="10" [(currentPage)]="currentPage" />
    <p>Side {{ currentPage() }} av 50</p>
  `,
})
export class PaginationMangeSiderExampleComponent {
  currentPage = signal(5);
}
