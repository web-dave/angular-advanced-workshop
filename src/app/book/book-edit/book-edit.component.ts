import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Book, bookNa } from '../models';
import { updateBookStart } from '../store';
import { bookSelector } from '../store/book-collection.selectors';

@Component({
  selector: 'ws-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit, OnDestroy {
  sink = new Subscription();
  book: Book = bookNa();

  constructor(private store: Store) {}

  ngOnInit() {
    this.sink.add(
      this.store
        .select(bookSelector)
        .pipe(filter((book): book is Book => !!book))
        .subscribe(book => (this.book = { ...book }))
    );
  }

  ngOnDestroy() {
    this.sink.unsubscribe();
  }

  save() {
    this.store.dispatch(updateBookStart({ patch: this.book }));
  }
}
