import { Routes } from '@angular/router';
import { DemoLayoutComponent } from './demo/layout/demo-layout';

export const routes: Routes = [
  {
    path: '',
    component: DemoLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./demo/pages/home/home').then((m) => m.HomeComponent),
      },
      {
        path: 'komponenter/alert',
        loadComponent: () =>
          import('./demo/pages/components/alert/alert-demo').then((m) => m.AlertDemoComponent),
      },
      {
        path: 'komponenter/avatar',
        loadComponent: () =>
          import('./demo/pages/components/avatar/avatar-demo').then((m) => m.AvatarDemoComponent),
      },
      {
        path: 'komponenter/badge',
        loadComponent: () =>
          import('./demo/pages/components/badge/badge-demo').then((m) => m.BadgeDemoComponent),
      },
      {
        path: 'komponenter/breadcrumbs',
        loadComponent: () =>
          import('./demo/pages/components/breadcrumbs/breadcrumbs-demo').then(
            (m) => m.BreadcrumbsDemoComponent,
          ),
      },
      {
        path: 'komponenter/button',
        loadComponent: () =>
          import('./demo/pages/components/button/button-demo').then((m) => m.ButtonDemoComponent),
      },
      {
        path: 'komponenter/card',
        loadComponent: () =>
          import('./demo/pages/components/card/card-demo').then((m) => m.CardDemoComponent),
      },
      {
        path: 'komponenter/chip',
        loadComponent: () =>
          import('./demo/pages/components/chip/chip-demo').then((m) => m.ChipDemoComponent),
      },
      {
        path: 'komponenter/details',
        loadComponent: () =>
          import('./demo/pages/components/details/details-demo').then(
            (m) => m.DetailsDemoComponent,
          ),
      },
      {
        path: 'komponenter/dialog',
        loadComponent: () =>
          import('./demo/pages/components/dialog/dialog-demo').then((m) => m.DialogDemoComponent),
      },
      {
        path: 'komponenter/divider',
        loadComponent: () =>
          import('./demo/pages/components/divider/divider-demo').then(
            (m) => m.DividerDemoComponent,
          ),
      },
      {
        path: 'komponenter/forms',
        loadComponent: () =>
          import('./demo/pages/components/forms/forms-demo').then((m) => m.FormsDemoComponent),
      },
      {
        path: 'komponenter/heading',
        loadComponent: () =>
          import('./demo/pages/components/heading/heading-demo').then(
            (m) => m.HeadingDemoComponent,
          ),
      },
      {
        path: 'komponenter/icon',
        loadComponent: () =>
          import('./demo/pages/components/icon/icon-demo').then((m) => m.IconDemoComponent),
      },
      {
        path: 'komponenter/label',
        loadComponent: () =>
          import('./demo/pages/components/label/label-demo').then((m) => m.LabelDemoComponent),
      },
      {
        path: 'komponenter/link',
        loadComponent: () =>
          import('./demo/pages/components/link/link-demo').then((m) => m.LinkDemoComponent),
      },
      {
        path: 'komponenter/list',
        loadComponent: () =>
          import('./demo/pages/components/list/list-demo').then((m) => m.ListDemoComponent),
      },
      {
        path: 'komponenter/paragraph',
        loadComponent: () =>
          import('./demo/pages/components/paragraph/paragraph-demo').then(
            (m) => m.ParagraphDemoComponent,
          ),
      },
      {
        path: 'komponenter/popover',
        loadComponent: () =>
          import('./demo/pages/components/popover/popover-demo').then(
            (m) => m.PopoverDemoComponent,
          ),
      },
      {
        path: 'komponenter/tag',
        loadComponent: () =>
          import('./demo/pages/components/tag/tag-demo').then((m) => m.TagDemoComponent),
      },
      {
        path: 'komponenter/select',
        loadComponent: () =>
          import('./demo/pages/components/select/select-demo').then((m) => m.SelectDemoComponent),
      },
      {
        path: 'komponenter/skeleton',
        loadComponent: () =>
          import('./demo/pages/components/skeleton/skeleton-demo').then(
            (m) => m.SkeletonDemoComponent,
          ),
      },
      {
        path: 'komponenter/checkbox',
        loadComponent: () =>
          import('./demo/pages/components/checkbox/checkbox-demo').then(
            (m) => m.CheckboxDemoComponent,
          ),
      },
      {
        path: 'komponenter/error-summary',
        loadComponent: () =>
          import('./demo/pages/components/error-summary/error-summary-demo').then(
            (m) => m.ErrorSummaryDemoComponent,
          ),
      },
      {
        path: 'komponenter/field',
        loadComponent: () =>
          import('./demo/pages/components/field/field-demo').then((m) => m.FieldDemoComponent),
      },
      {
        path: 'komponenter/fieldset',
        loadComponent: () =>
          import('./demo/pages/components/fieldset/fieldset-demo').then(
            (m) => m.FieldsetDemoComponent,
          ),
      },
      {
        path: 'komponenter/input',
        loadComponent: () =>
          import('./demo/pages/components/input/input-demo').then((m) => m.InputDemoComponent),
      },
      {
        path: 'komponenter/radio',
        loadComponent: () =>
          import('./demo/pages/components/radio/radio-demo').then((m) => m.RadioDemoComponent),
      },
      {
        path: 'komponenter/search',
        loadComponent: () =>
          import('./demo/pages/components/search/search-demo').then((m) => m.SearchDemoComponent),
      },
      {
        path: 'komponenter/switch',
        loadComponent: () =>
          import('./demo/pages/components/switch/switch-demo').then((m) => m.SwitchDemoComponent),
      },
    ],
  },
];
