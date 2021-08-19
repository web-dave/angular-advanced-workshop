import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { exhaustMap, filter, switchMap, tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';
import { deleteBookStart } from '../store';
import { bookSelector } from '../store/book-collection.selectors';

@Component({
  selector: 'ws-book-detail',
  styleUrls: ['./book-detail.component.scss'],
  templateUrl: 'book-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailComponent {
  public book$: Observable<Book>;

  constructor(private route: ActivatedRoute, private store: Store, private cdr: ChangeDetectorRef) {
    this.book$ = this.route.params.pipe(
      switchMap(params => this.store.select(bookSelector(params.isbn))),
      filter((book): book is Book => !!book)
    );
  }

  remove() {
    this.route.params
      .pipe(tap(params => this.store.dispatch(deleteBookStart({ bookIsbn: params.isbn }))))
      .subscribe(() => this.cdr.detectChanges());
  }
}
