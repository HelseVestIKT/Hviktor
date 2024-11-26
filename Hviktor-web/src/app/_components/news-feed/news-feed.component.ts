import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-news-feed',
  standalone: true,
  imports: [CardModule, CheckboxModule, ChipModule],
  templateUrl: './news-feed.component.html',
  styleUrl: './news-feed.component.scss',
})
export class NewsFeedComponent {}
