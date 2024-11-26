import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';
import { ComponentHeaderComponent } from '../_common/component-header/component-header.component';
import { ComponentTabsComponent } from '../_common/component-tabs/component-tabs.component';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [
    TabViewModule,
    DividerModule,
    CardModule,
    MenubarModule,
    ComponentHeaderComponent,
    ComponentTabsComponent,
  ],
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss'],
})
export class MenubarComponent {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Farger',
        routerLink: '',
      },
      {
        label: 'Typografi',
        routerLink: '',
      },
      {
        label: 'Ikoner',
        routerLink: '',
      },
      {
        label: 'Variabler og klasser',
        routerLink: '',
      },
      {
        label: 'Komponenter',
        items: [
          {
            label: 'Accordion',
            routerLink: '',
            icon: 'pi pi-check-circle',
          },
          {
            label: 'Buttons',
            routerLink: '',
            icon: 'pi pi-check-circle',
          },
          {
            label: 'Checkbox',
            routerLink: '',
            icon: 'pi pi-question-circle',
          },
          {
            label: 'Dialog',
            routerLink: '',
            icon: 'pi pi-check-circle',
          },
        ],
      },
      {
        label: 'Backend',
      },
    ];
  }
}
