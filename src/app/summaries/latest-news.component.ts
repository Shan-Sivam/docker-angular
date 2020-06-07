import { Component, OnInit } from '@angular/core';
import { NewsFeedService } from '../_services/news-feed.service';
import { Observable, timer, Subscription } from 'rxjs';
import { News } from '../_models/news';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.less']
})
export class LatestNewsComponent implements OnInit {

  lastUpdated: Date;
  subscription: Subscription;

  refreshTimer$ = timer(0, 30000);

  news$: Observable<News[]> = this.newsfeed.news$;

  constructor(private newsfeed: NewsFeedService) { }

  ngOnInit(): void {

    this.subscription = this.refreshTimer$.subscribe(data => {
      this.lastUpdated = new Date();
      this.newsfeed.refresh$
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
