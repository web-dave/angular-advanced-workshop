import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Book } from '../models';
import { deleteBookStart } from '../store';
import { bookSelector } from '../store/book-collection.selectors';
import { selectRouteParam } from '../store/router.selectors';

@Component({
  selector: 'ws-book-detail',
  styleUrls: ['./book-detail.component.scss'],
  templateUrl: 'book-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailComponent {
  public book$: Observable<Book>;

  constructor(private store: Store) {
    this.book$ = this.store.select(bookSelector).pipe(filter((book): book is Book => !!book));
  }

  remove() {
    this.store.dispatch(deleteBookStart());
  }
}
