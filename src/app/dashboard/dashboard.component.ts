import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, share, Subscription, timer } from 'rxjs';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private bookService: BookService) {}

  time = new Date();
  rxTime = new Date();
  intervalId:any;
  subscription: Subscription;

  books_count:any;
  authors_count:any;

  ngOnInit(): void {
    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        this.rxTime = time;
      });

    //Get counts
    this.books_count = this.bookService.getResourceCount('books');
    this.authors_count = this.bookService.getResourceCount('authors');

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
