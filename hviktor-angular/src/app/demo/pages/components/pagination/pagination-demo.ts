import { Component, signal } from '@angular/core';
import { HviPagination } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

import { PaginationFaElementerExampleSource } from './code-examples/pagination.fa-elementer.example.source';
import { PaginationKompaktMobilExampleSource } from './code-examples/pagination.kompakt-mobil.example.source';
import { PaginationMangeSiderExampleSource } from './code-examples/pagination.mange-sider.example.source';
import { PaginationStandardExampleSource } from './code-examples/pagination.standard.example.source';
import { PaginationUtenForsteSisteSideExampleSource } from './code-examples/pagination.uten-forste-siste-side.example.source';
@Component({
  selector: 'app-pagination-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent, HviPagination],
  template: `
    <app-demo-page componentId="pagination">
      <!-- Standard -->
      <app-demo-section
        title="Standard"
        [code]="standardCode"
        description="Enkel pagination med automatisk beregning av sidetall."
      >
        <hvi-pagination [totalItems]="100" [pageSize]="10" [(currentPage)]="currentPage1" />
        <p>Nåværende side: {{ currentPage1() }}</p>
      </app-demo-section>

      <!-- Mange sider -->
      <app-demo-section
        title="Mange sider"
        [code]="mangeSiderCode"
        description="Med mange sider vises ellipsis (...) for å indikere utelatte sider."
      >
        <hvi-pagination [totalItems]="500" [pageSize]="10" [(currentPage)]="currentPage2" />
        <p>Side {{ currentPage2() }} av 50</p>
      </app-demo-section>

      <!-- Mobil (kompakt) -->
      <app-demo-section
        title="Kompakt / Mobil"
        [code]="kompaktMobilCode"
        description="Vis færre sider og skjul forrige/neste-tekst for kompakt visning."
      >
        <hvi-pagination
          [totalItems]="100"
          [pageSize]="10"
          [siblingCount]="0"
          [showPreviousNextLabels]="false"
          [(currentPage)]="currentPage3"
        />
      </app-demo-section>

      <!-- Uten kanter -->
      <app-demo-section
        title="Uten første/siste side"
        [code]="utenForsteSisteSideCode"
        description="Skjul første og siste side ved å sette showEdges til false."
      >
        <hvi-pagination
          [totalItems]="200"
          [pageSize]="10"
          [showEdges]="false"
          [siblingCount]="2"
          [(currentPage)]="currentPage4"
        />
      </app-demo-section>

      <!-- Få elementer -->
      <app-demo-section
        title="Få elementer"
        [code]="faElementerCode"
        description="Med få elementer vises kun de relevante sidene."
      >
        <hvi-pagination [totalItems]="25" [pageSize]="10" [(currentPage)]="currentPage5" />
      </app-demo-section>
    </app-demo-page>
  `,
})
export class PaginationDemoComponent {
  readonly standardCode = PaginationStandardExampleSource;
  readonly mangeSiderCode = PaginationMangeSiderExampleSource;
  readonly kompaktMobilCode = PaginationKompaktMobilExampleSource;
  readonly utenForsteSisteSideCode = PaginationUtenForsteSisteSideExampleSource;
  readonly faElementerCode = PaginationFaElementerExampleSource;

  currentPage1 = signal(1);
  currentPage2 = signal(5);
  currentPage3 = signal(3);
  currentPage4 = signal(10);
  currentPage5 = signal(1);
}
