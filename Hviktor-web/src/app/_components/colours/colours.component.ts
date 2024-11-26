import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-colours',
  standalone: true,
  imports: [DividerModule],
  templateUrl: './colours.component.html',
  styleUrls: ['./colours.component.css'],
})
export class ColoursComponent {}
