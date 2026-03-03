import { Component, signal } from '@angular/core';
import { HviPagination } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-pagination-fa-elementer-example',
  standalone: true,
  imports: [HviPagination],
  template: ` <hvi-pagination [totalItems]="25" [pageSize]="10" [(currentPage)]="currentPage" /> `,
})
export class PaginationFaElementerExampleComponent {
  currentPage = signal(1);
}
