import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { ComponentHeaderComponent } from '../_common/component-header/component-header.component';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [TabViewModule, DividerModule, ButtonModule, CardModule, ComponentHeaderComponent],
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {

}
