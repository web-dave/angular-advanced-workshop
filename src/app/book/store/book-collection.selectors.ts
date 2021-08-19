import { createSelector } from '@ngrx/store';
import { bookFeatureSelector } from './book.feature';

const bookCollectionSelector = createSelector(bookFeatureSelector, state => state.bookCollection);
export const booksSelector = createSelector(bookCollectionSelector, state => state.entities);
export const bookSelector = (isbn: string) =>
  createSelector(booksSelector, state => state.find(book => book.isbn === isbn));
