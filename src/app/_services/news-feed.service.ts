import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY, BehaviorSubject } from 'rxjs';
import { News } from '../_models/news';
import { map, catchError, share, exhaustMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsFeedService {
  // /newsfeed
  country: string = 'uk';
  category: string = 'business';
  //loadNews$: Observable<News[]> = this.http.get('http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=2a5026bfaf314ff69af7e6df08faec20')

  loadNews$: Observable<News[]> = this.http.get(`${environment.newsApiUrl}?country = ${this.country}&category=${this.category}&apiKey=${environment.newsApiKey}`)
    .pipe(
      tap(items => console.log(items)),
      map((data: any) => data.articles.slice(0, 10)),
      map((article: any) => article.map(a => {
        return <News>{
          title: a.title,
          contentSample: a.content,
          user: a.author,
          timestamp: new Date(a.publishedAt),
          url: a.url,
          imageUrl: a.urlToImage

        }
      })),
      tap(final => console.log(final)),
      catchError(err => {
        console.error('error loading news feed');
        console.error(err);
        return EMPTY;
      }),
      share(),
  );

  refresh$ = new BehaviorSubject(null);

  news$ = this.refresh$.pipe(
    exhaustMap(() => this.loadNews$)
  );

  getnews(country, category) {
    return this.http.get(`${environment.newsApiUrl}?country=${country}&category=${category}&${environment.newsApiKey}`);
  }
  
  constructor(private http: HttpClient) { }
}
