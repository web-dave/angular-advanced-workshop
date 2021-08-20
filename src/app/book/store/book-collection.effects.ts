import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import {
  createBookComplete,
  createBookStart,
  deleteBookComplete,
  deleteBookStart,
  loadBooksComplete,
  loadBooksStart,
  updateBookComplete,
  updateBookStart
} from './book-collection.action';
import { selectRouteParam } from './router.selectors';

@Injectable()
export class BookCollectionEffects {
  load = createEffect(
    () =>
      this.action$.pipe(
        ofType(loadBooksStart),
        exhaustMap(() => this.service.getAll()),
        map(books => loadBooksComplete({ books }))
      ),
    { dispatch: true }
  );

  create = createEffect(() =>
    this.action$.pipe(
      ofType(createBookStart),
      exhaustMap(({ book }) => this.service.create(book)),
      map(bookCreated => createBookComplete({ book: bookCreated }))
    )
  );

  delete = createEffect(() =>
    this.action$.pipe(
      ofType(deleteBookStart),
      withLatestFrom(this.store.select(selectRouteParam('isbn'))),
      exhaustMap(([, bookIsbn]) =>
        this.service.delete(bookIsbn || '').pipe(map(() => deleteBookComplete({ bookIsbn: bookIsbn || '' })))
      )
    )
  );

  update = createEffect(() =>
    this.action$.pipe(
      ofType(updateBookStart),
      exhaustMap(({ patch }) =>
        this.service.update(patch.isbn, patch).pipe(map(update => updateBookComplete({ update })))
      )
    )
  );

  navigateToStart = createEffect(
    () =>
      this.action$.pipe(
        ofType(createBookComplete, deleteBookComplete, updateBookComplete),
        switchMap(() => this.router.navigateByUrl('/'))
      ),
    { dispatch: false }
  );

  constructor(
    private action$: Actions,
    private service: BookApiService,
    private router: Router,
    private store: Store
  ) {}
}
