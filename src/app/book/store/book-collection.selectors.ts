import { createSelector } from '@ngrx/store';
import { selectRouteParam } from '.';
import { bookAdapter } from './book-collection.reducer';
import { bookFeatureSelector } from './book.feature';

const bookCollectionSelector = createSelector(bookFeatureSelector, state => state?.bookCollection);
export const { selectAll, selectEntities } = bookAdapter.getSelectors(bookCollectionSelector);
export const booksSelector = selectAll;
export const bookSelector2 = createSelector(selectRouteParam('isbn'), booksSelector, (isbn, books) =>
  books.find(book => book.isbn === isbn)
);
export const bookSelector = createSelector(
  selectRouteParam('isbn'),
  selectEntities,
  (isbn, books) => books[isbn ?? '']
);
