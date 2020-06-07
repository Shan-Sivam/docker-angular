import { Component, OnInit } from '@angular/core';
import { NewsFeedService } from '../_services/news-feed.service';
import { TestService } from '../_services/test.service';
import { News } from '../_models/news';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
})
export class TestComponent implements OnInit {

  newsList: News[];

  constructor(private testService: TestService) { }

  observer = {
    next: data => { console.log('Data Received:', data) },
    complete: data => {console.log('Completed') }
  };


  ngOnInit(): void {

    var subscription = this.testService.ob$.subscribe(this.observer);

    this.testService.squareOf2$.subscribe(data => {
      console.log(data);
    })

    this.testService.news$.subscribe(data => {
      this.newsList = data;
      console.log(data);
    })



  }

}
