import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { ComponentHeaderComponent } from '../../prime-components/_common/component-header/component-header.component';
import { ComponentTabsComponent } from '../../prime-components/_common/component-tabs/component-tabs.component';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [TabsModule, CardModule, ComponentHeaderComponent, ComponentTabsComponent],
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.css'
})
export class ComingSoonComponent {

}
