import { createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Book } from '../models';
import {
  createBookComplete,
  deleteBookComplete,
  loadBooksComplete,
  updateBookComplete
} from './book-collection.action';

export const bookAdapter = createEntityAdapter<Book>({ selectId: entity => entity.isbn });

export const bookCollectionReducer = createReducer(
  bookAdapter.getInitialState(),

  on(createBookComplete, (state, { book }) => bookAdapter.addOne(book, state)),

  on(deleteBookComplete, (state, { bookIsbn }) => bookAdapter.removeOne(bookIsbn, state)),

  on(loadBooksComplete, (state, { books }) => bookAdapter.setAll(books, state)),

  on(updateBookComplete, (state, { update }) => bookAdapter.updateOne({ id: update.isbn, changes: update }, state))
);
