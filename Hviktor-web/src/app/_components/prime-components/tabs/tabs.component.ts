import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TabsModule } from 'primeng/tabs';  
import { ComponentHeaderComponent } from '../_common/component-header/component-header.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [TabsModule, DividerModule, CardModule, ComponentHeaderComponent],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {

}
