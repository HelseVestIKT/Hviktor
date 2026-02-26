import { Component } from '@angular/core';
import { HviCard, HviCardBlock, HviSkeleton } from '@helsevestikt/hviktor';
import { DemoPageComponent, DemoSectionComponent } from '../../../shared';

@Component({
  selector: 'app-skeleton-demo',
  standalone: true,
  imports: [DemoPageComponent, DemoSectionComponent, HviSkeleton, HviCard, HviCardBlock],
  template: `
    <app-demo-page
      title="Skeleton"
      description="Skeleton viser en plassholder for innhold som lastes inn."
    >
      <!-- Variants -->
      <app-demo-section
        title="Varianter"
        description="Skeleton har tre varianter: rectangle, circle og text."
      >
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
      </app-demo-section>

      <!-- Text Lines -->
      <app-demo-section
        title="Tekstlinjer"
        description="Simuler et avsnitt med flere tekstlinjer.."
      >
        <div class="flex max-w-md flex-col gap-2">
          <hvi-skeleton variant="text" width="100%" height="1em" />
          <hvi-skeleton variant="text" width="95%" height="1em" />
          <hvi-skeleton variant="text" width="90%" height="1em" />
          <hvi-skeleton variant="text" width="70%" height="1em" />
        </div>
      </app-demo-section>

      <!-- Card Skeleton -->
      <app-demo-section
        title="Kort-skeleton"
        description="Plassholder for et kort med bilde og tekst."
      >
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
      </app-demo-section>

      <!-- Profile Skeleton -->
      <app-demo-section
        title="Profil-skeleton"
        description="Plassholder for brukerprofil med avatar og informasjon."
      >
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
      </app-demo-section>

      <!-- List Skeleton -->
      <app-demo-section
        title="Liste-skeleton"
        description="Plassholder for en liste med elementer."
      >
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
      </app-demo-section>

      <!-- Article Skeleton -->
      <app-demo-section
        title="Artikkel-skeleton"
        description="Plassholder for en artikkel med bilde og tekst."
      >
        <div class="max-w-2xl">
          <hvi-skeleton variant="rectangle" width="100%" height="240px" class="mb-4 rounded-lg" />
          <hvi-skeleton variant="text" width="80%" height="2em" class="mb-4" />
          <div class="mb-4 flex items-center gap-3">
            <hvi-skeleton variant="circle" width="40px" height="40px" />
            <div class="flex flex-col gap-1">
              <hvi-skeleton variant="text" width="120px" height="1em" />
              <hvi-skeleton variant="text" width="80px" height="0.875em" />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <hvi-skeleton variant="text" width="100%" height="1em" />
            <hvi-skeleton variant="text" width="100%" height="1em" />
            <hvi-skeleton variant="text" width="95%" height="1em" />
            <hvi-skeleton variant="text" width="100%" height="1em" />
            <hvi-skeleton variant="text" width="85%" height="1em" />
          </div>
        </div>
      </app-demo-section>

      <!-- Sizes -->
      <app-demo-section
        title="Størrelser"
        description="Skeleton kan tilpasses med width og height."
      >
        <div class="flex flex-wrap items-end gap-4">
          <hvi-skeleton variant="rectangle" width="50px" height="50px" />
          <hvi-skeleton variant="rectangle" width="100px" height="75px" />
          <hvi-skeleton variant="rectangle" width="150px" height="100px" />
          <hvi-skeleton variant="rectangle" width="200px" height="125px" />
        </div>
      </app-demo-section>
    </app-demo-page>
  `,
})
export class SkeletonDemoComponent {}
