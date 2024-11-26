import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [TabsModule, DividerModule],
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css'],
})
export class IconsComponent {}
