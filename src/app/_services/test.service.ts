import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY, BehaviorSubject, of } from 'rxjs';
import { News } from '../_models/news';
import { map, catchError, share, exhaustMap, filter, tap, flatMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  

  constructor(private http: HttpClient) { }

  public ob$ = Observable.create((observer) => {
    observer.next("A new value");
  });

  public squareOf2$ = of(1, 2, 3, 4, 5, 6, 7,8, 9, 10)
    .pipe(
      filter(num => num % 2 === 0),
      map(num => num * num)
  );

  public news$ = this.http.get('http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=2a5026bfaf314ff69af7e6df08faec20')
    .pipe(
      tap(items => console.log(items)),
      map((data: any) => data.articles.slice(0,10)),
      tap(items => console.log(items.length)),
      map((article: any) => article.map(a => {
           return <News>{
            title: a.title,
            contentSample: a.content,
            user: a.author
          }
      }))
    );
}
