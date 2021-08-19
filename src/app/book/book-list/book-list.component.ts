import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Book } from '../models';
import { countAction } from '../store';
import { booksSelector } from '../store/book-collection.selectors';

@Component({
  selector: 'ws-book-list',
  styleUrls: ['./book-list.component.scss'],
  templateUrl: 'book-list.component.html'
})
export class BookListComponent {
  books$: Observable<ReadonlyArray<Book>>;

  constructor(private store: Store) {
    this.books$ = this.store.select(booksSelector).pipe(tap(state => console.log(state)));
  }
}
