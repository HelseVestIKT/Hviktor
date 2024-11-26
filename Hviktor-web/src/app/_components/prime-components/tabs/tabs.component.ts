import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TabsModule } from 'primeng/tabs';
import { ComponentHeaderComponent } from '../_common/component-header/component-header.component';
import { ComponentTabsComponent } from '../_common/component-tabs/component-tabs.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    TabsModule,
    DividerModule,
    CardModule,
    ComponentHeaderComponent,
    ComponentTabsComponent,
  ],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {}
