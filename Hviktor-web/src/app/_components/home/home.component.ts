import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { NewsFeedComponent } from '../news-feed/news-feed.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TabsModule, CardModule, NewsFeedComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
