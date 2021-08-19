import { createReducer, on } from '@ngrx/store';
import {
  countAction,
  createBookComplete,
  createBookStart,
  deleteBookComplete,
  loadBooksComplete,
  updateBookComplete
} from './book-collection.action';
import { BookCollectionSlice } from './book-collection.slice';

const initialState: BookCollectionSlice = {
  entities: [],
  i: 0
};

export const bookCollectionReducer = createReducer(
  initialState,

  on(createBookComplete, (state, { book }) => ({
    ...state,
    entities: [...state.entities, book]
  })),

  on(deleteBookComplete, (state, { bookIsbn }) => ({
    ...state,
    entities: state.entities.filter(book => book.isbn !== bookIsbn)
  })),

  on(loadBooksComplete, (state, { books }) => ({ ...state, entities: books })),

  on(updateBookComplete, (state, { update }) => ({
    ...state,
    entities: state.entities.map(book => (book.isbn === update.isbn ? update : book))
  }))
);
