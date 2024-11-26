import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-component-tabs',
  standalone: true,
  imports: [TabsModule, CardModule, DividerModule],
  templateUrl: './component-tabs.component.html',
  styleUrl: './component-tabs.component.scss',
})
export class ComponentTabsComponent {
  @Input() import: string | undefined;
  @Input() defaultTabIndex: string = '0';
}
